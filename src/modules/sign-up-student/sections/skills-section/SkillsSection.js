import React, {Component} from 'react';
import {Grid, Input, Icon, Label} from 'semantic-ui-react';
import './styles.css';

export default class SkillsSection extends React.Component {
    getInitialState = () => {
        var items = [{
            id: 1,
            key:'maths',
            name:'Maths'
        },{
            id: 2,
            key:'science',
            name:'Science'
        },{
            id: 3,
            key: 'french',
            name: 'French'
        }];

        return {
            items: items,
            selectedSkills: [1, 2 ,3]
        };
    }

    addNewSkill = (e) => {
        if(e.key === 'Enter'){
            var {items, selectedSkills} = this.state;
            var skill = {
                id: e.target.id,
                key: e.target.value,
                name: e.target.value
            };
            items.push(skill);
            this.setState({
                items: items
            });
            e.target.value = '';
        }
    }

    removeThisSkill = (e) => {
        var {items} = this.state;
        var skillName;
        if(e.target.tagName==='I'){
            skillName = e.target.parentElement.textContent;
            var newItems = this.removeOne(items, skillName);
            this.setState({
                items: newItems
            });
        }
    }

    removeOne = (array, predicate) => {
        for (var i = 0; i < array.length; i++) {
            if (array[i].name===predicate) {
                 array.splice(i, 1);
                 return array;
            }
        }
    }

    render(){
        var Labels = this.state.items.map((item, i) => {
            return (
                <Label name='skill' type='number' as='button' key={item.key} className='skill' 
                        size='large' onClick={this.removeThisSkill} color='yellow' value={item.id}>
                    {item.name}
                    <Icon className='skill-remove-icon' name='delete'/>
                </Label>
            );
        })

        const {selectedSkills} = this.state;

        return (
            <Grid stackable className='sign-up-about-education-body'>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <p className='sign-up-label'>SKILLS YOU WANT TO LEARN</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        <Input name='skills' fluid placeholder='Start typing to search for a skill.' onKeyPress={this.addNewSkill}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={12} textAlign='left'>
                        {Labels}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}