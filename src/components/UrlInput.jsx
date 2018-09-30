import React from "react";
import Grid from "react-bootstrap/lib/Grid";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import FormControl from "react-bootstrap/lib/FormControl";
import "./FormExample.css";
import Example from "./CardModal";
import axios from 'axios';

class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCards: false,
      sentences: [],
      currentSentence: 0,
      indicesToHide: []
    };
    this.incrementCurrentSentence = this.incrementCurrentSentence.bind(this);
    this.decrementCurrentSentence = this.decrementCurrentSentence.bind(this);
    this.determineIndicesToHide = this.determineIndicesToHide.bind(this);
    this.handleWordClick = this.handleWordClick.bind(this);
  }

  componentDidMount() {

      axios.get('http://localhost:8080/stacks',  )
        .then(response => console.log(response))
        .catch(error => console.log(error))

    for (let sentence of sentences) {
      sentence.selectedToken = sentence.chefsRecommendation;
    }
    this.setState({ sentences }, () => {
      this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken)
    })
  }

  incrementCurrentSentence() {
    this.setState({
      currentSentence:
        (this.state.currentSentence + 1) % this.state.sentences.length,
    }, () => {
      this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken);
    });
  }

  decrementCurrentSentence() {
    this.setState({
      currentSentence:
        this.state.currentSentence == 0
          ? this.state.sentences.length - 1
          : this.state.currentSentence - 1,
    }, () => {
      this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken);
    });
  }

  // MOVE TO NEW FILE
  makeProtoStack = (e) => {
    let info = {
      query: e.target.elements.wikiQuery.value ? e.target.elements.wikiQuery.value : null,
      text: e.target.elements.textBox.value ? e.target.elements.textBox.value : null,
      type: e.target.elements.wikiQuery.value ? 'wiki' : e.target.elements.textBox.value ? 'text' : null
    }
    return  {
      userId: 1, // TODO: change from hardcoded
      info
    }
  }

  // STAYS, but must be re-written based on new page
  handleStackSave = e => {
    e.preventDefault()
    if (this.state.sentences == false) {
      throw "ERROR -- trying to save empty stack"
    }
    // TODO
    axios.post('http://localhost:8080/stacks', ITEM_HERE )
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  // MOVE TO NEW FILE
  
  
  determineIndicesToHide(startIndex) {
    let indicesToHide = [];

    let sentence = this.state.sentences[this.state.currentSentence];
    if ('hoverable' in sentence.tokens[startIndex]) {
      indicesToHide = this.buildHideSubTree(startIndex)
    }

    this.setState({
      indicesToHide,
    })
  }

  buildHideSubTree(index) {  //builds the list of indexes to hide -- returns the indices to hide (gets all the indixies - starts at the starting index - wtv the word is, and looks at all of its children and for each one of the children it calls the function on the child to find that childs children - get its children and for each children get their children - propagates the result back up)
    let result = [index]; //the first word is many, index 0, result is an array with only 0 in it, then add the children of methods into the array and keep doing this, for each one of methods children you keep doing this
    //many has one child, method has no child
    let sentence = this.state.sentences[this.state.currentSentence];
    for (let child of sentence.tokens[index].hoverInfo.children) {
      result = result.concat(this.buildHideSubTree(child));                //recursive tree: child is equal to 1 - result, concatenate to the result the result of calling that function to that child
    }
    return result;
  }

  handleWordClick = index => {
    this.state.sentences[this.state.currentSentence].selectedToken = index;
  };

  render() {
    
    return (
      <Grid>
        <div className="form-group purple-border">
          <Row className="show-grid">
            <Col lg={6}>
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
            </Col>

            <Col lg={6}>
              {this.state.showCards ? (
                <Example
                  incrementCurrentSentence={this.incrementCurrentSentence}
                  decrementCurrentSentence={this.decrementCurrentSentence}
                  sentences={this.state.sentences}
                  currentIndex={this.state.currentSentence}
                  indicesToHide={this.state.indicesToHide}
                  handleUpperMouseOver={this.determineIndicesToHide}
                  handleUpperMouseOut={this.determineIndicesToHide}
                  handleUpperClick={this.handleWordClick}
                />
              ) : null}
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}

export default FormExample;

//on submit event on the form tag
//call a function handle submit

//1. create a constructor, set the state (default state, by default don't show anything - showcads false)
//2. extracted the cards html into its own function
//3. depending on the showcards state, we either showed the cards or not in the return
//4. on submit, change the state to show cards
