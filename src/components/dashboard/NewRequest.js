import React, { Component } from 'react';

import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Upload from 'react-icons/lib/fa/upload';
import Floppy from 'react-icons/lib/fa/floppy-o';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';


// delettttt
const items = [];
items.push(<MenuItem primaryText={`banaan`} />);

for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

const languageOptions = [];

const languages = {
    "AF":"Afrikanns",
    "SQ":"Albanian",
    "AR":"Arabic",
    "HY":"Armenian",
    "EU":"Basque",
    "BN":"Bengali",
    "BG":"Bulgarian",
    "CA":"Catalan",
    "KM":"Cambodian",
    "ZH":"Chinese (Mandarin)",
    "HR":"Croation",
    "CS":"Czech",
    "DA":"Danish",
    "NL":"Dutch",
    "EN":"English",
    "ET":"Estonian",
    "FJ":"Fiji",
    "FI":"Finnish",
    "FR":"French",
    "KA":"Georgian",
    "DE":"German",
    "EL":"Greek",
    "GU":"Gujarati",
    "HE":"Hebrew",
    "HI":"Hindi",
    "HU":"Hungarian",
    "IS":"Icelandic",
    "ID":"Indonesian",
    "GA":"Irish",
    "IT":"Italian",
    "JA":"Japanese",
    "JW":"Javanese",
    "KO":"Korean",
    "LA":"Latin",
    "LV":"Latvian",
    "LT":"Lithuanian",
    "MK":"Macedonian",
    "MS":"Malay",
    "ML":"Malayalam",
    "MT":"Maltese",
    "MI":"Maori",
    "MR":"Marathi",
    "MN":"Mongolian",
    "NE":"Nepali",
    "NO":"Norwegian",
    "FA":"Persian",
    "PL":"Polish",
    "PT":"Portuguese",
    "PA":"Punjabi",
    "QU":"Quechua",
    "RO":"Romanian",
    "RU":"Russian",
    "SM":"Samoan",
    "SR":"Serbian",
    "SK":"Slovak",
    "SL":"Slovenian",
    "ES":"Spanish",
    "SW":"Swahili",
    "SV":"Swedish",
    "TA":"Tamil",
    "TT":"Tatar",
    "TE":"Telugu",
    "TH":"Thai",
    "BO":"Tibetan",
    "TO":"Tonga",
    "TR":"Turkish",
    "UK":"Ukranian",
    "UR":"Urdu",
    "UZ":"Uzbek",
    "VI":"Vietnamese",
    "CY":"Welsh",
    "XH":"Xhosa"
}

for (var lang in languages) {
  languageOptions.push(<MenuItem value={lang} key={languages[lang]} primaryText={`Item ${languages[lang]}`} />);
}

class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      request: '',
      language: 10,
      points: '',
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
      }
    });
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  addRequest() {
    // let ok = true;
    // // Check values
    // if (this.state.name.length > 100) {
    //   ok = false;
    //   this.setState({ toastMessage: 'Dude why is your name so long? Save not successful.' });
    //   this.setState({ toastOpen: true });
    // }
    //
    // // Perform save
    // if (ok) {
    //   const profileRef = firebase.database().ref(`users/${this.state.user.uid}/profile`);
    //   profileRef.set({
    //     name: this.state.name,
    //     description: this.state.description,
    //     image: this.state.image,
    //   }).then(() => {
    //     this.setState({ toastMessage: 'Saved!' });
    //
    //     // Upload file if one was uploaded
    //     if (this.state.file) {
    //       const storageRef = firebase.storage().ref('/user-dps/');
    //
    //       const dpRef = storageRef.child(`${this.state.user.uid}.jpg`);
    //       dpRef.put(this.state.file).then(() => {
    //         this.setState({ toastOpen: true });
    //       });
    //     } else {
    //       this.setState({ toastOpen: true });
    //     }
    //   });
    // }
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
            persons name and profile
          </Row>
          <Row>
            <TextField
              hintText="What is your request?"
              multiLine
              value={this.state.description}
              style={{fontSize: 25}}
              className="new-request-input"
              fullWidth
              onChange={(e, val) => { this.setState({ description: val }); }}
            />
          </Row>
          <Row>
          <SelectField
            value={this.state.language}
            onChange={this.handleLangChang}
            maxHeight={200}
          >
            {languageOptions}
          </SelectField>
          </Row>
          <RaisedButton
            label="REQUEST"
            disabled={this.state.name === ''}
            onClick={() => this.addRequest()}
          />
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
