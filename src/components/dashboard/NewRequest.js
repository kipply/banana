import React, { Component } from 'react';

import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

import Upload from 'react-icons/lib/fa/upload';
import Floppy from 'react-icons/lib/fa/floppy-o';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';


// delettttt
const items = [];
items.push(<MenuItem primaryText={`banaan`} />);

for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      request: '',
      language: 10,
      difficulty: 0.5,
      toastOpen: false,
      toastMessage: '',
    };
  }

  handleLangChang = (event, index, language) => {
    this.setState({language});
  };

  componentWillMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.props.history.push('/');
      } else {
        this.setState({ user });
        const profileRef = firebase.database().ref(`users/${this.state.user.uid}/profile`);

        profileRef.once('value', (snapshot) => {
          const profile = snapshot.val();

          firebase.storage().ref('user-dps').child(`${this.state.user.uid}.jpg`).getDownloadURL()
            .then((url) => {
              this.setState({
                name: profile.name,
                image: url,
              });
            });
        });
      }
    });
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  addRequest() {
    let ok = true;
    // Check values
    if (!this.state.request) {
      ok = false;
      this.setState({ toastMessage: 'Request field cannot be blank.' });
      this.setState({ toastOpen: true });
    }

    // Perform save
    if (ok) {
      const requestsRef = firebase.database().ref(`/requests/${this.state.language}`);
      var req = requestsRef.push({
        user: this.state.user.uid,
        request: this.state.request,
        difficulty: this.state.difficulty,
      }).then((snap) => {
        var newId = snap.key;

        const usersRef = firebase.database().ref(`/users/${this.state.user.uid}/requests/`);
        usersRef.push({
          id: newId,
        });
        this.setState({ toastMessage: 'Successfully made request!' });
        this.setState({ toastOpen: true });
      });
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="new-request">
        <Paper className="new-request-container" zDepth={1}>
          <Row>
            <div className="pprofile-pic-container">
              <div className="pprofile-image-container">
                <img className="pprofile-image" src={this.state.image} alt="profile" />
              </div>
            </div>
            <div className="vertical-center">{this.state.name}</div>
          </Row>
          <Row>
            <TextField
              hintText="What is your request?"
              multiLine
              value={this.state.request}
              style={{fontSize: 25}}
              className="new-request-input"
              fullWidth
              onChange={(e, val) => { this.setState({ request: val }); }}
            />
          </Row>
          <span style={{color: 'grey', position: 'relative', top: 15}}> Request difficulty</span>
          <Slider
            step={0.10}
            value={this.state.difficulty}
            onChange={ (e, val) => this.setState({difficulty: val}) }
          />
          <Row>
            <Col>
              <SelectField
                value={this.state.language}
                onChange={this.handleLangChang}
                maxHeight={200}
              >
                {items}
              </SelectField>
            </Col>
            <Col>
              <RaisedButton
                label="REQUEST"
                disabled={this.state.name === ''}
                onClick={() => this.addRequest()}
              />
            </Col>
          </Row>
        </Paper>
        <Snackbar
          open={this.state.toastOpen}
          message={this.state.toastMessage}
          autoHideDuration={1000}
          onRequestClose={() => this.setState({ toastOpen: false })}
        />
      </div>
    );
  }
}

export default NewRequest;
