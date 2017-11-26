
import React from 'react'
import {Grid, Dropdown, Icon, Label} from 'semantic-ui-react';

class SkillsSection extends React.Component{

    state={
        skills:[],
    }

    componentDidMount = async() => {
        try{
            // const resRaw = await fetch('/getSkills')
            // const res = await resRaw.json()
            // this.setState({
            //     skills: res.data.skills
            // })
            this.setState({ 
                skills: seededSkills.map(x => {
                    return { key:x.id, text:capitalize(x.name), value:x.id }
                })
            })
        }catch(e){
            console.log(e)
        }
    }

    handleAddition = (e, { value }) => {
        this.setState({
          skills: [{ text: value, value }, ...this.state.skills],
        })
    }

    handleChange = (e, { value }) => {
        const skillsNormalized = value.map(x => {
            const skillObject = this.state.skills.filter(y => y.key === x)[0]
            return skillObject
        })
        this.props.onChangeSkills(skillsNormalized)
    }
    
    renderLabel = label => ({
        color: 'yellow',
        content: `${label.text}`,
    })
      
    render(){
        const { skills } = this.state
        const { selectedSkills } = this.props
        const displayableSkills = selectedSkills.map(x => x.key )

        return (
            <Grid stackable className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>SKILLS YOU WANT TO TEACH</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        {/* <Input name='skills' fluid placeholder='Start typing to search for a skill.' onKeyPress={this.addNewSkill}/> */}
                        <Dropdown
                            options={skills}
                            placeholder='Start typing to search for a skill.'
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            value={displayableSkills}
                            onAddItem={this.handleAddition}
                            onChange={this.handleChange}
                            renderLabel={this.renderLabel}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}


export default SkillsSection

function capitalize(str=''){
    if(!str) return
    return str.trim().split('')
          .map((char,i) => i === 0 ? char.toUpperCase() : char )
          .reduce((final,char)=> final += char, '' )
    }

let seededSkills = [
    {
        "id":1,
        "name":"RoR"
    },
    {
        "id": 2,
        "name": "ruby on rails",
        "created_at": "2017-06-14T11:19:16.382Z",
        "updated_at": "2017-06-14T11:19:16.382Z"
    },
    {
        "id": 3,
        "name": "javascript",
        "created_at": "2017-06-14T11:19:16.429Z",
        "updated_at": "2017-06-14T11:19:16.429Z"
    },
    {
        "id": 4,
        "name": "jquery",
        "created_at": "2017-06-14T11:19:16.443Z",
        "updated_at": "2017-06-14T11:19:16.443Z"
    },
    {
        "id": 6,
        "name": "css",
        "created_at": "2017-06-14T11:19:16.459Z",
        "updated_at": "2017-06-14T11:19:16.459Z"
    },
    {
        "id": 7,
        "name": "haml",
        "created_at": "2017-06-14T11:19:16.484Z",
        "updated_at": "2017-06-14T11:19:16.484Z"
    },
    {
        "id": 8,
        "name": "sass",
        "created_at": "2017-06-14T11:19:16.509Z",
        "updated_at": "2017-06-14T11:19:16.509Z"
    },
    {
        "id": 9,
        "name": "php",
        "created_at": "2017-06-14T11:19:16.518Z",
        "updated_at": "2017-06-14T11:19:16.518Z"
    },
    {
        "id": 10,
        "name": "wordpress",
        "created_at": "2017-06-14T11:19:16.525Z",
        "updated_at": "2017-06-14T11:19:16.525Z"
    },
    {
        "id": 11,
        "name": "java",
        "created_at": "2017-06-14T11:19:16.534Z",
        "updated_at": "2017-06-14T11:19:16.534Z"
    },
    {
        "id": 12,
        "name": "c",
        "created_at": "2017-06-14T11:19:16.542Z",
        "updated_at": "2017-06-14T11:19:16.542Z"
    },
    {
        "id": 13,
        "name": "c++",
        "created_at": "2017-06-14T11:19:16.550Z",
        "updated_at": "2017-06-14T11:19:16.550Z"
    },
]