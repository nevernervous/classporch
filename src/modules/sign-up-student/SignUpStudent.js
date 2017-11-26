
import React, {Component} from 'react';
import {AboutSection, BottomSection, ContactSection, EducationSection, SkillsSection, TopSection} from './sections';
import {Form} from 'semantic-ui-react';
import {apiEndpoints} from '../../ApiEndpoints';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions';

class SignUpStudent extends React.Component{

    state = {
        selectedSkills:[]
    }

    onChangeSkills = (selectedSkills) => {
        this.setState({ selectedSkills })
    }


    onFormSubmitted = (event, {formData}) => {

        const formSkills = this.state.selectedSkills.map(x => {
            return { id: x.key, name: x.text }
        })

        console.log(formData)
        //Modify form data for actual use:
        var parsedForm = {};        
        parsedForm['user'] = {};
        parsedForm['user']['educations_attributes'] = {}
        parsedForm['user']['educations_attributes']['0'] = {}
        parsedForm['user']['tutor_experience_attributes'] = {}
        parsedForm['auth'] = {}

        parsedForm['user']['role'] = 'student';
        parsedForm['user']['email'] = formData['email'];
        parsedForm['user']['password'] = formData['password'];
        parsedForm['user']['password_confirmation'] = formData['password_confirmation'];
        parsedForm['user']['first_name'] = formData['first_name'];
        parsedForm['user']['last_name'] = formData['last_name'];
        parsedForm['user']['gender'] = formData['gender'];
        parsedForm['user']['birthday_date'] = formData['dob'];
        parsedForm['user']['country'] = formData['country'];
        parsedForm['user']['city'] = formData['city'];
        parsedForm['user']['number'] = formData['mobile'];
        parsedForm['user']['skills'] = formSkills
        parsedForm['user']['provider'] = this.props.errorObject.provider || 'email'

        parsedForm['user']['educations_attributes']['0']['start_education'] = formData['start_education'];
        parsedForm['user']['educations_attributes']['0']['finish_education'] = formData['finish_education'];
        parsedForm['user']['educations_attributes']['0']['university_name'] = formData['college_name'];


        parsedForm['auth']['access_token'] = this.props.errorObject.access_token || null
        parsedForm['auth']['secret'] = this.props.errorObject.secret || null
        
        event.preventDefault();

        console.log( JSON.stringify(parsedForm,null,4) )

        this.props.signupUser(parsedForm);
        
    }

    render(){
        return (
                <Form encType='application/json' onSubmit={this.onFormSubmitted}>
                    <TopSection/>
                    <AboutSection/>
                    <EducationSection/>
                    <ContactSection/>
                    <SkillsSection onChangeSkills={this.onChangeSkills} selectedSkills={this.state.selectedSkills} />
                    <BottomSection/>
                </Form>
        )
    }
}

// export default SignUpStudent;


const mapStateToProps = ({auth}) => {
	const { email, errorObject, loading } =  auth
	
	return { email, errorObject, loading }
}


export default connect(mapStateToProps, { signupUser, 
										   })(SignUpStudent);

