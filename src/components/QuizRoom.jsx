import React from 'react'
import {Row, Button, Grid, FormGroup, FormControl, ControlLabel, PageHeader, Well, Panel} from 'react-bootstrap'
// import {Route, Switch, Link} from 'react-router-dom'
import io from "socket.io-client"

import './QuizRoom.css';

let messages = [ { username: 'Dia', message: 'Sea Otters!' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }]

class QuizRoom extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        username: '',
        message: '',
        messages,
        question: 'Coffee comes from [blank].',
        answer: 'Ethiopia'
    }
    this.socket = io('localhost:3001')
    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    })
  
    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]})
        console.log(this.state.messages);
    }
  }

  componentDidMount() {
    //ask do you have this.props.userObj?
    // console.log("this is PROPS", this.props)
    let username = this.props.userObj ? this.props.userObj.alias : ''
    this.setState({username})
  }

  checkMessageForAnswer() {
    if (this.state.answer === this.state.message) {
      console.log("this is GOOOOOOD!")
    }
  }

  sendMessage = (event) => {
    event.preventDefault()
    this.socket.emit('SEND_MESSAGE', {
      username: this.state.username,
      message: this.state.message
    });
    this.setState({message: ''});
  }

  onChange = (event) => {
   this.setState({message: event.target.value})
  //  this.checkMessageForAnswer();
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
                    <div><strong>{message.username}</strong>: {message.message}</div>
                  )
                })}
              </div>
            </Panel.Body>
            <Panel.Footer>
              <form>
                <FormGroup bsSize="large" className="quizTextArea">
                  {/* <ControlLabel>Your answer...?</ControlLabel> */}
                  <FormControl type="text" placeholder="" value={this.state.message} onChange={this.onChange}/>
                </FormGroup>
                <Button type="submit" onClick={this.sendMessage} onSubmit={this.checkMessageForAnswer} bsStyle="primary">Send</Button>
              </form>
            </Panel.Footer>
          </Panel>
        </Row>
      </Grid>
    )
  }
}

export default QuizRoom