import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css';

const showSignUp = () => {
  history.push('/sign-up');
};

const Section4 = () => (
  <Grid>
    <Grid.Row
      centered
      stretched
      verticalAlign='middle'
      className='section4-background'>
      <Grid.Column width={6} className='section-background' floated='right'>
        <Image
          src='https://unsplash.com/photos/PJzc7LOt2Ig/download'
          className='section4-banner-image'/>
      </Grid.Column>
      <Grid.Column width={6} textAlign='left' floated='left'>
        <div className='how-it-works-section'>
          <p className='section4-header' style={{color: '#fcbd08'}}>
            HOW IT WORKS
          </p>
          <p className='section4-content'>
            Our wide range of tutoring options enables us to meet the needs of all our students by improving and
            individualising their learning experience! We use industry standard technology to ensure learners get a
            great online tutoring experience.
            To find your own tutor at ClassPorch, fill in the short form, wait for tutors to reply and offer their
            services and choose the tutoring option that will work best for you! </p>
          <p className='section4-content'>
            Tell us a little about yourself, and we’ll introduce you to experts who are the best matches for you.
          </p>
          <p className='section4-content'>
            See instructor qualifications and ratings from other students, choose a price that works for you, and
            connect with your tutor of choice.
          </p>
          <br/>
          <Button circular size='large' basic color='yellow' className='section4-find-more-button' onClick={showSignUp}>FIND
            MORE</Button>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Section4;