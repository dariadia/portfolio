import { css } from 'styled-components';
import config from '/src/config';

const variables = css`
  :root {
    --main: ${config.colors.main};
    --complementary: ${config.colors.complementary};
    --accent: ${config.colors.accent};
    --highlight: ${config.colors.highlight};
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --light-text: #f6fcf6;
    --accent-tint: rgba(135,214,127, 0.1);
    --font-accent: 'Libre Baskerville', 'San Francisco', -apple-system, system-ui,
      sans-serif;
    --font-main: 'Work Sans', 'Roboto', monospace;
    --xxs: 12px;
    --xs: 13px;
    --sm: 14px;
    --md: 16px;
    --lg: 18px;
    --xl: 20px;
    --xxl: 22px;
    --heading: 36px;
    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;
    --tab-height: 42px;
    --tab-width: 120px;
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --hamburger-width: 30px;
    --hamburger-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --hamburger-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --hamburger-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --hamburger-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
