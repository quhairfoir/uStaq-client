import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Button, Modal} from 'react-bootstrap'

// Client-side model
import Resource from '../models/resource'
import CardCarousel from './CardCarousel'


// import CardScroll from './CardScroll'
const StackStore = Resource('stacks')

class Card extends Component {
  constructor(props) {
    super(props)

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
    this.keyHandle = this.keyHandle.bind(this);
    this.selectedItemHandle = this.selectedItemHandle.bind(this);

    this.state = {
      stackId: (this.props.match.params._id || null),
      isFlipped: false,
      stack: {},
      currentSlide: 0,
      isOpen: true,
      redirect: '/stacks'
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  selectedItemHandle = (index) => {
        const { currentSlide } = this.state;
        if (currentSlide !== index) {
            this.setState({
                currentSlide: index
            });
        }
    }

  toggleCard = () => {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  keyHandle(event) {
    switch (event.keyCode) {
      case 32:
      this.toggleCard();
      console.log("You pressed spacebar");
        break;
      case 27:
      this.toggleModal();
      console.log("You pressed escape");
        break;
      default:
    }
  }

  render() {
    const showCard = () => {
      let item = this.props.stacks.find(target => target._id == this.state.stackId)
      if (!item) {
        return <Redirect to={this.state.redirect}/>
      } else {
        return (
          <Modal
            show={this.state.isOpen}
            onClose={this.toggleModal}
            onKeyDown={this.keyHandle}
            >
            <Modal.Body>
              <CardCarousel
                stack={item}
                onKeyDown={this.keyHandle}
                onChange={this.selectedItemHandle}
                isFlipped={this.state.isFlipped}
                selectedItem={this.state.currentSlide}
                />
              <Button onClick={this.toggleModal} className="card-button">Close</Button>
            </Modal.Body>
          </Modal>
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
