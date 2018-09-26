import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import FormControl from 'react-bootstrap/lib/FormControl';
import './FormExample.css'
import Example from './CardModal';

class FormExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showCards: false }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const url = e.target.elements.urlInput.value //use the name attribute that you use on the form input to get what you need
    // console.log(url);
    this.setState({showCards: true})
  }

  
  render() {
    const timsExample = {
      recommendation: 0,
      sentence: [
        {
          text: 'Sea',
          parent: 1,
        },
        {
          text: 'otters',
          parent: 'root',
        },
        {
          text: 'are',
        },
        {
          text: 'fuzzy',
          parent: 4,
        },
        {
          text: 'little',
          parent: 5,
        },
        {
          text: 'beasts',
          parent: 'root',
        },
        {
          text: '.',
        },
      ]
    }
    
    return (
      <Grid> 
        <div className="form-group purple-border">
          <Row className="show-grid">
            <Col lg={6}>
              <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="formInlineUrl">
                <ControlLabel>Enter a URL:</ControlLabel>{' '}
                  <FormControl name="urlInput" type="Url" placeholder="http://" />
                  {' '}
                  <Button className="submit-button" type="submit">Submit </Button>
                </FormGroup>
              </Form>
            <br />

            <h4>...or simply paste your text below:</h4>
              <label htmlFor="exampleFormControlTextarea4"> </label>
              <textarea className="form-control" id="exampleFormControlTextarea4" rows="9"></textarea>
            </Col>

            <Col lg={6}>

              { this.state.showCards ? <Example sentence={timsExample.sentence} /> : null }

            </Col>
          </Row>

        </div>
      </Grid>
    );
  }

}

export default FormExample

//on submit event on the form tag
//call a function handle submit


//1. create a constructor, set the state (default state, by default don't show anything - showcads false)
//2. extracted the cards html into its own function
//3. depending on the showcards state, we either showed the cards or not in the return 
//4. on submit, change the state to show cards