
import React, {Component} from 'react'
import { Grid,Label,Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import '../../../styles.css'

class SkillSegment extends Component {


    onRemoveSkill = (index,skillName,action,e,{value}) => {
        if(this.props.mode !== 'edit'){
            return
        }
        const skills  = this.props.profile['skill-ids']
        this.props.onChangeSkill(index,skillName,action,value,skills)
    }

    onClickEdit = () => {
        this.props.toggleProfileMode('edit')
    }


    renderSkills = (skillIds) => {
        console.log(skillIds)
        return skillIds.map((skill,i) => {
            return(
                <Label name='skill' type='number' as='button' key={i} className='skill' size='large'
                 onClick={this.onRemoveSkill.bind(this,i,skill.name,'delete')} color='yellow'>
                    {skill.name}
                    <Icon className='skill-remove-icon' name='delete'/>
                </Label>
            )
        })
    }


    render(){
        const { userId, profile, presentProfileId, role, firstName, mode, onChangeSkill } = this.props
        console.log(userId)
        console.log(presentProfileId)
        const skills  = profile['skill-ids']? this.renderSkills(profile['skill-ids']) : []
        const name = profile['full-name'] ? profile['full-name'].split(' ')[0].toUpperCase() : null
        
        return(
            <Grid padded relaxed style={{width:'100%',paddingTop:30}} >
                <Grid.Row stretched columns={1} centered >
                    <Grid.Column width={12} textAlign='left' >
                        <div className='sub-heading' > 
                        { userId === presentProfileId ? 
                            "SKILLS YOU TEACH" : "SKILLS " + name + " TEACHES" }
                        </div>
                    </Grid.Column>
                </Grid.Row>
                {/* {   mode === 'edit' &&
                    <Grid.Row centered>
                        <Grid.Column width={12} textAlign='left'>
                            <Input name='skills' fluid placeholder='Start typing to search for a skill.' onKeyPress={this.addNewSkill}/>
                        </Grid.Column>
                    </Grid.Row>
                } */}
                <Grid.Row centered>
                    <Grid.Column width={6} textAlign='left'>
                        {skills}
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='left' >
                    {   presentProfileId === userId &&
                        <Icon name='edit' size='large' color='grey' className='edit-icon' onClick={this.onClickEdit} />
                    }                    
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const styles = {
    heading:{
        fontSize:'1.1em',
        fontWeight:600,
        marginTop:'40px'
    },
    text:{
        fontSize:15
    }
}


// const mapStateToProps = ({ profileState }) => {
//     const {profile} = profileState
//     return { profile }
// }

export default connect(null,{ })(SkillSegment)