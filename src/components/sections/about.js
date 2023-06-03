import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import isServer from '@constants/server-helper';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-main);
      font-size: var(--xs);

      &:before {
        content: '❯';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-size: var(--sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  margin-top: -48px;
  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    &:hover,
    &:focus {
      outline: 0;
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }
    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) drop-shadow(8px 8px 12px var(--accent-dark));
      transition: var(--transition);
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    isServer.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const skills = ['JavaScript (ES6+)', 'CSS (CSS5, SCSS)', 'React', 'TypeScript', 'Node.js', 'Hugo'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="subheading">About Me</h2>
      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! My name is Daria.
            </p>
            <p> I'm a <span className='accent'>5+ years of experience <b>senior frontend developer</b></span> & team leader based in Belgrade, Serbia.
            </p>
            <p>
              I have a passion for crafting <span className='accent'><b>beautiful and intuitive user interfaces</b></span>. Among my projects are many types of frontends from interactive dashboard applications to e-commerce booking platforms. With 5 years in the field, I've honed my skills in creating engaging web applications that provide <span className='accent'><b>exceptional and inclusive user experiences.</b></span>
            </p>
            {/* <p>
              Throughout my career, I've had the opportunity to work on a wide range of projects (small startups to large-scale enterprise). This <span className='accent'><b>diverse experience</b></span> has given me a deep understanding of the entire frontend development lifecycle, from conceptualization and wireframing to implementation and optimization. 
            </p> */}
            <p>
              Currently, I’m focusing on building <span className='accent'><b>inclusive & accessible </b></span>products.
            </p>
            <br />
            <br />
            <h3><b>Here are some technologies I’ve been recently working with:</b></h3>
          </div>
          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <br />
          <br />
          <p>
            <b>I speak:</b>
            <br /> <br />
            <b>Natively</b>: 🇬🇧 / 🇩🇪 / 🇷🇺
            <br />
            <b>Fluent</b>: 🇷🇸 / 🇭🇷
            <br />
            <b>Currently learning</b>: 🇮🇪
          </p>
        </StyledText>
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/daria.jpeg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Daria Diachkova photo"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
