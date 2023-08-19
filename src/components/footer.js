import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCentered};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--text);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;
    a {
      padding: 10px;
      color: var(--accent-dark);
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--text);
  font-family: var(--font-main);
  font-size: var(--xxs);
  line-height: 1;
  a {
    padding: 10px;
  }
  .github-stats {
    color: var(--accent)
  }
`;

const Footer = () => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/search/commits?q=author:dariadia')
      .then(response => response.json())
      .then(json => {
        setTotalCount(json.total_count)
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>
      <StyledCredit tabindex="-1">
        <a href="https://github.com/dariadia/portfolio">
          <div>by Daria V. Diachkova</div>
        </a>
        {totalCount && (
          <div className="github-stats">
            Github commits for the past year: {totalCount.toLocaleString()}
          </div>
        )}
      </StyledCredit>
    </StyledFooter>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
