import React, { Component } from 'react';

import '../css/Home.css';

export default class Home extends Component {
  render() {
    return (
        <div className="main">
              <img src = {require("../photos/plane.jpg" id = "bg")} />
        </div>
    );
  }
}
