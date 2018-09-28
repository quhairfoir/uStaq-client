import React from 'react'; 
import { Popover, Tooltip, Button, Modal, OverlayTrigger, Carousel } from 'react-bootstrap';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.upperDiv = this.upperDiv.bind(this);
    this.lowerDiv = this.lowerDiv.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleCards = this.handleCards.bind(this);

    this.state = {
      show: false,
      indexesToHide: []
    };
  }

  componentDidMount() {
    // this.determineHiddenIndexes(this.props.selectedNode);
    // alert(`${this.props.selectedNode} should be 0`);
  }

  determineHiddenIndexes(index) {
    let indexes = [];
    let currentIndex = index;

    if ('parent' in this.props.sentence[currentIndex]) {
      indexes.push(currentIndex);

      while ('parent' in this.props.sentence[currentIndex]) {
        let currentTextObject = this.props.sentence[currentIndex];

        if (currentTextObject.parent === 'root') break;

        currentIndex = currentTextObject.parent;
        indexes.push(currentIndex);
        console.log("this is current Index", currentIndex)
      }
    } 

    this.setState({
      indexesToHide: indexes
    })
  }

  showCarouselItems() {
    // console.log(this.props.sentences)
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
    let sentence = sentenceObj.sentence;

    return sentence.map((token, index) => 
      <span key={index} onMouseOver={() => this.determineHiddenIndexes(index)}
                        onMouseOut={() => this.determineHiddenIndexes(this.props.selectedNode)}
                        onClick={() => this.props.selectedNode = index}>
        {token.text}
      </span>
    )
  }

  lowerDiv(sentenceObj) {
    let sentence = sentenceObj.sentence;

    return sentence.map((token, index) => 
      <span key={index} className={ this.state.indexesToHide.includes(index) ? 'ghostly' : '' }>
        {token.text}
      </span>
    )
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.determineHiddenIndexes(this.props.selectedNode);
    this.setState({ show: true });
  }

  handleSelect(_, event) {
    let { direction } = event;
  
    console.log("DIRECTION IS:", direction)
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
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

     // this.props.senteces.map(s => s.text).join(' ')

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Create a card
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
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
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>



      </div>
    );
  }
}

export default Example;