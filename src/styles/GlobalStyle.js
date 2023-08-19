import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--accent-tint);
    color: var(--text);
  }

  /* Provide basic, default focus styles.*/
  :focus {
    outline: 2px dashed var(--accent);
    outline-offset: 3px;
  }

  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  :focus-visible {
    outline: 2px dashed var(--accent);
    outline-offset: 3px;
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: var(--dark-complementary) var(--main);
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: var(--main);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--dark-complementary);
    border: 3px solid var(--main);
    border-radius: 10px;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--main);
    color: var(--text);
    font-family: var(--font-accent);
    font-size: var(--xl);
    line-height: 1.3;

    @media (max-width: 480px) {
      font-size: var(--lg);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  .accent {
    color: var(--accent);
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 200px 150px;

    @media (max-width: 1080px) {
      padding: 200px 100px;
    }
    @media (max-width: 768px) {
      padding: 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 125px 25px;
    }

    &.fillHeight {
      padding: 0 150px;

      @media (max-width: 1080px) {
        padding: 0 100px;
      }
      @media (max-width: 768px) {
        padding: 0 50px;
      }
      @media (max-width: 480px) {
        padding: 0 25px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 48px 0 0;
    max-width: 1000px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--text);
    line-height: 1.1;
  }

  .heading-main {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .subheading-main {
    margin: 8px 0;
    font-size: clamp(32px, 6vw, 48px);
    font-family: var(--font-main);
    color: var(--accent);
    filter: drop-shadow(2px 4px 6px var(--accent-dark));
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  .subheading {
    font-family: var(--font-main);
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto 32px;
    width: fit-content;
    font-size: clamp(26px, 5vw, var(--heading));
    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '✰' counter(section) '.';
      margin-right: 10px;
      color: var(--accent);
      font-family: var(--font-main);
      font-size: clamp(var(--md), 3vw, var(--xl));
      font-weight: 400;
      text-decoration: underline;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }
  }

  img,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--accent);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--complementary);
      color: white;
      font-size: var(--sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  .centered {
    justify-content: center;
  }

  ul {
    &.list-styled {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--lg);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '֯✦';
          position: absolute;
          left: 0;
          color: var(--accent);
        }
      }
    }
  }

  blockquote {
    border-left-color: var(--accent);
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: var(--accent-tint);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: var(--font-main);
    font-size: var(--md);
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:focus,
    &:active {
      background-color: var(--accent);
      color: var(--main);
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
    }
  }

  #logo {
    color: var(--accent);
  }

  .overline {
    color: var(--accent);
    font-family: var(--font-main);
    font-size: var(--md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--accent);
    margin: 0 0 20px 0;
    font-size: var(--md);
    font-family: var(--font-main);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--sm);
    }
    @media (max-width: 768px) {
      font-size: var(--xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--accent);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-main);
      font-size: var(--sm);
      font-weight: 600;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }
  .gatsby-image-outer-wrapper {
    height: 100%;
 }
  ${TransitionStyles};
`;

export default GlobalStyle;
