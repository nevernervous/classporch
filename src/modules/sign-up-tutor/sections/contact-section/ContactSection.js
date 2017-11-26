import React, {Component} from 'react';
import {Grid, Input} from 'semantic-ui-react';
import './styles.css';

const ContactSection = () => (
    <Grid className='sign-up-contact-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>CONTACT DETAILS</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='email' placeholder='Email' type='email'/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='mobile' placeholder='Phone *' required type='phone'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
);

export default ContactSection;