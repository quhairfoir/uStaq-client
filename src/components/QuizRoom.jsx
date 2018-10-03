import React from 'react'
import {Row, Button, Grid, FormGroup, FormControl, ControlLabel, PageHeader, Well, Panel} from 'react-bootstrap'
// import {Route, Switch, Link} from 'react-router-dom'

// // Use Damerau-Levenshtein edit distance to detect almost-answers (look for character substitution, deletion, addition, transposition)
// import getEditDistance from 'damerau-levenshtein';

import '../styles/QuizRoom.css';

class QuizRoom extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      numSocketClients: 0,
      username: '',
      message: '',
      messages: [],
      question: '',
      answer: '',
      indicesToReveal: [],
    }

    this.socket = null;
  }

  componentDidMount() {
    let username = this.props.userObj ? this.props.userObj.alias : this.generateName();
    this.scrollToBottom();
    this.setUpServerConnection();
    
    this.setState({ username })
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  setUpServerConnection() {
    const serverUrl = 'ws://' + window.location.hostname + ':3001';
    this.socket = new WebSocket(serverUrl);
    
    this.socket.onopen = evt => {
      this.sendMessage('Attempting to connect.', 'protocol');
      console.log('Connected to server.');
    }

    this.socket.onmessage = evt => {
      let packet = JSON.parse(evt.data)
      let newMessage = packet.data;
      if (packet.type === 'message' || packet.display) {
        const messages = [...this.state.messages, newMessage];
        this.setState({ numSocketClients: JSON.parse(evt.data).numSocketClients });
        this.setState({ messages });
      } else {
        if (newMessage.message.state === 'topic') {
          // ...
        } else if (newMessage.message.state === 'question') {
          this.setState({ question: newMessage.message.field });
        } else if (newMessage.message.state === 'indicesToReveal') {
          this.setState({ indicesToReveal: newMessage.message.field || [] });
        }
      }
    }
  }

  createQuestionHeading() {
    return this.state.question.split(' ').map((word, index) =>
      <span key={index} className={this.state.indicesToReveal.includes(index) ? 'revealed' : ''}>
        {word}{' '}
      </span>)
  }

  generateName() {
    const ANONYMOUS_NAMES = [
      'Friendly stranger',
      'A voice in the crowd',
      'Some person',
      'Anonymous',
    ]
    return ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)];
  }

  scrollToBottom() {
    if (this.el === undefined) { return; }
    
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  handleClick = (event) => {
    event.preventDefault();
    if (!this.state.message) { return; }
    this.setState({ message: '' });

    
    const msg = {
      username: this.state.username,
      message: this.state.message,
    };
    this.sendMessage(msg);
    // this.checkMessageForAnswer();
  }

  sendMessage(msg, type = 'message') {
    const packet = {
      data: msg,
      type,
    };
    this.socket.send(JSON.stringify(packet));
  }

  sendSystemMessage(msg) {
    const packet = {
      data: msg,
      type: 'system'
    };
    this.socket.send(JSON.stringify(packet));
  }

  onChange = (event) => {
   this.setState({message: event.target.value})
  }

  render() {
    return (
      <Grid>
        <Row>
          <Panel>
            <Panel.Heading>
              <h2>{this.createQuestionHeading()}</h2>
            </Panel.Heading>
            <Panel.Body id="messageBox">
              <div className="messages">
                {this.state.messages.map(message => {
                  return (
                    <div ref={el => { this.el = el; }}><strong>{message.username}</strong>: <span style={{color:message.colour}}>{message.message}</span></div>
                  )
                })}
              </div>
            </Panel.Body>
            <Panel.Footer>
              <form>
                <FormGroup bsSize="large" className="quizTextArea">
                  <FormControl type="text" placeholder="" value={this.state.message} onChange={this.onChange} style={{'margin-right': '5px'}}/>
                  <Button type="submit" onClick={this.handleClick} bsStyle="primary">Send</Button>
                </FormGroup>
              </form>
            </Panel.Footer>
          </Panel>
        </Row>
      </Grid>
    )
  }
}

export default QuizRoom