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
  Body
} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

// Stack details modal dialog
import Card from './Card'
// import VisibleStacks from './FilterStacks'
// Client-side model
import Resource from '../models/resource'
const StackStore = Resource('stacks')

class Stacks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
    }
    this.myFunction = this.myFunction.bind(this);
  }

  myFunction() {
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
                onChange={this.myFunction}
                placeholder='Search in your stacks...'
                />
              <ul id='myUL'>
                {
                  this.props.stacks.map((stack, index) => (
                    <li key={index} style={{ listStyleType: 'none' }}>
                      <tr className='tile' data-toggle='modal' data-target='#exampleModal'>
                        <Link to={`/stacks/${stack.id}`}>
                          <Col sm={4} md={2} className='eachTile eachTile:hover'>
                            <strong>'{stack.name}'</strong><br/><strong>{stack.quantity}</strong> cue cards
                          </Col>
                        </Link>
                      </tr>
                  </li>))
                }
              </ul>
            </tbody>
          </Table>
          <Route exact path="/stacks/:id" component={(routeprops) => <Card {...routeprops} {...this.props}/>}/>
        </Row>
      </Grid>
    )
  }
}

export default Stacks
