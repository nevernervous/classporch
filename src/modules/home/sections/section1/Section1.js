import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import './styles.css';

const Section1 = () => (
    <Grid className='section-one'>
    <Grid.Row centered>
      <Grid.Column width={10}>
        <p className='home-title'>Student learning. <span className='home-title-bold'>Simplified.</span></p>
        <p className='home-subtitle'>Connecting students with tutors and instructors across the globe.</p>
        <br/>
        <br/>
        <br/>
        <Button circular color='yellow' size='large'>SIGN UP</Button>
        <Button circular basic color='yellow' size='large'>FIND MORE</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Section1;