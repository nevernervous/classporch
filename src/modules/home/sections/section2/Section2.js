import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css'

const showSignUp = () => {
  history.push('/sign-up');
};

const Section2 = () => (
    <Grid>
        <Grid.Row centered stretched verticalAlign='middle' className='section-background'>
            <Grid.Column width={6} textAlign='left' floated='right'>
                <div className='about-us-section'>
                    <p className='about-us-header'>
                        ABOUT US
                    </p>
                    <p className='about-us-content'>
                        ClassPorch is a platform that is created and tailored to connect students with tutors, providing students with simplified learning. The objective of ClassPorch is to provide top-notch education for anyone, anywhere and at anytime.
With instructional videos, practice exercises, and a personalised learning dashboard, you are offered the enablement to study at your own pace in and out of the classroom. Whether it is math, science, computer programming, history, art history, economics, and more, with ClassPorch, there is nothing to worry about. Our tutoring encompasses learners from K-5, Middle School, High School, College and University. 
This platform offers you a smart way to progress your learning and most of all make you take pleasure in the learning itself. At ClassPorch, we implements modern techniques and methods, as well as individual approach, interactivity, flexible tutoring system and Whiteboard online teaching facilities to give you a memorable learning experience. 
                    </p>
                    <br/>
                    <Button circular basic color='yellow' size='large' onClick={showSignUp}>FIND MORE</Button>
                </div>

            </Grid.Column>
            <Grid.Column width={6} className='section-background' floated='left'>
                <Image src='https://unsplash.com/photos/9c_djeQTDyY/download' className='banner-image'/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default Section2;