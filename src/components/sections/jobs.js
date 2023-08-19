import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@constants';
import isServer from '@constants/server-helper';
import { usePrefersReducedMotion } from '@hooks';

const StyledJobsSection = styled.section`
  .inner {
    display: flex;
    max-width: 900px;
    margin: auto;
    @media (max-width: 820px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  @media (max-width: 820px) {
    overflow-x: hidden;
    width: calc(100% - 32px);
    padding-left: 50px;
    margin: 0 auto 30px;
    padding: 0;
  }
  @media (max-width: 480px) {
    width: calc(100% - 32px);
    margin: 0 auto 30px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
  .job-year-label {
    margin-right: 8px;
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--accent-tint);
  background-color: ${({ isActive }) => (isActive ? 'var(--complementary)' : 'transparent')};;
  color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--text)')};
  font-family: var(--font-main);
  font-size: var(--xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCentered};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--accent-tint);
    text-align: center;
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--accent);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 48px;
  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 0 5px;
  ul {
    ${({ theme }) => theme.mixins.listStyled};
  }
  h3 {
    margin-bottom: 2px;
    font-size: var(--xxl);
    font-weight: 500;
    line-height: 1.3;
    .company {
      color: var(--accent);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--text);
    font-family: var(--font-main);
    font-size: var(--xs);
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`{
  jobs: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content/jobs/"}}
    sort: {frontmatter: {date: DESC}}
  ) {
    edges {
      node {
        frontmatter {
          title
          company
          location
          range
          url
          year
        }
        html
      }
    }
  }
}`);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    isServer.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  useEffect(() => {
    const focusTab = () => {
      if (tabs.current[tabFocus]) return tabs.current[tabFocus].focus();
      if (tabFocus >= tabs.current.length) setTabFocus(0);
      if (tabFocus < 0) setTabFocus(tabs.current.length - 1);
    };
    focusTab()
  }, [tabFocus, prefersReducedMotion]);

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="subheading centered">Professional Experience</h2>
      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { title, year } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span className="job-year-label">{year}:</span>
                  <span>{title}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>
        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, company, range } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        {' '}at&nbsp;
                        <a href={url} className="inline-link">
                          {company}
                        </a>
                      </span>
                    </h3>
                    <p className="range">{range}</p>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
