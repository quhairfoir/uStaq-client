import React, { Component } from 'react';

import Grid from "react-bootstrap/lib/Grid";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import FormControl from "react-bootstrap/lib/FormControl";
import '../styles/Edit.css'

class Create extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this)
    this.makeProtoStack = this.makeProtoStack.bind(this)
  }

  makeProtoStack (e) {
    let protoStack = {
      title: e.target.elements.title.value ? e.target.elements.title.value : null,
      query: e.target.elements.wikiQuery.value ? e.target.elements.wikiQuery.value : null,
      text: e.target.elements.textBox.value ? e.target.elements.textBox.value : null,
      type: e.target.elements.wikiQuery.value ? 'wiki' : e.target.elements.textBox.value ? 'text' : null
    }
    return protoStack
  }

  onSubmit (e) {
    e.preventDefault()
    let protoStack = this.makeProtoStack(e)
    // console.log(protoStack)
    this.props.handleSubmitStack(protoStack)
  }

  render() {
    return (
      <div>
        <Form
          inline
          onSubmit={this.onSubmit}
          style={{
            width: '255px',
          }}>
          <FormGroup controlId="formInlineUrl" className="create-form">
            <ControlLabel className="add-title">
              Add a title for your stack<span style={{ color: 'red'}}>&#42;</span>:
            </ControlLabel>{" "}
              <FormControl
                style={{
                  width: '250px',
                  backgroundColor: '#ECF6FE'
                }}
                className="add-title"
                name="title"
                placeholder="Title"
              />{" "}
              <br /><br />
            <ControlLabel className="add-title">Search topic in Wikipedia:</ControlLabel>{" "}
            <FormControl
              style={{
                width: '250px',
                backgroundColor: '#ECF6FE'
              }}
              className="add-title"
              name="wikiQuery"
              placeholder="Teach me about..."
            />{" "}
            <Button className="btn btn-primary create-form-btn text-center" type="submit">
              Create Cards!
            </Button>
          </FormGroup>
          <span style={{ fontFamily: 'Comic sans MS', fontSize: '2em' }}>OR</span>
          <br /><br />
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel className="add-title">
              Generate cue cards from plain text:
            </ControlLabel>
            <FormGroup>
            <FormControl
              style={{
                width: '250px',
                minHeight: '250px',
                resize: "vertical",
                backgroundColor: '#ECF6FE'
              }}
              componentClass="textarea"
              name="textBox"
              placeholder="Paste text here..."
              />
              <Button className="btn btn-primary create-form-btn text-center" type="submit">
                Create Cards!
              </Button>
            </FormGroup>

          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Create;

//on submit event on the form tag
//call a function handle submit

//1. create a constructor, set the state (default state, by default don't show anything - showcads false)
//2. extracted the cards html into its own function
//3. depending on the showcards state, we either showed the cards or not in the return
//4. on submit, change the state to show cards
