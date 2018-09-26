import React from 'react'; 
import { Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.upperDiv = this.upperDiv.bind(this);
    this.lowerDiv = this.lowerDiv.bind(this);
    // this.handleCards = this.handleCards.bind(this);

    this.state = {
      show: false
    };
  }

  upperDiv() {
    return this.props.sentence.map((token, index) => 
      <span key={index} data-parent={token.parent}>
        {token.text}
      </span>
    )
  }

  lowerDiv() {
    return this.props.sentence.map((token, index) => 
      <span key={index} data-parent={token.parent}>
        {token.text}
      </span>
    )
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // this.props.senteces.map(s => s.text).join(' ')
    // );
    // const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

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
            <div className="card-text">
            <div className="blanko"> {this.upperDiv()}</div>
            </div>
            <hr />
            <div className="blanko"> {this.lowerDiv()}</div>
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