import React from 'react'
import {Row, Button, Grid, FormGroup, FormControl, ControlLabel, PageHeader, Well, Panel} from 'react-bootstrap'
// import {Route, Switch, Link} from 'react-router-dom'
import io from "socket.io-client"

import '../styles/QuizRoom.css';
import getEditDistance from '../utilities/levenshtein';

let messages = [ { username: 'Dia', message: 'Sea Otters!' }, { username: 'Morag', message: 'Damn, I was going to guess that...' } ];

class QuizRoom extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        numSocketClients: 0,
        username: '',
        message: '',
        messages,
        question: 'Coffee comes from [blank].',
        answer: 'Ethiopia'
    }

    this.socket = null;

    // this.socket = io('localhost:3001')
    // this.socket.on('RECEIVE_MESSAGE', function(data){
    //   addMessage(data);
    // })
  
    // const addMessage = data => {
    //     console.log(data);
    //     this.setState({messages: [...this.state.messages, data]})
    //     console.log(this.state.messages);
    // }
  }

  componentDidMount() {
    let username = this.props.userObj ? this.props.userObj.alias : this.generateName();
    this.scrollToBottom();
    this.setUpServerConnection();
    
    this.setState({username})
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
      let newMessage = JSON.parse(evt.data).data;
      const messages = [...this.state.messages, newMessage];
      this.setState({ numSocketClients: JSON.parse(evt.data).numSocketClients });
      this.setState({ messages });
    }
  }

  generateName() {
    const ANONYMOUS_NAMES = [
      'Friendly stranger',
      'A voice in the crowd',
      'Some person',
      'ROBOT',
      'Anonymous',
    ]
    return ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)];
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  checkMessageForAnswer() {
    const dist = getEditDistance(this.state.message, this.state.answer);
    if (dist === 0) {
      this.sendSystemMessage('Yeah!');
    } else if (dist === 1) {
      this.sendSystemMessage('Close! ;)');
    }
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
    this.checkMessageForAnswer();
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
              <h2>{this.state.question}</h2>
            </Panel.Heading>
            <Panel.Body id="messageBox">
              <div className="messages">
                {this.state.messages.map(message => {
                  return (
                    <div ref={el => { this.el = el; }}><strong>{message.username}</strong>: {message.message}</div>
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