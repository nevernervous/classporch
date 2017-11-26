import React from 'react';
import {Navbar, Footer} from './modules';
import Routes from './Routes';
import {history} from "./redux/store";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Routes history={history}/>
        <Footer/>
      </div>
    )
  }
}