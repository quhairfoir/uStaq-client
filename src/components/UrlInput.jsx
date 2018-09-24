import React from 'react';
import { FormGroup, Form, Col, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class FormExample extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const url = e.target.elements.urlInput.value //use the name attribute that you use on the form input to get what you need
    console.log(url);
  
  }

  render() {
    return (
          <Form horizontal onSubmit={this.handleSubmit}>
      <FormGroup controlId="formHorizontalUrl">
        <Col componentClass={ControlLabel} sm={2}>
          Url
        </Col>
        <Col sm={10}>
          <FormControl name="urlInput" type="Url" placeholder="Url" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">Submit</Button>
        </Col>
      </FormGroup>
    </Form>
    );
  }
}

export default FormExample

//on submit event on the form tag
//call a function handle submit