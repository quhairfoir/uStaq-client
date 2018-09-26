import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom' 
import FormExample from './UrlInput'

class Create extends React.Component {

  render() {
    return (
      <div>
        <h1>This is the page to create new collections of cue stacks.</h1>
        <h3>It is for testing purposes only and should be changed for stackion.</h3>
        <FormExample />
          
      </div>
    )
  }
}

export default Create