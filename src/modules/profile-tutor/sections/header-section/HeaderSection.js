import React, {Component} from 'react'
import {Grid, Button} from 'semantic-ui-react'
import {history} from '../../../../redux/store';
import {connect} from 'react-redux'
import RequestSession from './RequestSession'
import './styles.css'

const FileInput = require('react-file-input');


class HeaderSection extends Component {

  handleChange = (event) => {
    console.log('Selected file:', event.target.files[0]);
  };

  redirectToChats = () => {
    const currentUser = {
      name: this.props.firstName + " " + this.props.lastName,
      role: this.props.role,
      id: this.props.userId
    };
    const otherUser = {
      name: this.props.profile["full-name"],
      role: 'tutor',
      id: this.props.presentProfileId
    };
    this.props.showMessages(currentUser, otherUser, null);
    history.push('/messages');
  };

  render() {
    const {userId, presentProfileId, profile, role} = this.props
    return (
      <Grid padded relaxed style={{width: '100%', paddingTop: '40px'}}>
        <Grid.Row columns={1} centered>

          <Grid.Column width={6} textAlign='left'>
            <div style={styles.heading}>
              {userId === presentProfileId ?
                'Your Profile' : profile['full-name']}
            </div>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <div>
              {userId === presentProfileId ?
                <form className='profile-picture-form'>
                  <FileInput name="myImage"
                             accept=".png,.gif"
                             placeholder="Change Profile Picture"
                             className='image-input'
                             onChange={this.handleChange}/>
                </form>
                :
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <RequestSession profile={profile}/>
                  <Button
                    onClick={this.redirectToChats}
                    color='yellow'
                    style={{marginLeft: '15px'}}
                    content='MESSAGE'/>
                </div>
              }
            </div>
          </Grid.Column>

        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={12} textAlign='left'>

            {userId === presentProfileId ?
              <div style={styles.text}>
                You have registered as a
                <span style={styles.roleText}> {' ' + role} </span>
              </div> : null
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const styles = {
  text: {
    fontSize: '1.2em'
  },
  roleText: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  heading: {
    fontSize: '40px',
    fontWeight: '300'
  }
};

// const mapStateToProps = ({auth,profileState}) => {
//     const role = auth.userObject.user.role

//     return  {role}
// }

export default connect(null, {})(HeaderSection)