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
      currentSentence: 0, 
      indicesToHide: [] 
    };
    this.incrementCurrentSentence = this.incrementCurrentSentence.bind(this);
    this.decrementCurrentSentence = this.decrementCurrentSentence.bind(this);
    this.determineIndicesToHide = this.determineIndicesToHide.bind(this);
    this.handleWordClick = this.handleWordClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.stackId)
    axios(`http://localhost:8080/stacks/${this.props.stackId}`)
    .then(stack => {
      console.log(stack)
      let sentences = stack.data[0].sentences
      let title = stack.data[0].title
      for (let sentence of sentences) {
        sentence.selectedToken = sentence.chefsRecommendation;
      }
      this.setState({ sentences }, () => {
        this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken)
      })
      this.setState({ title })
    })
    .catch(error => alert(error))

  }

  toggleCardModal = (event) => {
    let index = Number(event.target.getAttribute("data-index"))
    this.setState({ currentSentence: index})
    let showCards = this.state.showCards ? false : true
    this.setState({ showCards })
  }

  incrementCurrentSentence() {
    this.setState({
      currentSentence:
        (this.state.currentSentence + 1) % this.state.sentences.length,
    }, () => {
      this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken);
    });
  }

  decrementCurrentSentence() {
    this.setState({
      currentSentence:
        this.state.currentSentence == 0
          ? this.state.sentences.length - 1
          : this.state.currentSentence - 1,
    }, () => {
      this.determineIndicesToHide(this.state.sentences[this.state.currentSentence].selectedToken);
    });
  }

  determineIndicesToHide(startIndex) {
    let indicesToHide = [];

    let sentence = this.state.sentences[this.state.currentSentence];
    if ('hoverable' in sentence.tokens[startIndex]) {
      indicesToHide = this.buildHideSubTree(startIndex)
    }

    this.setState({
      indicesToHide,
    })
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

  handleCardClick = (index) => {
    console.log(index)
    this.setState({ showCards: true })
  }

  handleWordClick = index => {
    this.state.sentences[this.state.currentSentence].selectedToken = index;
  };

  handleSave = () => {
    this.props.handleSaveEdit(this.props.stackId)
  }

  makeCardList() {
    return this.state.sentences.map((sentence, index) => (
      <ListGroupItem data-index={index}>{sentence.text.content}<br />Score: <strong>{sentence.score}</strong></ListGroupItem>
    ))
  }

  render() {
    let cardList = this.state.sentences === null ? <ListGroupItem>NOPE</ListGroupItem> : this.makeCardList() 
    return(
      <Grid>
        <Row>
          <PageHeader id="smallerHeader">
            <small>{this.state.title}</small>
          </PageHeader>
        </Row>
        <Row>
          <ListGroup onClick={this.toggleCardModal}>
            {cardList}
          </ListGroup>
        </Row>
        <Row>
          <Button onClick={this.handleSave}>Save</Button>
        </Row>
        {this.state.showCards ? (
          <CardModal
            toggleShow = {this.toggleCardModal}
            incrementCurrentSentence={this.incrementCurrentSentence}
            decrementCurrentSentence={this.decrementCurrentSentence}
            sentences={this.state.sentences}
            currentIndex={this.state.currentSentence}
            indicesToHide={this.state.indicesToHide}
            handleUpperMouseOver={this.determineIndicesToHide}
            handleUpperMouseOut={this.determineIndicesToHide}
            handleUpperClick={this.handleWordClick}
          />
        ) : null}
      </Grid>
    )
  }
}


export default Edit