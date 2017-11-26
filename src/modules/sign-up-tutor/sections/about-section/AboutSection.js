import React from 'react';
import {Grid, Input, Radio} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class AboutSection extends React.Component {

    state = {
            maxDate: moment().subtract(3, 'years'),
            gender: 'male'
    };

    changeDate = function (value) {
        this.setState({startDate: value});
    }

    changeGender = function (e,{value}) {
        this.setState({gender: value})
    }

    onFocusChange = function(event, data){
        if(event.type==='focus'){
            event.target.type = 'date'
            event.target.click()
        }else{
            event.target.type = 'text'
        }
    }

    render() {
        const {startDate, maxDate, gender} = this.state;
        return (
            <Grid className='sign-up-about-section-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>ABOUT</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='first_name' placeholder='First Name *' required/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                        <Input fluid name='last_name' placeholder='Last Name *' required/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                            <Input fluid name='dob' type='text' placeholder='Date of birth* (dd/mm/yyyy)' onFocus={this.onFocusChange} onBlur={this.onFocusChange} required/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                            <Input fluid name='city' type='text' placeholder='City' required/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                            <Input fluid name='country' type='text' placeholder='Country' required/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <span>Gender</span>
                        <Radio
                            label='Male'
                            name='gender'
                            value='male'
                            className='space'
                            checked={gender === 'male'}
                            onChange={this.changeGender}/>
                        <Radio
                            label='Female'
                            name='gender'
                            value='female'
                            className='space'
                            checked={gender === 'female'}
                            onChange={this.changeGender}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                            <Input fluid name='password' type='password' placeholder='Password *' required/>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left'>
                            <Input fluid name='password_confirmation' type='password' placeholder='Password Confirmation *' required/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}