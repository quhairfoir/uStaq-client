import React from 'react'
import {Row, Button, Grid, FormGroup, FormControl, ControlLabel, PageHeader, Well, Panel} from 'react-bootstrap'
// import {Route, Switch, Link} from 'react-router-dom'
import io from "socket.io-client"


let messages = [ { username: 'Dia', message: 'Sea Otters!' }, { username: 'Morag', message: 'Damn, I was going to guess that...' }]

class QuizRoom extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        username: 'Morag',
        message: '',
        messages
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
  }

  render() {
    return (
      <Grid>
        <Row>
          <PageHeader id="smallerHeader">
            <small>The (mostly) educational trivia game</small>
          </PageHeader>
        </Row>
        <Row>
          <Panel>
            <Panel.Heading>
              <h2>Q: _________ are small fuzzy creatures.</h2>
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
                <FormGroup controlId="formControlsTextarea" className="quizTextArea">
                  <ControlLabel>Your answer...?</ControlLabel>
                  <FormControl componentClass="textarea" placeholder="..." value={this.state.message} onChange={this.onChange}/>
                </FormGroup>
                <Button type="submit" onClick={this.sendMessage} bsStyle="primary">Send</Button>
              </form>
            </Panel.Footer>
          </Panel>
        </Row>
      </Grid>
    )
  }
}

export default QuizRoom