import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import isServer from '@constants/server-helper';
import { Icon } from '@components';
import { usePrefersReducedMotion } from '@hooks';

const StyledPostsSection = styled.section`
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

  .posts-grid {
    ${({ theme }) => theme.mixins.listReset};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
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
    margin-bottom: 35px;

    .folder {
      color: var(--accent);
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--text-light);

      a {
        ${({ theme }) => theme.mixins.flexCentered};
        padding: 5px 7px;
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--text-light);
    font-size: var(--xxl);

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

  .project-description {
    color: var(--text-light);
    font-size: 17px;

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

  const GRID_LIMIT = 6;
  const posts = data.posts.edges.filter(({ node }) => node);
  const firstSix = posts.slice(0, GRID_LIMIT);
  const postsToShow = showMore ? posts : firstSix;

  const postInner = node => {
    const { frontmatter } = node;
    const { slug, title, description, tags } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <a href={slug} target="_blank" rel="noreferrer">
              {title}
            </a>
            <div className="project-links">
              {slug && (
                <a
                  href={slug}
                  aria-label="url Link"
                  className="url"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="url" />
                </a>
              )}
            </div>
          </div>
          <div className="project-description">{description}</div>
        </header>
        <footer>
          {tags && (
            <ul className="project-tags-list">
              {tags.map((tags, i) => (
                <li key={i}>{tags}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return ( null
    // <StyledPostsSection>
    //   <h2 ref={revealTitle}>Blog Posts</h2>
    //   <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
    //     view the archive
    //   </Link>
    //   <ul className="posts-grid">
    //     {prefersReducedMotion ? (
    //       <>
    //         {postsToShow &&
    //           postsToShow.map(({ node }, i) => (
    //             <StyledPost key={i}>{postInner(node)}</StyledPost>
    //           ))}
    //       </>
    //     ) : (
    //       <TransitionGroup component={null}>
    //         {postsToShow &&
    //           postsToShow.map(({ node }, i) => (
    //             <CSSTransition
    //               key={i}
    //               classNames="fadeup"
    //               timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
    //               exit={false}>
    //               <StyledPost
    //                 key={i}
    //                 ref={el => (revealPosts.current[i] = el)}
    //                 style={{
    //                   transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
    //                 }}>
    //                 {postInner(node)}
    //               </StyledPost>
    //             </CSSTransition>
    //           ))}
    //       </TransitionGroup>
    //     )}
    //   </ul>

    //   <button className="more-button" onClick={() => setShowMore(!showMore)}>
    //     Show {showMore ? 'Less' : 'More'}
    //   </button>
    // </StyledPostsSection>
  );
};

export default Posts;
