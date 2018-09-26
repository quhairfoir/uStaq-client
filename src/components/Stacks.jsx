
import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

// Stack details modal dialog
import Card from './Card'

// Client-side model
import Resource from '../models/resource'
const StackStore = Resource('stacks')


const Stacks = (props) => (
  <Row>
    <Col xs={12}>

      <PageHeader>
        Stacks collection
      </PageHeader>

      <Table>
        <tbody>
          {props.stacks.map((stack, index) => (
            <tr key={index}>
              <td>{stack.id}</td>
              <td>
                {/* <Link> is a react-router component that works pretty much like <a href> */}
                <Link to={`/stacks/${stack.id}`}>
                  <strong>'{stack.name}'</strong> has <strong>{stack.quantity}</strong> cue cards
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* If the URL has an id at the end, we show the details dialog */}
      {/*<Switch>*/}
        <Route exact path="/stacks/:id" component={(routeprops) => <Card {...routeprops} {...props} />}/>
      {/*}</Switch>*/}

    </Col>
  </Row>
)

export default Stacks
