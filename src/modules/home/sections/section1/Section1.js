import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import {history} from '../../../../redux/store';
import './styles.css';

const showSignUp = () => {
  history.push('/sign-up');
};

const Section1 = () => (
    <Grid style={{ backgroundImage: 'url(\'https://unsplash.com/photos/hes6nUC1MVc/download\')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'}}>
    <Grid.Row centered className='section-one'>
      <Grid.Column width={10}>
        <p className='home-title'>Student learning. <span className='home-title-bold'>Simplified.</span></p>
        <p className='home-subtitle'>Connecting students with tutors and instructors across the globe.</p>
        <br/>
        <br/>
        <br/>
        <Button circular color='yellow' size='large' onClick={showSignUp}>SIGN UP</Button>
        <Button circular basic color='yellow' size='large' onClick={showSignUp}>FIND MORE</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Section1;