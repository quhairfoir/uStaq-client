import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Button, Modal} from 'react-bootstrap'

// Client-side model
import Resource from '../models/resource'
const StackStore = Resource('stacks')


class Card extends Component {
  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      // stackId: (this.props.match.params.id || null),
      stackId: this.props.location.pathname.split("/")[2] || null,
      stack: {},
      show: false,
      redirect: '/stacks'
    };
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide = event => {
    this.setState({ show: false });
  }

  showCard() {
    console.log("Props here: ", this.props);
    console.log("stackId here: ", this.state.stackId);
    let item = this.props.stacks.find(target => target.id == this.state.stackId)
    console.log("Item here: ", item);
    if (!item) {
      return <Redirect to={this.state.redirect} />
    } else {
      return (

        <div
          {...this.props}
          className="dialog-modal"
          show={this.state.show}
          onKeyDown={this.handleHide}
          >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>{item.description}</Modal.Body>

            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>

        </div>

      )
    }
  }

render() {
  return (

    <div>
      {this.showCard()}
    </div>
  )
}


}

export default Card
