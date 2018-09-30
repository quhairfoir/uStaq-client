import React, { Component } from 'react';
// import logo from '../logo.svg';
import './App.css';
// import Dashboard from './Dashboard'
import Main from './Main'
// import Users from './Users'
import Create from './Create'
import Stacks from './Stacks'
import SignIn from './Sign-in'
import SignUp from './Sign-up'
// import Filter from './Filter'
import TopNav from './TopNav'
import QuizRoom from './QuizRoom'
// import {Grid} from 'react-bootstrap'
// import { render } from 'react-dom';
import faker from 'faker'
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

// import react router
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stacks: [
        {
          title: 'Title of Stack 1',
          id: '1',
          owner:
            {
              _id : '1'
            },
          sentences: [
            {
              front: 'Front Side of Card 1',
              back: 'Back Side of Card 1'
            },
            {
              front: 'Front Side of Card 2',
              back: 'Back Side of Card 2'
            },
            {
              front: 'Front Side of Card 3',
              back: 'Back Side of Card 3'
            },
            {
              front: 'Front Side of Card 4',
              back: 'Back Side of Card 4'
            },
            {
              front: 'Front Side of Card 5',
              back: 'Back Side of Card 5'
            },
          ],
        },
        {
          title: 'Title of Stack 2',
          id: '2',
          owner:
            {
              _id : '2'
            },
          sentences: [
            {
              front: 'Front Side of Card 1',
              back: 'Back Side of Card 1'
            },
            {
              front: 'Front Side of Card 2',
              back: 'Back Side of Card 2'
            },
            {
              front: 'Front Side of Card 3',
              back: 'Back Side of Card 3'
            },
            {
              front: 'Front Side of Card 4',
              back: 'Back Side of Card 4'
            },
            {
              front: 'Front Side of Card 5',
              back: 'Back Side of Card 5'
            },
          ],
        },
        {
          title: 'Title of Stack 3',
          id: '3',
          owner:
            {
              _id : '2'
            },
          sentences: [
            {
              front: 'Front Side of Card 1',
              back: 'Back Side of Card 1'
            },
            {
              front: 'Front Side of Card 2',
              back: 'Back Side of Card 2'
            },
            {
              front: 'Front Side of Card 3',
              back: 'Back Side of Card 3'
            },
            {
              front: 'Front Side of Card 4',
              back: 'Back Side of Card 4'
            },
            {
              front: 'Front Side of Card 5',
              back: 'Back Side of Card 5'
            },
          ],
        },
        {
          title: 'Title of Stack 4',
          id: '4',
          owner:
            {
              _id : '3'
            },
          sentences: [
            {
              front: 'Front Side of Card 1',
              back: 'Back Side of Card 1'
            },
            {
              front: 'Front Side of Card 2',
              back: 'Back Side of Card 2'
            },
            {
              front: 'Front Side of Card 3',
              back: 'Back Side of Card 3'
            },
            {
              front: 'Front Side of Card 4',
              back: 'Back Side of Card 4'
            },
            {
              front: 'Front Side of Card 5',
              back: 'Back Side of Card 5'
            },
          ],
        },
        {
          title: 'Title of Stack 5',
          id: '5',
          owner:
            {
              _id : '4'
            },
          sentences: [
            {
              front: 'Front Side of Card 1',
              back: 'Back Side of Card 1'
            },
            {
              front: 'Front Side of Card 2',
              back: 'Back Side of Card 2'
            },
            {
              front: 'Front Side of Card 3',
              back: 'Back Side of Card 3'
            },
            {
              front: 'Front Side of Card 4',
              back: 'Back Side of Card 4'
            },
            {
              front: 'Front Side of Card 5',
              back: 'Back Side of Card 5'
            },
          ],
        },
      ]
    }
  }

  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  render(){
    return (
      <div className="App">
        <TopNav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/stacks" render={({staticcontext, ...props }) => <Stacks {...props} stacks={this.state.stacks} />}/>
          {/* <Route path="/users" component={Users} /> */}
          <Route path="/create" component={Create} />
          <Route path="/quizroom" component={QuizRoom} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </div>
      )
  }
};

export default App;
