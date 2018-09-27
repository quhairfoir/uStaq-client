import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom'
import {Button, Modal} from 'react-bootstrap'

// Client-side model
import Resource from '../models/resource'
// import CardScroll from './CardScroll'
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
      show: 'false',
      redirect: '/stacks'
    };
  }

  handleShow() {
    this.setState({ show: 'true' });
  }

  handleHide(){
    this.setState({ show: 'false' });
  }


render() {
  const showCard = () => {
    console.log("Props here: ", this.props);
    console.log("stackId here: ", this.state.stackId);
      let item = this.props.stacks.find(target => target.id == this.state.stackId)
      console.log("Item here: ", item);
      if (!item) {
        return <Redirect to={this.state.redirect} />
      } else {
        return (

        <div>

          {item.description}

        </div>

      )
  }
}
  return (

    <div>
      {showCard()}

    </div>
  )
}


}

export default Card
