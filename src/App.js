import React, { Component } from 'react';
import {Navbar, Footer} from './modules';
import './App.css';

export default class App extends Component {
  render() {
    return(
        <div>
          <Navbar></Navbar>
            {this.props.children}
          <Footer></Footer>
        </div>
    )
  }
}
