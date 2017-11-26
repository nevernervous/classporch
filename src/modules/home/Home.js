import React from 'react';
import {
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7
} from './sections';
import MenuChangeStore from '../../menu';


export default class Home extends React.Component {
  componentWillMount(){
    this.items = [
            {
                key: 'sign-in',
                name: 'sign-in',
                buttonTitle: 'SIGN IN'
            }, {
                key: 'pricing',
                name: 'pricing',
                buttonTitle: 'PRICING'
            }, {
                key: 'about-us',
                name: 'about-us',
                buttonTitle: 'ABOUT US'
            }, {
                key: 'contact-us',
                name: 'contact-us',
                buttonTitle: 'CONTACT US'
            }
        ];
        MenuChangeStore.changeMenu(this.items);
  }

  render() {
    return (
      <div>
        <Section1></Section1>
        <Section2></Section2>
        <Section3></Section3>
        <Section4></Section4>
        <Section6></Section6>
        <Section7></Section7>
      </div>
    );
  }
}