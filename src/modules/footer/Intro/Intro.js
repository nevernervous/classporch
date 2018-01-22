import React, {Component} from "react";
import {Button, Grid, List} from "semantic-ui-react";
import {history} from '../../../redux/store';
import './_intro.scss';

export default class Intro extends Component {
    constructor() {
        super();
        this.state = {
            introLinks: [{key: 'about-us', value: 'ABOUT US'}, {key: 'contact', value: 'CONTACT'}, {
                key: 'pricing',
                value: 'PRICING'
            }, {key: 'faq', value: 'FAQ (Coming soon)'}],
            tutorLinks: [{key: '/', value: 'French Tutors'}, {key: '/', value: 'English Tutors'}, {
                key: '/',
                value: 'Math Tutors,'
            }, {key: '/', value: 'Biology Tutors'},{key: '/', value: 'Physics Tutors'},{key: '/', value: 'Science Tutors'},{key: '/', value: 'Adult Education'},{key: '/', value: 'ESL Tutors'}]
        };
        this.renderLinks = this.renderLinks.bind(this)
    }

    goTo(link) {
        window.scrollTo(0, 0);
        history.replace(link);
    }

    renderLinks(param) {
        return this.state[param].map((item,key) => <List.Item key={key}><a onClick={this.goTo.bind(this, '/' + item.key)}>{item.value}</a></List.Item>);
    }

    render() {
        return (
            <div className='footer-background footer-intro-list' id={'intro'}>
                <Grid padded={'horizontally'}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <List link size={'tiny'} className={'intro-items'}>
                                {this.renderLinks('introLinks')}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List link size={'tiny'} className={'intro-items'}>
                                {this.renderLinks('tutorLinks')}
                            </List>
                        </Grid.Column>
                        <Grid.Column textAlign={'center'}>
                                {/*<Button size={'large'}>Contact Us</Button>*/}
                                <Button style={{marginLeft: 10, marginRight: 10,color: '#494E50'}} as={'a'} size='large'
                                        circular icon='facebook f'
                                        href={'https://www.facebook.com/ClassPorch-1715528735411313'}/>
                                <Button style={{marginLeft: 10, marginRight: 10,color: '#494E50'}} as={'a'} size='large'
                                        circular icon='twitter' href={'https://twitter.com/classporch'}/>
                                <Button style={{marginLeft: 10, marginRight: 10,color: '#494E50'}} as={'a'} size='large'
                                        circular icon='instagram' href={'https://www.instagram.com/classporch/'}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                </Grid>
            </div>
        )
    }
}