import React from 'react';
import {Grid, Input, Select, Form} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

export default class EducationSection extends React.Component {

    state = {
        startDate: moment().subtract(4, 'years').format('D-mm-Y'),
        endDate: moment().format('D-mm-Y'),
        numberOfEducationFields: 1,
        gradList: []
    };

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    getEducations = () => {
        const {startDate, endDate, numberOfEducationFields} = this.state;
        const Educations = [];

        for (let i = 0; i < numberOfEducationFields; i++) {
            Educations.push(
                <Grid>

                </Grid>
            )
        }
        return Educations;
    };

    render() {
        return (
            <Grid className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>EDUCATION</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input label="School Name" type='text' name={'college_name'} fluid placeholder='Name of School'
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>

                        <Form.Select size={'large'} label="Graduation" name='education' onChange={this.props.onChange} placeholder='Select your graduation'
                                options={this.state.gradList} required/>
                    </Grid.Column>
                    {/*<Grid.Column width={6} textAlign='left'>*/}
                    {/*<Input fluid name={'start_education'} type='text' placeholder='Start Date * (dd/mm/yyyy)' onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')} onBlur={this.onFocusChange} required onChange={this.props.onChange}/>*/}
                    {/*</Grid.Column>*/}
                    {/*<Grid.Column width={6} textAlign='left'>*/}
                    {/*<Input fluid name={'finish_education'} type='text' placeholder='End Date * (dd/mm/yyyy)' onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')} onBlur={this.onFocusChange} required onChange={this.props.onChange}/>*/}
                    {/*</Grid.Column>*/}
                </Grid.Row>
            </Grid>
        );
    }
}