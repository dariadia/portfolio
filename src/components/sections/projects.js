import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import isServer from '@constants/server-helper';
import { Icon } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import kebabCase from 'lodash/kebabCase';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--heading));
  }

  .archive-link {
    font-family: var(--font-main);
    font-size: var(--sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-showcase {
    ${({ theme }) => theme.mixins.listReset};
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 25px;
    gap: 12px;
    height: 1600px;
    &.shown-more {
      height: 2830px;
      @media (max-width:1200px) { height: inherit; }
    }
    > li {
      height: fit-content;
      box-sizing: border-box;
    }
    > li:nth-child(odd) {
      grid-column: 1;
    }
    > li:nth-child(even) {
      grid-column: 2;
    }
    > li:nth-child(1) {
      grid-row: 1;
    }
    > li:nth-child(2) {
      grid-row: 1;
    }
    > li:nth-child(3) {
      grid-row: 23;
      margin-top: -8px;
    }
    > li:nth-child(4) {
      grid-row: 17;
    }
    > li:nth-child(5) {
      grid-row: 45;
    }
    > li:nth-child(6) {
      grid-row: 38;
    }
    > li:nth-child(7) {
      grid-row: 62;
    }
    > li:nth-child(8) {
      grid-row: 54;
    }
    > li {
      @media (max-width:1200px) and (min-width: 821px) {
        width: calc(90% - 48px);
        margin: 12px auto 16px;
      }
    }

    @media (max-width:1200px) {
      height: inherit;
      display: block;
      > li:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 48px auto 0;
    @media (max-width: 500px) {
      margin: 12px auto 0;
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }
  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 1.2rem 1.75rem 2rem;
    border-radius: var(--border-radius);
    background-color: var(--complementary);
    transition: var(--transition);
  }

  .project-top {
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .folder {
      color: var(--accent);
    }

    .project-links {
      display: flex;
      align-items: center;
      color: var(--text);

      a {
        ${({ theme }) => theme.mixins.flexCentered};
        border: 1px solid;
        padding: 4px 8px;
        border-radius: 4px;
        &:not(:last-child) { 
          margin: 0 12px 0 24px; 
          border-radius: 50%; 
          padding: 8px;
        }
      }
    }
  }

  .project-title {
    margin: 0;
    color: var(--text);
    font-size: var(--xxl);
    .inline-link:after {
      display: none;
    }
  }
  .company {
    margin-right: 4px;
  }
  .company > .inline-link:hover {
    color: var(--highlight);
  }
  .project-description {
    color: var(--text);
    font-size: 17px;
    margin: 16px 0 0;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tags-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-main);
      font-size: var(--xxs);
      line-height: 1.75;
      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`{
  projects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content/projects/"}, frontmatter: {type: {eq: "project"}}}
    sort: {frontmatter: {sortBy: ASC}}
  ) {
    edges {
      node {
        frontmatter {
          title
          company
          company_url
          cover {
            childImageSharp {
              gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          tags
          github
          url
        }
        html
      }
    }
  }
}`);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    isServer.reveal(revealTitle.current, srConfig());
    isServer.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => isServer.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  const GRID_LIMIT = 4;
  const projects = data.projects.edges.filter(({ node }) => node);
  const first = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : first;

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { github, url, title, tags, cover, company, company_url } = frontmatter;
    const image = getImage(cover);

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <h3 className="project-title">
              <a href={url} className="url" target="_blank" rel="noreferrer">
                {title}
              </a>
            </h3>
            <b><a href={company_url} rel="noreferrer" className="company inline-link">
              &nbsp;@{company}
            </a></b>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {url && (
                <a
                  href={url}
                  aria-label="external link"
                  className="url"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="live" />
                </a>
              )}
            </div>
          </div>
        </header>
        <a href={url} className="url" target="_blank" rel="noreferrer">
          <GatsbyImage image={image} alt={title} className="img" />
        </a>
        <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        <footer>
          {tags.length && (
            <ul className="project-tags-list">
              {tags.map(tag => (
                <li key={tag}>
                  <Link to={`/tags/${kebabCase(tag)}/`} className="inline-link">
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  const setShowMode = () => {
    if (showMore) document.getElementById("2-proj").scrollIntoView(true)
    setShowMore(!showMore)
  }

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Projects</h2>
      <ul className={`projects-showcase${showMore ? ' shown-more' : ''}`}>
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    id={`${i}-proj`}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>
      <button className="more-button" id="proj_more-button" onClick={setShowMode}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
