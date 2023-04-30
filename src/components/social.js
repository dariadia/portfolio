import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Side } from '@components';
import { Icon } from '@components';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 42px;
    margin: 0 auto;
    background-color: var(--accent);
    border: 1px dashed var(--main);
  }

  body.dark &:after {
    background-color: var(--accent-theme);
    border: 1px dashed var(--main-theme);
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }
    a {
      padding: 10px;
      color: var(--accent-dark);
      &:hover,
      &:focus {
        transform: translateY(-3px);
        color: var(--highlight);
      }
    }
  }
`;

const Social = ({ isHome }) => (
  <Side isHome={isHome} orientation="left">
    <StyledSocialList>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i}>
            <a href={url} aria-label={name} target="_blank" rel="noreferrer">
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
