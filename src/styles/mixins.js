import { css } from 'styled-components';

const button = css`
  color: var(--accent);
  background-color: transparent;
  border: 1px solid var(--accent);
  border-radius: var(--border-radius);
  font-size: var(--xs);
  font-family: var(--font-main);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  padding: 1.25rem 1.75rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--accent-tint);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCentered: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    &:hover,
    &:active,
    &:focus {
      color: var(--accent);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    transition: var(--transition);
    color: var(--accent);
    &:hover,
    &:focus,
    &:active {
      color: var(--accent);
      outline: 0;
      & > * {
        color: var(--accent) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--accent);
      transition: var(--transition);
      opacity: 0.5;
    }
  `,

  button,

  buttonSmall: css`
    color: var(--accent);
    background-color: transparent;
    border: 1px solid var(--accent);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-size: var(--xs);
    font-family: var(--font-main);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--accent-tint);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  buttonBig: css`
    color: var(--accent);
    background-color: transparent;
    border: 1px solid var(--accent);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--sm);
    font-family: var(--font-main);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
      background-color: var(--accent-tint);
      outline: none;
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--shadow-main);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px var(--shadow-main);
    }
  `,

  listStyled: css`
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
  `,

  listReset: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
