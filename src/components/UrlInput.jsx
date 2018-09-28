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
    this.state = { showCards: false, sentences: [], currentSentence: 0 };
    this.incrementCurrentSentence = this.incrementCurrentSentence.bind(this);
    this.decrementCurrentSentence = this.decrementCurrentSentence.bind(this);
  }

  componentDidMount() {
    this.setState({
      sentences: [
        {
          chefsRecommendation: 0,
          sentence: [
            {
              text: "Sea",
              parent: 1
            },
            {
              text: "otters",
              parent: "root"
            },
            {
              text: "are"
            },
            {
              text: "fuzzy",
              parent: 4
            },
            {
              text: "little",
              parent: 5
            },
            {
              text: "beasts",
              parent: "root"
            },
            {
              text: "."
            }
          ]
        },
        {
          chefsRecommendation: 0,
          sentence: [
            {
              text: "potato",
              parent: 1
            },
            {
              text: "tomato",
              parent: "root"
            },
            {
              text: "are"
            },
            {
              text: "fuzzy",
              parent: 4
            },
            {
              text: "little",
              parent: 5
            },
            {
              text: "beasts",
              parent: "root"
            },
            {
              text: "."
            }
          ]
        }
      ]
    });
  }

  incrementCurrentSentence() {
    this.setState({
      currentSentence:
        (this.state.currentSentence + 1) % this.state.sentences.length
    });
  }

  decrementCurrentSentence() {
    this.setState({
      currentSentence:
        this.state.currentSentence == 0
          ? this.state.sentences.length - 1
          : this.state.currentSentence - 1
    });
  }

  makeProtoStack = (event) => {
    let protoStack = {
      query: event.target.elements.wikiQuery.value ? event.target.elements.wikiQuery.value : null,
      text: event.target.elements.textBox.value ? event.target.elements.textBox.value : null,
      type: event.target.elements.wikiQuery.value ? 'wiki' : event.target.elements.textBox.value ? 'text' : null
    }
    return protoStack
  }

  // unused, but functional method for sending new stacks
  handleSave = e => {
    e.preventDefault()
    const pkg = { 
      userId: 2,
      newStack: {
        title: "Sea Otters",
        owner: { "_id" : 2},
        tags: [],
        cards: [ 
          {
            "chefsReccomendation": 0,
            setence: [ 
              {
                token: 'Sea',
                parent: 1,
              },
              {
                token: 'otters',
                parent: 'root',
              },
              {
                token: 'are',
              },
              {
                token: 'fuzzy',
                parent: 4,
              },
              {
                token: 'little',
                parent: 5,
              },
              {
                token: 'beasts',
                parent: 'root',
              },
              {
                token: '.',
              },
    
            ]
          }
        ]
      }
    }
    console.log(pkg)
    axios.post('http://localhost:8080/stacks', pkg)
    .then(response => console.log(response))
    .catch(error => console.log(error))
    this.setState({ showCards: true })
  }

  handleSubmit = e => {
    e.preventDefault()
    let newProtoStack = this.makeProtoStack(e)
    console.log(newProtoStack)
    axios.post('http://localhost:8080/proto', newProtoStack)
    .then(response => console.log(response))
    .catch(error => console.log(error))
    this.setState({ showCards: true })
  }

  render() {
    return (
      <Grid>
        <div className="form-group purple-border">
          <Row className="show-grid">
            <Col lg={6}>
              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="formInlineUrl">
                  <ControlLabel>Enter a topic:</ControlLabel>{" "}
                  <FormControl
                    name="wikiQuery"
                    placeholder="Teach me about..."
                  />{" "}
                  <Button className="btn btn-primary" type="submit">
                    Submit{" "}
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
            </Col>

            <Col lg={6}>
              {this.state.showCards ? (
                <Example
                  sentence={
                    this.state.sentences[this.state.currentSentence].sentence
                  }
                  selectedNode={
                    this.state.sentences.length
                      ? this.state.sentences[this.state.currentSentence]
                          .chefsRecommendation
                      : null
                  }
                  incrementCurrentSentence={this.incrementCurrentSentence}
                  decrementCurrentSentence={this.decrementCurrentSentence}
                  currentIndex={this.state.currentSentence}
                  sentences={this.state.sentences}
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
