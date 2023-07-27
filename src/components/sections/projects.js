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

  .projects-grid {
    ${({ theme }) => theme.mixins.listReset};
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 900px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 200px auto 0;
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

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--complementary);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 12px;

    .folder {
      color: var(--accent);
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--text);

      a {
        ${({ theme }) => theme.mixins.flexCentered};
        padding: 5px 7px;
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

    .company > .inline-link:hover {
      color: var(--highlight);
    }
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
    sort: {frontmatter: {date: DESC}}
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
              <a href={company_url} rel="noreferrer" className="company inline-link">
                &nbsp;@{company}
              </a>
            </h3>
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
                  <Icon name="url" />
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
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag)}/`} className="inline-link">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Projects</h2>
      {/* <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link> */}
      <ul className="projects-grid">
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
      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
