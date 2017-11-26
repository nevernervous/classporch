
import React from 'react';
import {Grid, Input, Radio} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

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






































// import React from 'react';
// import {Grid, Input, Radio, Label} from 'semantic-ui-react';
// import moment from 'moment';
// import './styles.css';

// export default class AboutSection extends React.Component {


//     state = {
//         maxDate: moment().subtract(3, 'years'),
//         first_name:'',
//         last_name:'',
//         dob:'',
//         city:'',
//         country:'',
//         gender: 'male',
//         password:'',
//         password_confirm:'',
//         isPasswordMatch:true
//     };

//     onTextChange = (event) => {
//         // console.log( JSON.stringify(this.state,null,4) )
//         let { name, value } = event.target
//         switch(name) {
//             case 'first_name':
//                 return this.setState({ first_name: value })
//             case 'last_name':
//                 return this.setState({ last_name: value })
//             case 'dob':
//                 return this.setState({ dob: value })
//             case 'city':
//                 return this.setState({ city: value })
//             case 'country':
//                 return this.setState({ country: value })
//             case 'password':
//                 return this.setState({ password: value })
//             case 'password_confirmation':
//                 return this.setState({ password_confirm: value })
//             default:
//                 return console.log(name+' doesnt match any case')
//         }
//     };

//     // changeDate: function (value) {
//     //     this.setState({startDate: value});
//     // },

//     changeGender = (e,{value}) => {
//         // console.log( JSON.stringify(this.state,null,4) )
//         this.setState({gender: value})
//     };

//     // checkMatch: function(){
//     //     const { password, password_confirm } = this.state
//     //     if( password_confirm === '' ){
//     //         return null
//     //     }
//     //     if( this.state.password !== this.state.password_confirm ){
//     //         return this.setState({ isPasswordMatch:false })
//     //     } 
//     //     this.setState({ isPasswordMatch:true })
//     // },

//     checkMatchConfirm = (event) => {
//         const { password, password_confirm } = this.state

//         if( password_confirm === '' && event.target.name === 'password' ){
//             return null
//         }
//         if( password !== password_confirm ){
//             return this.setState({ isPasswordMatch:false })
//         } 
//         this.setState({ isPasswordMatch:true })
//     }

//     onFocusChange = (event, data) => {
//         console.log(data )
//         if(event.type==='focus'){
//             event.target.type = 'date'
//             event.target.click()
//         }else{
//             event.target.type = 'text'
//         }
//     };

//     // passwordError : function(){
//     //     if(this.state.isPasswordMatch === false){
//     //     }
//     // },

//     render() {
//         const { maxDate, gender, isPasswordMatch } = this.state;
//         const passwordError = isPasswordMatch === false? <Label basic color='red' pointing>Password doesn't match</Label> : null

//         return (
//             <Grid className='sign-up-about-section-body'>
//                 <Grid.Row centered>
//                     <Grid.Column width={12} textAlign='left'>
//                         <p className='sign-up-label'>ABOUT</p>
//                     </Grid.Column>
//                 </Grid.Row>
//                 <Grid.Row centered>
//                     <Grid.Column width={6} textAlign='left'>
//                         <Input fluid name='first_name' placeholder='First Name *' onChange = {this.onTextChange}
//                                 value = {this.state.first_name} required/>
//                     </Grid.Column>
//                     <Grid.Column width={6} textAlign='left'>
//                         <Input fluid name='last_name' placeholder='Last Name *' onChange = {this.onTextChange}
//                                 value = {this.state.last_name} required/>
//                     </Grid.Column>
//                 </Grid.Row>
//                 <Grid.Row centered>
//                     <Grid.Column width={12} textAlign='left'>
//                             <Input fluid name='dob' type='text' placeholder='Date of birth* (dd/mm/yyyy)' value = {this.state.dob}
//                                     onFocus={this.onFocusChange} onBlur={this.onFocusChange} onChange={this.onTextChange} required/>
//                     </Grid.Column>
//                 </Grid.Row>
//                 <Grid.Row centered>
//                     <Grid.Column width={6} textAlign='left'>
//                             <Input fluid name='city' type='text' placeholder='City' value={this.state.city} onChange={this.onTextChange}  required/>
//                     </Grid.Column>
//                     <Grid.Column width={6} textAlign='left'>
//                             <Input fluid name='country' type='text' placeholder='Country' value={this.state.country} onChange={this.onTextChange} required/>
//                     </Grid.Column>
//                 </Grid.Row>
//                 <Grid.Row centered>
//                     <Grid.Column width={12} textAlign='left'>
//                         <span>Gender</span>
//                         <Radio
//                             label='Male'
//                             name='gender'
//                             value='male'
//                             className='space'
//                             checked={this.state.gender === 'male'}
//                             onChange={this.changeGender}/>
//                         <Radio
//                             label='Female'
//                             name='gender'
//                             value='female'
//                             className='space'
//                             checked={this.state.gender === 'female'}
//                             onChange={this.changeGender}/>
//                     </Grid.Column>
//                 </Grid.Row>
//                 <Grid.Row centered>
//                     <Grid.Column width={6} textAlign='left'>
//                             <Input fluid name='password' type='password' placeholder='Password *'
//                                     value={this.state.password} onChange={this.onTextChange} onBlur={this.checkMatchConfirm} required/>
//                             { passwordError }
//                     </Grid.Column>
//                     <Grid.Column width={6} textAlign='left'>
//                             <Input fluid name='password_confirmation' type='password' placeholder='Password Confirmation *'
//                                     value={this.state.password_confirm} onChange={this.onTextChange} onBlur={this.checkMatchConfirm}  required/>
//                             { passwordError }
//                     </Grid.Column>
//                 </Grid.Row>
//             </Grid>
//         );
//     }
// }