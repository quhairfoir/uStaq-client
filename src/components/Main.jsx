import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import TopNav from './TopNav'


class Main extends React.Component {

  render() {
    return (
      <div>
        <TopNav />
      </div>
    )
  }
}

export default Main
