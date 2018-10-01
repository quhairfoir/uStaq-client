import React, { Component } from 'react';

import Grid from "react-bootstrap/lib/Grid";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import FormControl from "react-bootstrap/lib/FormControl";

class Create extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this)
    this.makeProtoStack = this.makeProtoStack.bind(this)
  }

  makeProtoStack (e) {
    let protoStack = {
      query: e.target.elements.wikiQuery.value ? e.target.elements.wikiQuery.value : null,
      text: e.target.elements.textBox.value ? e.target.elements.textBox.value : null,
      type: e.target.elements.wikiQuery.value ? 'wiki' : e.target.elements.textBox.value ? 'text' : null
    }
    return protoStack
  }

  onSubmit (e) {
    e.preventDefault()
    let protoStack = this.makeProtoStack(e)
    console.log(protoStack)
    this.props.handleSubmitStack(protoStack)
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={this.onSubmit}>
          <FormGroup controlId="formInlineUrl">
            <ControlLabel>Enter a topic:</ControlLabel>{" "}
            <FormControl
              name="wikiQuery"
              placeholder="Teach me about..."
            />{" "}
            <Button className="btn btn-primary" type="submit">
              Create Cards!{" "}
            </Button>
          </FormGroup>
          <br />
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Or paste your text here:</ControlLabel>
            <br />
            <FormControl
              componentClass="textarea"
              name="textBox"
              placeholder="Teach me about..."
              rows="9" />
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
