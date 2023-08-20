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
  margin-top: 40px;
  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  border-radius: var(--border-radius);
  background-color: var(--complementary);
  padding: 24px 24px 36px;
  box-sizing: border-box;
  color: var(--text);
  display: grid;
  grid-gap: 16px;
  margin: 0 auto;
  grid-template-areas: "title title"
    "tags tags"
    "image desc";
  align-items: center;
  @media (max-width: 480px) {
    grid-template-areas: "title"
    "tags"
    "image"
    "desc";
  }
  &:not(:last-of-type) {
    margin-bottom: 32px;
    @media (max-width: 480px) {
      margin: 0 auto 30px;
    }
  }

  .project-content {
    grid-area: desc;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding: 40px 40px 30px;
    }
    @media (max-width: 480px) {
      padding: 0;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--accent);
    font-family: var(--font-main);
    font-size: var(--xs);
    font-weight: 400;
  }

  .fa-link-to {
    font-family: var(--font-main);
    font-size: 14px;
    font-weight: bold;
  }

  .project-title {
    grid-area: title;
    color: var(--accent);
    font-family: var(--font-main);
    font-size: clamp(24px, 5vw, 28px);
    text-align: center;
    margin: 0;
    > a:hover {
      color: var(--highlight);
    }
  }

  .project-description {
    font-size: var(--lg);
    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tags-list {
    grid-area: tags;
    list-style: none;
    display: flex;
    margin: auto;
    padding: 0;
    > li > .inline-link {
      color: var(--text);
      &: hover {
        color: var(--accent);
      }
    }
    @media (max-width: 500px) {
      flex-wrap: wrap;
      justify-content: center;
    }
    li {
      color: var(--text);
      font-family: var(--font-main);
      font-size: var(--xs);
      white-space: nowrap;
      margin: 0 8px 0;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    margin: 10px 0 0;
    color: var(--text);

    a {
      ${({ theme }) => theme.mixins.flexCentered};
      padding: 10px;
      border: 1px solid;
      border-radius: 4px;
      &:first-child { border-radius: 50%; }
      &:not(:last-child) { margin-right: 12px; }
    }
  }

  .project-image {
    grid-area: image;
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
      filter: grayscale(100%) brightness(90%);
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
    sort: {frontmatter: {sortBy: ASC}}
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
                <h3 className="project-title">
                  <a href={url}>{title}</a>
                </h3>
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
                <div className="project-image">
                  <a href={url ? url : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
                <div className="project-content">
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                  <div className="project-links">
                    {github && (
                      <a href={github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {url && (
                      <a href={url} aria-label="external link" className="url">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
