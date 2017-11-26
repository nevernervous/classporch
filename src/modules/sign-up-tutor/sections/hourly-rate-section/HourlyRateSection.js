import React from 'react';
import {Grid, Input} from 'semantic-ui-react';
import './styles.css';

export default class HourlyRateSection extends React.Component {
    render() {
        return (
            <Grid className='sign-up-hourly-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>HOURLY RATE</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input
                            name='rate'
                            placeholder='0.00'
                            transparent
                            type='number'
                            required
                            className='input-hourly-rate'/>
                        <span className='input-hourly-rate'>
                            $ per hour
                        </span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}