import React from "react";
import Grid from "react-bootstrap/lib/Grid";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import FormControl from "react-bootstrap/lib/FormControl";
// import "./Create.css";
import axios from 'axios';

class Create extends React.Component {
  constructor(props) {
    super(props);
  }

  makeProtoStack = e => {
    let protoStack = {
      query: e.target.elements.wikiQuery.value ? e.target.elements.wikiQuery.value : null,
      text: e.target.elements.textBox.value ? e.target.elements.textBox.value : null,
      type: e.target.elements.wikiQuery.value ? 'wiki' : e.target.elements.textBox.value ? 'text' : null
    }
    return protoStack
  }

  handleStackSave = e => {
    e.preventDefault()
    if (this.state.sentences == false) {
      throw "ERROR -- trying to save empty stack"
    }
    const pkg = {
      userId: 1,
      newStack: this.state.sentences
    }
    console.log(pkg)
    axios.post('http://localhost:8080/stacks', pkg)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    this.setState({ showCards: true })
  }

  handleSubmitQuery = e => {
    e.preventDefault()
    let newProtoStack = this.makeProtoStack(e)
    if (newProtoStack.query === null && newProtoStack.text === null) {
      throw "ERROR -- cannot send empty request to server"
    }
    console.log('This is newProtoStack in handleSubmitQuery:', newProtoStack)
    axios.post('http://localhost:8080/proto', newProtoStack)
      .then(response => {
        this.handleReceiveProto(response.data)
      })
      .catch(error => console.log(error))
    this.setState({ showCards: true })
  }

  handleReceiveProto = sentences => {
    for (let sentence of sentences) {
      sentence.selectedToken = sentence.chefsRecommendation;
    }
    this.setState({ sentences }, () => {
      this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken)
    })
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmitQuery}>
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

        <Button className="btn btn-primary" id="create4realz" onClick={this.handleStackSave}>
          Stack Me!{" "}
        </Button>
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
