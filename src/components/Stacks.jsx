import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import Filter from './Filter'
import _ from 'lodash'
import faker from 'faker'
// Product details modal dialog
import Card from './Card'

// Client-side model
import Resource from '../models/resource'

// const source = _.times(5, () => ({
//   title: faker.random.word,
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))


class Stacks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stacks: [],
      selectedStack: {},
      showCard: false,
      errors: null
    }
  }

  render() {
    return (
      <Row>
          <h1>This is the page of a user's personal collection</h1>
        <Col xs={12}>

          <PageHeader>
            Stacks
          </PageHeader>

          <Table>

            <tbody>
              {this.state.stacks.map((stack, index) => (
                <tr key={index}>
                  <td>{stack.id}</td>
                  <td>
                    {/* <Link> is a react-router component that works pretty much like <a href> */}
                    <Link to={`/stacks/${stack.id}`}>
                      {stack.name}
                    </Link>
                  </td>
                  <td>{stack.price}</td>
                  <td>{stack.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* If the URL has an id at the end, we show the details dialog */}
          <Switch>
            <Route path="/stacks/:id" component={Card} />
          </Switch>

        </Col>
      </Row>
    )
  }
}

export default Stacks
