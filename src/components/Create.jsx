import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'
import FormExample from './UrlInput'

class Create extends React.Component {
  
  render() {
    // console.log("this is USEROBJ", this.props.userObj)

    return (
      <div>
        <FormExample userObj={this.props.userObj} />
      </div>
    )
  }
}

export default Create
