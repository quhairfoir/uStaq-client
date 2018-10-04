import React from "react";
import CardModal from "./CardModal";
import { Grid, Row, PageHeader, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import '../styles/Edit.css'
import '../styles/CardModal.css'
import axios from 'axios'

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCards: false,
      sentences: null,
      title: null,
      currentSentence: null,
      indicesToHide: [],
    };
    this.incrementCurrentSentence = this.incrementCurrentSentence.bind(this);
    this.decrementCurrentSentence = this.decrementCurrentSentence.bind(this);
    this.handleUpperMouseOver = this.handleUpperMouseOver.bind(this);
    this.handleUpperMouseOut = this.handleUpperMouseOut.bind(this);
    this.handleUpperClick = this.handleUpperClick.bind(this);
    this.handleCarouselSlide = this.handleCarouselSlide.bind(this);
  }

  componentDidMount() {
    console.log(this.props.stackId)
    axios(`http://localhost:8080/stacks/${this.props.stackId}`)
    .then(stack => {
      let sentences = stack.data[0].sentences
      let title = stack.data[0].title

      this.setState({
        stack: stack.data[0],
        sentences,
        title,
      });
    })
    .catch(error => alert(error))

  }

  deleteCard = (event) => {
    let index = event === undefined ? 0 : Number(event.target.getAttribute("data-index"))
    this.setState(
      { sentences: [...this.state.sentences.slice(0, index), ...this.state.sentences.slice(index +1)] })
  }

  toggleCardModal = (event) => {
    let index = event === undefined ? 0 : Number(event.target.getAttribute("data-index"))
    let showCards = !this.state.showCards
    this.setState({
      currentSentence: index,
      showCards
    }, () => {
      this.resetIndicesToHide();
    });
  }

  incrementCurrentSentence() {
    this.setState({
      currentSentence: (this.state.currentSentence + 1) % this.state.sentences.length,
    });
  }

  decrementCurrentSentence() {
    this.setState({
      currentSentence:
        this.state.currentSentence == 0
          ? this.state.sentences.length - 1
          : this.state.currentSentence - 1,
    });
  }

  handleUpperMouseOver(startIndex, event) {
    this.determineIndicesToHide(startIndex, event);
  }

  handleUpperMouseOut(startIndex, event) {
    this.resetIndicesToHide();
  }

  handleCarouselSlide() {
    this.resetIndicesToHide();
  }

  determineIndicesToHide(startIndex, event) {
    let indicesToHide = [];
    let sentence = this.state.sentences[this.state.currentSentence];

    if (event && event.metaKey) {
      // If Command key is pressed, retain list of indices and add another one corresponding to
      // hovered item.
      indicesToHide = this.state.indicesToHide.slice();
      let indicesToHideSet = new Set(indicesToHide);
      if (indicesToHide.includes(startIndex)) {
        indicesToHideSet.delete(startIndex);
      } else {
        indicesToHideSet.add(startIndex);
      }
      indicesToHide = Array.from(indicesToHideSet);
    } else {
      if (sentence.tokens[startIndex].hoverable) {
        indicesToHide = this.buildHideSubTree(startIndex)
      } else {
        indicesToHide = this.state.indicesToHide
      }
    }

    this.setState({
      indicesToHide,
    });
  }

  // Build the list of indexes to hide: from a starting index, look at all of its children, and for
  // each one, call the function recursively; propagate the result back up
  buildHideSubTree(index) {
    let result = [index];
    let sentence = this.state.sentences[this.state.currentSentence];
    for (let child of sentence.tokens[index].hoverInfo.children) {
      result = result.concat(this.buildHideSubTree(child));
    }
    return result;
  }

  // Set indicesToHide back to what is stored in sentence (as opposed to temporary construction
  // from mousover).
  resetIndicesToHide() {
    // TODO: When creating sentences, give them indicesToHide field from the beginning so that
    // we don't have to check for it here. The following lines can then be collapsed.
    let indicesToHide = [];
    if (this.state.sentences[this.state.currentSentence].indicesToHide) {
      indicesToHide = this.state.sentences[this.state.currentSentence].indicesToHide.slice();
    }

    this.setState({
      indicesToHide,
    });
  };

  handleUpperClick = (index, event) => {
    // Make a deep copy of sentences and of indicesToHide.
    let stateSentences = JSON.parse(JSON.stringify(this.state.sentences));
    let indicesToHide = this.state.indicesToHide.slice();
    stateSentences[this.state.currentSentence].indicesToHide = indicesToHide;
    stateSentences[this.state.currentSentence].front = this.buildCardFront(indicesToHide);

    this.setState({
      sentences: stateSentences,
      indicesToHide
    })
  };

  shouldComponentUpdate(nextProps) {
    console.log(nextProps)
    return true
  }

  handleCardClick = (index) => {
    console.log(index)
    this.setState({ showCards: true })
  }

  buildCardFront(indicesToHide) {
    console.log(JSON.stringify(this.state.sentences[this.state.currentSentence].tokens));
    const front = this.state.sentences[this.state.currentSentence].tokens.map((token, index) =>
      indicesToHide.includes(index) ? "────" : token.text.content
    ).join(' ');
    return front;
  }

  handleSave = () => {
    let newStack = JSON.parse(JSON.stringify(this.state.stack));
    newStack.sentences = JSON.parse(JSON.stringify(this.state.sentences));
    this.props.handleSaveEdit(newStack, this.props.stackId)
  }

  makeCardList() {
    return this.state.sentences.map((sentence, index) => (
      <ListGroupItem data-index={index}><Button bsSize="xsmall" bsStyle="danger" className="delete-card-btn" onClick={this.deleteCard}><span data-index={index} className="glyphicon glyphicon-trash"></span></Button><p data-index={index} className="edit-card-text" onClick={this.toggleCardModal}>{sentence.text.content}</p></ListGroupItem>
    ))
  }

  render() {
    let cardList = this.state.sentences === null ? <ListGroupItem></ListGroupItem> : this.makeCardList()
    return(
      <Grid>
        <Row>
          <PageHeader id="smallerHeader">
            <small>Edit: {this.state.title}</small>
          </PageHeader>
        </Row>
        <Row>
          <ListGroup /*onClick={this.toggleCardModal}*/ >
            {cardList}
          </ListGroup>
        </Row>
        <Row>
          <Button bsStyle="success" onClick={this.handleSave}>Save</Button>
          <Button onClick={this.props.toggleEdit}>Cancel</Button>
        </Row>
        {this.state.showCards ? (
          <CardModal
            toggleShow = {this.toggleCardModal}
            incrementCurrentSentence={this.incrementCurrentSentence}
            decrementCurrentSentence={this.decrementCurrentSentence}
            title={this.state.title}
            sentences={this.state.sentences}
            currentIndex={this.state.currentSentence}
            indicesToHide={this.state.indicesToHide}
            handleUpperMouseOver={this.handleUpperMouseOver}
            handleUpperMouseOut={this.handleUpperMouseOut}
            handleUpperClick={this.handleUpperClick}
            handleCarouselSlide={this.handleCarouselSlide}
          />
        ) : null}
      </Grid>
    )
  }
}


export default Edit
