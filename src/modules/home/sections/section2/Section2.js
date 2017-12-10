import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css'

export default class Section2 extends React.Component {
  state = {
    readMore: false
  };

  constructor(props) {
    super(props);
    this.expandContent = this.expandContent.bind(this);
  }

  expandContent = () => {
    if(this.state.readMore) {
      history.push('/sign-up');
    } else {
      this.setState({readMore: true});
    }
  };

  render() {
    const expandedContent = <p className='about-us-content'>
      ClassPorch is a platform that is created and tailored to connect students with tutors, providing
      students
      with simplified learning. The objective of ClassPorch is to provide top-notch education for anyone,
      anywhere
      and at anytime.
      <br/>
      <br/>
      With instructional videos, practice exercises, and a personalized learning dashboard, you are offered
      the
      enablement to study at your own pace in and out of the classroom. Whether it is math, science, computer
      programming, history, art history, economics, and more, with ClassPorch, there is nothing to worry
      about.
      <br/>
      <br/>
      Our tutoring encompasses learners from K-5, Middle School, High School, College and University. This
      platform offers you a smart way to progress your learning and most of all make you take pleasure in the
      learning itself.
      <br/>
      <br/>
      At ClassPorch, we implements modern techniques and methods, as well as individual approach,
      interactivity,
      flexible tutoring system and Whiteboard online teaching facilities to give you a memorable learning
      experience.
    </p>;

    const content = <p className='about-us-content'>
      ClassPorch is a platform that is created and tailored to connect students with tutors, providing
      students
      with simplified learning. The objective of ClassPorch is to provide top-notch education for anyone,
      anywhere
      and at anytime.
      <br/>
      <br/>
      With instructional videos, practice exercises, and a personalized learning dashboard, you are offered
      the
      enablement to study at your own pace in and out of the classroom. Whether it is math, science, computer
      programming, history, art history, economics, and more, with ClassPorch, there is nothing to worry
      about.

    </p>;

    const { readMore } = this.state;

    return (
      <Grid>
        <Grid.Row centered stretched verticalAlign='middle' className='section-background'>
          <Grid.Column width={12}>
            <div className='about-us-section'>
              <p className='about-us-header' style={{color: '#fcbd08'}}>
                ABOUT US
              </p>
              {readMore ? expandedContent : content}
              <br/>
              <Button circular basic color='yellow' size='large' onClick={this.expandContent}>{ readMore ? 'FIND MORE' : 'READ MORE'}</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
