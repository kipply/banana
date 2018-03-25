import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import * as firebase from 'firebase';

import '../css/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
    };
  }

  componentWillMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/');
      } else {
        this.setState({ user });
      }
    });
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              big boi column
            </Col>
            <Col xs={12} md={4}>
              <Row>
                <Col xs={4} sm={12}>
                  column
                </Col>
                <Col xs={4} sm={12}>
                  column
                </Col>
                <Col xs={4} sm={12}>
                  column
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Dashboard);
