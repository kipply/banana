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

class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      request: '',
      language: "EN",
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
          <MenuItem value={"AF"} primaryText="Afrikanns" /> <MenuItem value={"SQ"} primaryText="Albanian" /> <MenuItem value={"AR"} primaryText="Arabic" /> <MenuItem value={"HY"} primaryText="Armenian" /> <MenuItem value={"EU"} primaryText="Basque" /> <MenuItem value={"BN"} primaryText="Bengali" /> <MenuItem value={"BG"} primaryText="Bulgarian" /> <MenuItem value={"CA"} primaryText="Catalan" /> <MenuItem value={"KM"} primaryText="Cambodian" /> <MenuItem value={"ZH"} primaryText="Chinese (Mandarin)" /> <MenuItem value={"HR"} primaryText="Croation" /> <MenuItem value={"CS"} primaryText="Czech" /> <MenuItem value={"DA"} primaryText="Danish" /> <MenuItem value={"NL"} primaryText="Dutch" /> <MenuItem value={"EN"} primaryText="English" /> <MenuItem value={"ET"} primaryText="Estonian" /> <MenuItem value={"FJ"} primaryText="Fiji" /> <MenuItem value={"FI"} primaryText="Finnish" /> <MenuItem value={"FR"} primaryText="French" /> <MenuItem value={"KA"} primaryText="Georgian" /> <MenuItem value={"DE"} primaryText="German" /> <MenuItem value={"EL"} primaryText="Greek" /> <MenuItem value={"GU"} primaryText="Gujarati" /> <MenuItem value={"HE"} primaryText="Hebrew" /> <MenuItem value={"HI"} primaryText="Hindi" /> <MenuItem value={"HU"} primaryText="Hungarian" /> <MenuItem value={"IS"} primaryText="Icelandic" /> <MenuItem value={"ID"} primaryText="Indonesian" /> <MenuItem value={"GA"} primaryText="Irish" /> <MenuItem value={"IT"} primaryText="Italian" /> <MenuItem value={"JA"} primaryText="Japanese" /> <MenuItem value={"JW"} primaryText="Javanese" /> <MenuItem value={"KO"} primaryText="Korean" /> <MenuItem value={"LA"} primaryText="Latin" /> <MenuItem value={"LV"} primaryText="Latvian" /> <MenuItem value={"LT"} primaryText="Lithuanian" /> <MenuItem value={"MK"} primaryText="Macedonian" /> <MenuItem value={"MS"} primaryText="Malay" /> <MenuItem value={"ML"} primaryText="Malayalam" /> <MenuItem value={"MT"} primaryText="Maltese" /> <MenuItem value={"MI"} primaryText="Maori" /> <MenuItem value={"MR"} primaryText="Marathi" /> <MenuItem value={"MN"} primaryText="Mongolian" /> <MenuItem value={"NE"} primaryText="Nepali" /> <MenuItem value={"NO"} primaryText="Norwegian" /> <MenuItem value={"FA"} primaryText="Persian" /> <MenuItem value={"PL"} primaryText="Polish" /> <MenuItem value={"PT"} primaryText="Portuguese" /> <MenuItem value={"PA"} primaryText="Punjabi" /> <MenuItem value={"QU"} primaryText="Quechua" /> <MenuItem value={"RO"} primaryText="Romanian" /> <MenuItem value={"RU"} primaryText="Russian" /> <MenuItem value={"SM"} primaryText="Samoan" /> <MenuItem value={"SR"} primaryText="Serbian" /> <MenuItem value={"SK"} primaryText="Slovak" /> <MenuItem value={"SL"} primaryText="Slovenian" /> <MenuItem value={"ES"} primaryText="Spanish" /> <MenuItem value={"SW"} primaryText="Swahili" /> <MenuItem value={"SV"} primaryText="Swedish " /> <MenuItem value={"TA"} primaryText="Tamil" /> <MenuItem value={"TT"} primaryText="Tatar" /> <MenuItem value={"TE"} primaryText="Telugu" /> <MenuItem value={"TH"} primaryText="Thai" /> <MenuItem value={"BO"} primaryText="Tibetan" /> <MenuItem value={"TO"} primaryText="Tonga" /> <MenuItem value={"TR"} primaryText="Turkish" /> <MenuItem value={"UK"} primaryText="Ukranian" /> <MenuItem value={"UR"} primaryText="Urdu" /> <MenuItem value={"UZ"} primaryText="Uzbek" /> <MenuItem value={"VI"} primaryText="Vietnamese" /> <MenuItem value={"CY"} primaryText="Welsh" /> <MenuItem value={"XH"} primaryText="Xhosa" />

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
