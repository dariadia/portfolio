import React from 'react';
import styled from 'styled-components';
import { Layout, Me, About, Jobs, Featured, Projects, Posts, Contact, Recommendations } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Me />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Posts />
      <Recommendations />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

export default IndexPage;
