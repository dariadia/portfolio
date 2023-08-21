import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import isServer from '@constants/server-helper';
import { Icon } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import kebabCase from 'lodash/kebabCase';

const StyledPostsSection = styled.section`
  h2 {
    font-size: clamp(24px, 5vw, var(--heading));
    text-align: center;
  }
  .archive-link {
    font-family: var(--font-main);
    font-size: var(--sm);
    text-align: center;
    display: block;
    &:hover {
      font-weight: bold;
      transition: 0.3s font-weight;
    }
  }

  .posts-grid {
    ${({ theme }) => theme.mixins.listReset};
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;
    @media (max-width: 820px) {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
      margin: 12px 0;
    }
  }
  .fa-link-to {
    font-family: var(--font-main);
    font-size: 14px;
    font-weight: bold;
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 48px auto 0;
    display: block;
    @media (max-width: 500px) {
      margin: 12px auto 0;
    }
  }
`;

const StyledPost = styled.li`
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

  .url > .fa-solid {
    margin-right: 8px;
  }
    
  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
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
    margin-bottom: 35px;
  }
  .project-links {
    color: var(--text);
    a {
      margin: 8px 0;
      padding: 0px 8px 4px;
      border: 1px solid;
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--text);
    font-size: var(--xxl);
  }

  .project-description {
    color: var(--text);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tags-list {
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;
    display: flex;

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

const Posts = () => {
  const data = useStaticQuery(graphql`{
  posts: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content/posts/"}, frontmatter: {type: {eq: "post"}}}
    sort: {frontmatter: {date: DESC}}
  ) {
    edges {
      node {
        frontmatter {
          title
          tags
          slug
          description
          task
        }
        html
      }
    }
  }
}`);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealPosts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    isServer.reveal(revealTitle.current, srConfig());
    isServer.reveal(revealArchiveLink.current, srConfig());
    revealPosts.current.forEach((ref, i) => isServer.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  const GRID_LIMIT = 4;
  const posts = data.posts.edges.filter(({ node }) => node);
  const firstSix = posts.slice(0, GRID_LIMIT);
  const postsToShow = showMore ? posts : firstSix;

  const postInner = node => {
    const { frontmatter } = node;
    const { slug, title, tags, task } = frontmatter;

    return (
      <div className="project-inner">
        <div className="project-links">
          <b>{title}</b>
          <br />
          {slug && (
            <a
              href={slug}
              aria-label="external link"
              className="url"
              target="_blank"
              rel="noreferrer">
              <Icon name="Post" />
            </a>
          )}
        </div>
        <p className="project-description">{task}</p>
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
      </div>
    );
  };

  return (<StyledPostsSection id="posts">
    <h2 className="subheading" ref={revealTitle}>Blog Posts</h2>
    <Link className="inline-link archive-link" to="/posts" ref={revealArchiveLink}>
      view the archive
    </Link>
    <ul className="posts-grid">
      {prefersReducedMotion ? (
        <>
          {postsToShow &&
            postsToShow.map(({ node }, i) => (
              <StyledPost key={i}>{postInner(node)}</StyledPost>
            ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {postsToShow &&
            postsToShow.map(({ node }, i) => (
              <CSSTransition
                key={i}
                classNames="fadeup"
                timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                exit={false}>
                <StyledPost
                  key={i}
                  ref={el => (revealPosts.current[i] = el)}
                  style={{
                    transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                  }}>
                  {postInner(node)}
                </StyledPost>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </ul>

    <button className="more-button" onClick={() => setShowMore(!showMore)}>
      Show {showMore ? 'Less' : 'More'}
    </button>
  </StyledPostsSection>
  );
};

export default Posts;
