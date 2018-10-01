import React from 'react';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Carousel } from 'react-bootstrap';

class CardModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.upperDiv = this.upperDiv.bind(this);
    this.lowerDiv = this.lowerDiv.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      show: false,
    };
  }

  showCarouselItems() {
    return this.props.sentences.map((sentenceObj, index) =>
      <Carousel.Item key={index}>
        <div className="card-text">
          <div className="blanko"> {this.upperDiv(sentenceObj)}</div>
        </div>
        <div className="blanko"> {this.lowerDiv(sentenceObj)}</div>
      </Carousel.Item>)
  }
  //create the upperDiv using sentenceObj from showCarouselItems
  upperDiv(sentenceObj) {
    let sentence = sentenceObj.tokens;

    return sentence.map((token, index) =>
      <span key={index} onMouseOver={() => this.props.handleUpperMouseOver(index)}
        onMouseOut={() => this.props.handleUpperMouseOut(sentenceObj.selectedToken)}
        onClick={() => this.props.handleUpperClick(index)}>
        {token.text.content}
      </span>
    )
  }

  lowerDiv(sentenceObj) {
    let sentence = sentenceObj.tokens;

    return sentence.map((token, index) =>
      <span key={index} className={this.props.indicesToHide.includes(index) ? 'ghostly' : ''}>
        {token.text.content}
      </span>
    )
  }

  handleSelect(_, event) {
    let { direction } = event;

    switch (direction) {
      case 'next':
        this.props.incrementCurrentSentence()
        break;
      case 'prev':
        this.props.decrementCurrentSentence();
        break;
    }
  }

  render() {

    return (
      <div>
        <Modal bsSize="large" show={true} onHide={this.props.toggleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card card-body">
              <h4 className="card-title"></h4>
              <Carousel
                activeIndex={this.props.currentIndex}
                // direction={direction}
                onSelect={this.handleSelect}>
                {this.showCarouselItems()}
              </Carousel>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.toggleShow}>Close</Button>
          </Modal.Footer>
        </Modal>



      </div>
    );
  }
}

export default CardModal;