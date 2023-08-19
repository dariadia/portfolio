import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { LOAD_DEPLAY } from '@constants';
import { usePrefersReducedMotion } from '@hooks';

const StyledMeSection = styled.section`
  ${({ theme }) => theme.mixins.flexCentered};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-width: 820px) {
    min-height: 50vh;
    height: 50vh;
    padding-top: var(--nav-height) / 2;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height) / 2;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--accent);
    font-family: var(--font-main);
    font-size: clamp(var(--sm), 5vw, var(--md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }
  .email-link {
    ${({ theme }) => theme.mixins.buttonBig};
    margin-top: 50px;
  }
  .heading-caption {
    font-family: var(--font-main);
    font-size: 18px;
  }
`;

const Me = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const introItems = [
    <h1 className="heading-caption">Hi, my name is</h1>,
    <h2 className="heading-main">Daria V. Diachkova.</h2>,
    <h3 className="subheading-main">I build things for the web.</h3>,
  ]

  return (
    <StyledMeSection>
      {prefersReducedMotion ? (
        <>
          {introItems.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {introItems.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={LOAD_DEPLAY}>
              <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </StyledMeSection>
  );
};

export default Me;
