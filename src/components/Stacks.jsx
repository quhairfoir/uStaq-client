import React, {Component} from 'react'
import {
  Row,
  Col,
  PageHeader,
  Table,
  Grid,
  Clearfix,
  Modal,
  Dialog,
  Button,
  Body,
  ButtonGroup
} from 'react-bootstrap'

import {Route, Switch, Link} from 'react-router-dom'

// Stack details modal dialog
import Card from './Card'

// Client-side model
import Resource from '../models/resource'
const StackStore = Resource('stacks')

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

  deleteStackHandle(e) {
    let array = [...this.state.stacks]; // make a separate copy of the array
    let index = array.indexOf(e.target.value)
    array.splice(array, 1);
    this.setState({stacks: array});
  }

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

  render() {
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
                {
                  this.state.stacks.map((stack, index) => (
                    <li key={index} style={{ listStyleType: 'none' }}>
                      <tr className='tile' data-toggle='modal' data-target='#exampleModal'>
                        <Col sm={6} md={3} className='eachTile eachTile:hover'>
                          <Row>
                            <ButtonGroup className="edit-delete-btn-group" bsSize="xsmall">
                              <Button href="/edit" bsStyle="info">
                                <span className="glyphicon glyphicon-edit"></span>
                              </Button>
                              <Button onClick={this.deleteStackHandle} bsStyle="danger">
                                <span className="glyphicon glyphicon-trash"></span>
                              </Button>
                            </ButtonGroup>
                          </Row>
                          <Row className="stack-summary">
                            <Link to={`/stacks/${stack.id}`}>
                              <strong>'{stack.title}'</strong> has <strong>{stack.sentences.length}</strong> cue cards
                            </Link>
                          </Row>
                          </Col>
                      </tr>
                    </li>
                  ))
                }
              </ul>
            </tbody>
          </Table>
          <Route exact path="/stacks/:id" component={(routeprops) => <Card {...routeprops} {...this.props} />}/>

        </Row>
      </Grid>
    )
  }
}

export default Stacks
