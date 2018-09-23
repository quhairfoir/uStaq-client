import React from 'react'
import {Row, Col, PageHeader} from 'react-bootstrap'
import TopNav from './TopNav'

const Dashboard = (props) => (
  <Row>
    <Col xs={12}>
      <PageHeader>
        uStaq <small>u learn</small>
      </PageHeader>
      <TopNav />
    </Col>
  </Row>
)

export default Dashboard
