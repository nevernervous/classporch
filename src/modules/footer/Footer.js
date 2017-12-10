import React, {Component} from 'react';
import './styles.css';
import {
  Grid,
  Icon,
  Button,
  Menu
} from 'semantic-ui-react';
import logoLight from '../../assets/logo_light.png'
import {history} from '../../redux/store';
import {connect} from 'react-redux'

class Footer extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.renderFooterExtra = this.renderFooterExtra.bind(this);
  }

  handleItemClick = (e, {name}) => {
    console.log(name);
    switch (name) {
      case 'privacy-policy':
        history.push('/privacy-policy');
        break;
      case 'terms-of-service':
        history.push('/terms-of-service');
        break;
      case 'contact-us':
        history.push('/contact');
        break;
      default:
        console.error('Pages not available');
        break;
    }
  };

  showSignUp = () => {
    history.push('/sign-up');
  };

  renderFooterExtra = () => {
    if (
      !window.location.pathname.includes('contact') &&  
      !window.location.pathname.includes('privacy') &&
      !window.location.pathname.includes('terms') &&
      window.location.pathname !== '/'
    ) { return null; }
    return (
      <div className='footer-background'>
        <Grid>
          <Grid.Row/>
          <Grid.Row centered>
            <Grid.Column width={6} style={{marginBottom: 24}}>
              <div className='subscribe-label'>
                INTRODUCING TOP TUTORS
              </div>
              <p className='subscribe-subtitle'>
                At ClassPorch, we have experienced and certified tutors as new tutors are carefully interviewed to
                ensure they are well qualified before they acquire a tutoring position. With this, we can be sure that
                our students feel comfortable working with a particular tutor and get the best help possible!
              </p>
              <br/>
              <div>
                <Button style={{marginLeft: 10, marginRight: 10}} inverted as={'a'} size='large' circular icon='facebook f' href={'https://www.facebook.com/ClassPorch-1715528735411313'}/>
                <Button style={{marginLeft: 10, marginRight: 10}} inverted as={'a'} size='large' circular icon='twitter' href={'https://twitter.com/classporch'}/>
                <Button style={{marginLeft: 10, marginRight: 10}} inverted as={'a'} size='large' circular icon='instagram' href={'https://www.instagram.com/classporch/'}/>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row/>
        </Grid>
    </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderFooterExtra()}
        <div className='footer-bottom-background'>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={14}>
                <Menu secondary borderless>
                  <Menu.Item>
                    <div className='copyright-text'>
                      Copyright ClassPorch 2017
                    </div>
                  </Menu.Item>
                  <Menu.Menu position='right'>
                    <Menu.Item
                      className='footer-button'
                      onClick={this.handleItemClick}
                      name='privacy-policy'>
                      Privacy Policy
                    </Menu.Item>
                    <Menu.Item
                      className='footer-button'
                      onClick={this.handleItemClick}
                      name='terms-of-service'>
                      Terms of Service
                    </Menu.Item>
                    <Menu.Item
                      className='footer-button'
                      onClick={this.handleItemClick}
                      name='contact-us'>
                      Contact Us
                    </Menu.Item>
                    <Menu.Item
                      className='footer-button'
                      onClick={this.handleItemClick}
                      name='pricing'>
                      Pricing
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({auth}) => {
  const {role} = auth;
  return {role}
};

export default connect(mapStateToProps, {})(Footer)