import React, { Component } from 'react';
import Navbar from './Navbar';


export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
