import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import Upload from 'react-icons/lib/fa/upload';
import Floppy from 'react-icons/lib/fa/floppy-o';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

import '../css/Profile.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      name: '',
      language: '',
      description: '',
      image: '',
      toastOpen: false,
      toastMessage: '',
    };
  }

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
                description: profile.description,
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

  saveProfile() {
    let ok = true;
    // Check values
    if (this.state.name.length > 100) {
      ok = false;
      this.setState({ toastMessage: 'Dude why is your name so long? Save not successful.' });
      this.setState({ toastOpen: true });
    }

    // Perform save
    if (ok) {
      const profileRef = firebase.database().ref(`users/${this.state.user.uid}/profile`);
      profileRef.set({
        name: this.state.name,
        description: this.state.description,
        image: this.state.image,
      }).then(() => {
        this.setState({ toastMessage: 'Saved!' });

        // Upload file if one was uploaded
        if (this.state.file) {
          const storageRef = firebase.storage().ref('/user-dps/');

          const dpRef = storageRef.child(`${this.state.user.uid}.jpg`);
          dpRef.put(this.state.file).then(() => {
            this.setState({ toastOpen: true });
          });
        } else {
          this.setState({ toastOpen: true });
        }
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
      <div className="profile">
        <h1>My Profile</h1>
        <Paper className="profile-form-container" zDepth={1}>
          <Grid>
            <Row className="profile-row">
              <Col lg={4}>
                <TextField
                  floatingLabelText="Name or Title"
                  value={this.state.name}
                  errorText={this.state.name ? '' : 'This field is required.'}
                  onChange={(e, val) => { this.setState({ name: val }); }}
                />
                <select data-placeholder="Choose a Language...">
                  value={this.state.language}
                  <!-- This is bad practice: Keeping everything on one line. However, I actually want to read my other code.-->
                  <option value="AF">Afrikanns</option> <option value="SQ">Albanian</option> <option value="AR">Arabic</option> <option value="HY">Armenian</option> <option value="EU">Basque</option> <option value="BN">Bengali</option> <option value="BG">Bulgarian</option> <option value="CA">Catalan</option> <option value="KM">Cambodian</option> <option value="ZH">Chinese (Mandarin)</option> <option value="HR">Croation</option> <option value="CS">Czech</option> <option value="DA">Danish</option> <option value="NL">Dutch</option> <option value="EN">English</option> <option value="ET">Estonian</option> <option value="FJ">Fiji</option> <option value="FI">Finnish</option> <option value="FR">French</option> <option value="KA">Georgian</option> <option value="DE">German</option> <option value="EL">Greek</option> <option value="GU">Gujarati</option> <option value="HE">Hebrew</option> <option value="HI">Hindi</option> <option value="HU">Hungarian</option> <option value="IS">Icelandic</option> <option value="ID">Indonesian</option> <option value="GA">Irish</option> <option value="IT">Italian</option> <option value="JA">Japanese</option> <option value="JW">Javanese</option> <option value="KO">Korean</option> <option value="LA">Latin</option> <option value="LV">Latvian</option> <option value="LT">Lithuanian</option> <option value="MK">Macedonian</option> <option value="MS">Malay</option> <option value="ML">Malayalam</option> <option value="MT">Maltese</option> <option value="MI">Maori</option> <option value="MR">Marathi</option> <option value="MN">Mongolian</option> <option value="NE">Nepali</option> <option value="NO">Norwegian</option> <option value="FA">Persian</option> <option value="PL">Polish</option> <option value="PT">Portuguese</option> <option value="PA">Punjabi</option> <option value="QU">Quechua</option> <option value="RO">Romanian</option> <option value="RU">Russian</option> <option value="SM">Samoan</option> <option value="SR">Serbian</option> <option value="SK">Slovak</option> <option value="SL">Slovenian</option> <option value="ES">Spanish</option> <option value="SW">Swahili</option> <option value="SV">Swedish </option> <option value="TA">Tamil</option> <option value="TT">Tatar</option> <option value="TE">Telugu</option> <option value="TH">Thai</option> <option value="BO">Tibetan</option> <option value="TO">Tonga</option> <option value="TR">Turkish</option> <option value="UK">Ukranian</option> <option value="UR">Urdu</option> <option value="UZ">Uzbek</option> <option value="VI">Vietnamese</option> <option value="CY">Welsh</option> <option value="XH">Xhosa</option>
                </select>
              </Col>
              <Col lg={8} className="profile-pic-container">
                <div className="profile-image-container">
                  <img className="profile-image" src={this.state.image} alt="profile" />
                </div>
                <RaisedButton
                  type="file"
                  icon={<Upload />}
                  label="UPLOAD IMAGE"
                  backgroundColor="#4DD0EA"
                  onClick={() => this.upload.click()}
                />
                <input
                  type="file"
                  ref={(ref) => { this.upload = ref; }}
                  style={{ display: 'none' }}
                  onChange={e => this.handleImageChange(e)}
                />
              </Col>
            </Row>
            <Row className="profile-row">
              <Col lg={12}>
                <TextField
                  floatingLabelText="Description"
                  multiLine
                  value={this.state.description}
                  style={{ width: 500 }}
                  onChange={(e, val) => { this.setState({ description: val }); }}
                />
              </Col>
            </Row>
          </Grid>
        </Paper>
        <RaisedButton
          type="file"
          icon={<Floppy />}
          label="SAVE"
          disabled={this.state.name === ''}
          onClick={() => this.saveProfile()}
        />
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

export default withRouter(Dashboard);
