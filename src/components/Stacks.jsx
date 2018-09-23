import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

// Product details modal dialog
import Card from './Card'

// Client-side model
import Resource from '../models/resource'
const ProductStore = Resource('stacks')


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

  componentWillMount() {
    ProductStore.findAll() // ProductStore does the API fetching!
    .then((result) => this.setState({stacks: result.data, errors: null}))
    .catch((errors) => this.setState({errors: errors}))
  }

  render() {
    return (
      <Row>
        <Col xs={12}>

          <PageHeader>
            Stacks
          </PageHeader>

          <Table>

            <tbody>
              {this.state.products.map((stack, index) => (
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

export default Products
