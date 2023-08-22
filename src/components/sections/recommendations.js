import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import isServer from '@constants/server-helper';
import { usePrefersReducedMotion } from '@hooks';

const StyledRecSection = styled.section`
  max-width: 600px;
  margin: 50px auto 100px;
  text-align: center;
  small {
    margin-bottom: 8px;
    display: block;
  }
  .rec-person {
    color: var(--text);
    font-size: 17px;
    margin: 0 0 32px;
    .rec-mark {
      font-size: 48px;
      font-family: Arial;
    }
  }
  .rec-image {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    margin: 0 8px 12px 0;
    border: 0.5px solid;
  }

`;

const RECS = [
    { name: 'Olga Alexeeva', who: 'Product & Program Manager | Product Leader, Certified Agile Professional | 12+ years in building digital products | Data-driven, tech background', image: 'https://media.licdn.com/dms/image/D4E03AQHBbUKVb8LoHw/profile-displayphoto-shrink_100_100/0/1692378573950?e=1698278400&v=beta&t=5umieucTt8VJvF2NDB2vCs139YwYuLX1JOOkMyHP5Pw', link: 'https://www.linkedin.com/in/bookwormolga?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BL3xRfFzbQf%2BicJi%2FXZOhcA%3D%3D', text: `<p>If you wish to find a Frontend Lead more dependable and knowledgeable than a full-fledged CTO, look no further. In Bookmate, I’m constantly relying on her vast product experience and her unbelievable abilities to deliver almost any task in a blink of an eye. Getting things implemented, experimenting and having fun while working together has never been easier.</p><p>Every stakeholder adores Daria’s gentle and positive approach to most difficult projects, and we are all spoiled beyond reason by having her in the team. I’d definitely recommend considering her in many roles, starting from an experienced developer and up to a team leader with outstanding mentoring capabilities.</p>` },
    {name: 'Valentina Kropaneva', who: 'QA Lead at Bookmate', image: 'https://media.licdn.com/dms/image/C4D03AQH62XYda4FTvA/profile-displayphoto-shrink_100_100/0/1646814843775?e=1698278400&v=beta&t=vDWe2gOqTdUDeZFgLFWDdaOVSuXc0iM154i9pC_mSL8', link: 'https://www.linkedin.com/in/valentina-kropaneva', text: `<p>Daria is an exceptional specialist and worker. She works fast, competently and efficiently, so you can't be happier to work alongside her. There is no task too complicated for her because Daria always thinks up many different ways to solve any problem and doesn't give up in the face of complications. The deadlines are especially afraid of Daria, because she almost never misses them. I've never encountered such capability for planning in a human being.
</p><p>
    I am QA Lead at Bookmate, so I work with Daria almost every day. She listens closely to test feedback and is always ready to help or explain things. Her explanations are great even for people with little technical competence in the frontend domain, so our tech department is always ready for the questions of our co-workers. The best thing is that you can ask Daria any questions, and she wouldn't disappoint with delivering detailed and thorough answers.</p>
    
    <p>I just love how much Daria did for Bookmate these past five years: optimising page load speed, page redesigns, WGAG compliance, tweaks, refactoring, countless landings for promo campaigns and of course bug fixing. I am happy to help her and see her grow. Don't miss your chance to let Daria teach you how to grow up as a specialist yourself :)</p>`},
  {
    name: 'Yerassyl Diyas', who: 'Backend Engineer at Bookmate', image: 'https://media.licdn.com/dms/image/D4E03AQEhzWBDQsILww/profile-displayphoto-shrink_100_100/0/1669576496890?e=1698278400&v=beta&t=PBexbLSwJlxGgP69DESH2Xrdk7n87B0wX4YM0oU08sk', link: 'https://www.linkedin.com/in/yerassyl-diyas', text: `<p>I have the privilege of working closely with Daria at Bookmate, our Front-end Team Lead. Our collaboration was pivotal in ensuring the seamless integration of the front-end and back-end components of our web application.</p><p>She is a good team player. Her proactive approach to problem-solving was particularly useful. We often found ourselves debugging issues together, and she never hesitated to jump on a call to ensure swift resolution.</p><p>Being relatively new to the company, I had numerous questions about the intricacies of our product. Daria was always patient and thorough in her explanations, ensuring I had a clear understanding of how various parts of the product functioned and how backend and front-end are connected.</p><p>Her leadership skills, combined with her technical prowess and collaborative spirit, make Daria an invaluable asset to any team. I recommend Daria for any front-end development or leadership role, I am confident that she will continue to deliver excellence.</p>`
  },
  { name: 'Tatsiana Kulikova', who: 'QA Engineer at Bookmate', image: 'https://media.licdn.com/dms/image/C4E03AQEZNc72WbFE3w/profile-displayphoto-shrink_100_100/0/1657277171052?e=1698278400&v=beta&t=LzGyWm1mOKF5BFcjRH57ga1SLLdK2pjGHWN6giQQUBM', link: 'https://www.linkedin.com/in/tatsianakulikova', text: `<p>For over a year, I worked as a QA engineer with Daria, the amazing lead frontend developer at Bookmate. Seriously, this person is a rock star!</p><p>
  What I admire most of all is how much Daria loves frontend development. For her, it's not just a job - it's a passion. You can see it in every line of code she writes and in every pixel on the screen. </p><p>
  Daria is also a team player. She is always ready for feedback and to brainstorm solutions together with the team. She is also always ready to help and explain complicated technical issues in simple words. Communicating with her is fun and easy, both about work stuff and about life.</p><p>
  If you are looking for someone who not only has the necessary skills but is also genuinely passionate about her work, Daria is the right person for you.</p>` },
,
]

const Recommendations = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    isServer.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledRecSection id="recommendations" ref={revealContainer}>
      <h2 className="subheading overline">What colleagues say about me</h2>
      {RECS.map(person => <div className="rec-person" key={person.name}>
        <img src={person.image} alt={person.name} className="rec-image" />
        <a href={person.link} className='rec-contact'>{person.name}</a>
        <br />
        <small>{person.who}</small>
        <span className="rec-mark">“</span>
        <div dangerouslySetInnerHTML={{ __html: person.text }} />
        <span className="rec-mark">”</span>
      </div>)
      }
    </StyledRecSection>
  );
};

export default Recommendations;
