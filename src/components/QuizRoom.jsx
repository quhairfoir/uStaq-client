import React from 'react'
import {Row, Grid, FormGroup, FormControl, ControlLabel, PageHeader, Well, Panel} from 'react-bootstrap'
// import {Route, Switch, Link} from 'react-router-dom'


class QuizRoom extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <PageHeader>
            <small>The (mostly) educational trivia game</small>
          </PageHeader>
        </Row>
        <Row>
          <Panel>
            <Panel.Heading>
              <h2>Q: _________ are small fuzzy creatures.</h2>
            </Panel.Heading>
            <Panel.Body id="messageBox">
            <p><strong>Dia</strong>: Sea Otters!</p>
            <p><strong>Morag</strong>: Damn, I was going to guess that...</p>
            </Panel.Body>
            <Panel.Footer>
              <FormGroup controlId="formControlsTextarea" className="quizTextArea">
                <ControlLabel>Your answer...?</ControlLabel>
                <FormControl componentClass="textarea" placeholder="..." />
              </FormGroup>
            </Panel.Footer>
          </Panel>
        </Row>
      </Grid>
    )
  }
}

export default QuizRoom