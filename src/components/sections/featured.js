import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import isServer from '@constants/server-helper';
import { srConfig } from '@config';
import { Icon } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import kebabCase from 'lodash/kebabCase';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.listReset};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tags-list {
      justify-content: flex-end;
      > li > .inline-link { 
        color: var(--text-light);
        &:hover {
          color: var(--accent);
        }
      }

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--accent);
    font-family: var(--font-main);
    font-size: var(--xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--accent);
    font-family: var(--font-main);
    font-size: clamp(24px, 5vw, 28px);
    > a:hover {
      color: var(--highlight);
    }
    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: white;

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--complementary);
    color: var(--text-light);
    font-size: var(--lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: white;
      font-weight: normal;
    }
  }

  .project-tags-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--text-light);
      font-family: var(--font-main);
      font-size: var(--xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--text-light);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--text-light);

    a {
      ${({ theme }) => theme.mixins.flexCentered};
      padding: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      vertical-align: middle;
      &:hover,
      &:focus {
        outline: 0;
        .img {
          filter: none;
          transition: all 0.2s;
        }
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) brightness(90%) drop-shadow(-8px -8px 12px var(--accent-dark));
      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`{
  featured: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content/featured/"}}
    sort: {frontmatter: {date: ASC}}
  ) {
    edges {
      node {
        frontmatter {
          title
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

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    isServer.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => isServer.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  return (
    <section id="projects">
      <h2 className="subheading" ref={revealTitle}>
        A Few Things I’ve Built
      </h2>
      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { url, title, tags, github, cover } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <h3 className="project-title">
                      <a href={url}>{title}</a>
                    </h3>
                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
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
                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {url && (
                        <a href={url} aria-label="url Link" className="url">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-image">
                  <a href={url ? url : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
