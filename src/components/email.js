import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import { Side } from '@components';

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 1px;
    border: 1px dashed var(--main);
    height: 124px;
    margin: 0 auto;
    background-color: var(--text);
  }

  body.dark &:after {
    border: 1px dashed var(--main-theme);
    background-color: var(--text-theme);
  }

  a {
    margin: 20px auto;
    padding: 10px;
    font-family: var(--font-main);
    font-size: var(--xxs);
    line-height: var(--lg);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    &:hover,
    &:focus {
      transform: translateY(-3px);
      color: var(--highlight);
    }
  }
`;

const Email = ({ isHome }) => (
  <Side isHome={isHome} orientation="right">
    <StyledLinkWrapper>
      <a href={`mailto:${email}`}>{email}</a>
    </StyledLinkWrapper>
  </Side>
);

Email.propTypes = {
  isHome: PropTypes.bool,
};

export default Email;
