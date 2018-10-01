import React, { Component } from 'react'
import { Row, Col, PageHeader, Table, Grid, Clearfix, Modal, Dialog, Body, Button, ButtonGroup } from 'react-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

// Stack details modal dialog
import Card from './Card'

// Client-side model
import Resource from '../models/resource'
const StackStore = Resource('stacks')
// const db = require('mongodb');


class Stacks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stacks: this.props.stacks,
      input: '',
    }
    this.filterStacksHandle = this.filterStacksHandle.bind(this);
    this.deleteStackHandle = this.deleteStackHandle.bind(this);
  }

  // deleteStackHandle(stack, index) {
  //   if(window.confirm("Are you sure you want to delete this stack?")){
  //     let stacks = [...this.state.stacks]
  //     stacks.splice(index, 1);
  //     this.setState({ stacks })
  //  }
  // }

  deleteStackHandle(id) {
    if(window.confirm("Are you sure you want to delete this stack?")){
      return axios.get(`http://localhost:8080/stacks/delete/${id}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    };
  };

  filterStacksHandle() {
    let input = document.getElementById('filterStacks');
    let filter = input.value.toUpperCase();
    let ul = document.getElementById('myUL');
    let li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
      let a = li[i].getElementsByTagName('a')[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }

  handleEdit = (event) => {
    let stackId = event.target.getAttribute("data-id")
    this.props.toggleEdit(stackId)
  }

  stacksData() {
    if (this.props.stacks) {
      return (
          this.props.stacks.map((stack, _id) => (
            <li key={_id} style={{ listStyleType: 'none' }}>
              <tr className='tile' data-toggle='modal' data-target='#exampleModal'>
                <Col sm={6} md={3} className='eachTile eachTile:hover'>
                  <Row>
                    <ButtonGroup className="edit-delete-btn-group" bsSize="xsmall">
                      <Button onClick={this.handleEdit} bsStyle="info">
                        <span className="glyphicon glyphicon-edit" data-id={stack._id}></span>
                      </Button>
                      <Button onClick={() => this.deleteStackHandle(_id)} bsStyle="danger">
                        <span className="glyphicon glyphicon-trash"></span>
                      </Button>
                    </ButtonGroup>
                  </Row>
                  <Row className="stack-summary">
                    <Link to={`/stacks/${stack._id}`}>
                      <strong>'{stack.title}'</strong> <br/> <strong>{stack.sentences.length}</strong> cue cards
                </Link>
                  </Row>
                </Col>
              </tr>
            </li>
          ))
        )
    } else {
      return <p>EMPTY</p>
    }
  }

  render() {
    let stacksData = this.stacksData()

    return (
      <Grid>
        <Row className='show-grid'>
          <Table>
            <tbody>
              <input
                type='text'
                id="filterStacks"
                onChange={this.filterStacksHandle}
                placeholder='Search in your stacks...'
              />
              <ul id='myUL'>
                {stacksData}
              </ul>
            </tbody>
            <Route exact path="/stacks/:_id" component={(routeprops) => <Card {...routeprops} {...this.props} />}/>
          </Table>
        </Row>
      </Grid>
    )
  }
}

export default Stacks
