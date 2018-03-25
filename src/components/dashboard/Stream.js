import React, { Component } from 'react';
import Async from 'react-promise'

import * as firebase from 'firebase';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import ChevronDown from 'react-icons/lib/fa/chevron-down';

import { Grid, Col, Row } from 'react-styled-flexboxgrid';

class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: firebase.auth().currentUser,
      answer: '',
      requests: [],
      open: false,
      answersOpen: false,
    };
  }

  componentWillMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
      } else {
        this.setState({ user });
      }
    });

    const requestsRef = firebase.database().ref(`requests/`);
    requestsRef.once('value', (snapshot) => {
      var loadedRequests = [];
      const requests = snapshot.val();
      if (!requests) {
        return;
      }
      Object.keys(requests).forEach(lang => {
        var items = requests[lang];
        Object.keys(items).forEach(key => {
          var req = items[key];
          const reqRef = firebase.database().ref(`requests/${lang}/${key}`);
          req['ref'] = reqRef;
          req['lang'] = lang;
          loadedRequests.push(req);
        });
      });
      this.setState({requests: loadedRequests})
    });
  }

  componentWillUnmount() {
    this.authListener = undefined;
  }

  answerQuestion = (ref, d) => {
    this.setState({open: true, answerRef: ref, answerDiff: d});
  }

    handleClose = () => {
      this.setState({open: false});
    };


      handleAnswersClose = () => {
        this.setState({answersOpen: false});
      };

  submitAnswer = () => {
    firebase.database().ref('users').child(`${this.state.user.uid}`).once('value', (snapshot) => {
      var oldPoints = snapshot.val().points;
      firebase.database().ref('users').child(`${this.state.user.uid}`).update({
        points: oldPoints + this.state.answerDiff * 10
      });
    });
    this.state.answerRef.child("answers").push({
      answer: this.state.answer,
      user: this.state.user.uid,
    });
    this.handleClose();
  }

  showAnswers = (ans) => {
    var content = [];
    if (!ans){
      return;
    }
    var matthew = [];
    Object.keys(ans).forEach(item => {
        console.log(ans[item]);
          const imageSrc = firebase.storage().ref('user-dps').child(`${ans[item].user}.jpg`).getDownloadURL();
          var name = firebase.database().ref('users').child(`${ans[item].user}/profile/name`).once('value', (snapshot) => { return name = snapshot.val()}).then();
          var t = (<div><Row>
                 <div className="pprofile-pic-container">
                   <div className="pprofile-image-container">
                     <Async promise={imageSrc} then={(val) => <img  className="profile-image" src={val}/>} />
                   </div>
                 </div>
                 <Async promise={name} then={(val) => <div className="vertical-center">{name}</div>} />
               </Row>
               <Row>
                <Col xs={10}>
                  <span>{ans[item].answer}</span>
                 </Col>
              </Row></div>)

              matthew.push(t);
        })
    this.setState({answersOpen: true, answerAnswers: matthew});
  }

  render() {
    const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleClose}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      onClick={this.submitAnswer}
    />,
  ];
    return (
      <div>
      <StreamList requests={this.state.requests} answerQuestion={this.answerQuestion} showAnswers={this.showAnswers}/>
      <Dialog
         title="Answer Question"
         actions={actions}
         modal={false}
         open={this.state.open}
         onRequestClose={this.handleClose}
       >
         <TextField
           hintText="Input your answer?"
           multiLine
           value={this.state.answer}
           className="new-request-input"
           fullWidth
           onChange={(e, val) => { this.setState({ answer: val }); }}
         />
       </Dialog>
       <Dialog
          title="Question Answers"
          actions={<FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleAnswersClose}
          />}
          modal={false}
          open={this.state.answersOpen}
          onRequestClose={this.handleAnswersClose}
        >
          {this.state.answerAnswers}
        </Dialog>
       </div>
    );
  }
}


function StreamList(props) {

  const requests = props.requests;
  const res = props.requests.map(function(data, idx) {
    const imageSrc = firebase.storage().ref('user-dps').child(`${data.user}.jpg`).getDownloadURL();
    var name = firebase.database().ref('users').child(`${data.user}/profile/name`).once('value', (snapshot) => { return name = snapshot.val()}).then();
     return (
       <div className="new-request">

       <Paper className="new-request-container" zDepth={1}>
         <Row>
           <div className="pprofile-pic-container">
             <div className="pprofile-image-container">
               <Async promise={imageSrc} then={(val) => <img  className="profile-image" src={val}/>} />
             </div>
           </div>
           <Async promise={name} then={(val) => <div className="vertical-center">{name}</div>} />
         </Row>
         <Row>
         </Row>
         <Row>
          <Col xs={10}>
            <span style={{fontSize:15, color: 'grey'}}>{data.difficulty * 10} points | {data.lang}</span><br/>
             <span style={{fontSize:20}}>{data.request}</span>
           </Col>
           <Col style={{align: 'right'}}>
           <RaisedButton
             label="ANSWER"
             onClick={() => props.answerQuestion(data.ref, data.difficulty)}
           />
           </Col>
         </Row>
         <FlatButton
           label="Show Answers"
           onClick={() => props.showAnswers(data.answers)}
         />
       </Paper>
       </div>
     );
  });
  return (
    <ul>{res}</ul>
  );
}


export default Stream;
