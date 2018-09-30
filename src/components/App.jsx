import React, { Component } from 'react';
// import logo from '../logo.svg';
import './App.css';
// import Dashboard from './Dashboard'
import Main from './Main'
// import Users from './Users'
import Create from './Create'
import ViewOrCreateStacks from './ViewOrCreateStacks'
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
import axios from 'axios';

// import react router
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userObj: null,
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
    this.handleStoringUsers = this.handleStoringUsers.bind(this);
  }

  //make a function that sets the state in the app and bind that function in the constructor and pass it down to the nav, so from the nav we can set the state

  handleStoringUsers(userObj) { //creat the shape of user and set it here, in app, login will eventually need to check whether or not you've alredy been here, if so, don't create the user in the db
  // console.log("this is userOBJ", userObj)
    let newUser = {
      _id: userObj.id,
      email: userObj.email,
      owned: []
    }
    console.log("NEW USER", newUser)
    axios.post('http://localhost:8080/users', newUser)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    this.setState({ userObj });
    // console.log("this.state!!!", this.state.userObj)
  }

  componentDidMount() {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  render(){
    return (
      <div className="App">
        <TopNav handleStoringUsers={this.handleStoringUsers} userObj={this.state.userObj}/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/stacks" render={({staticcontext, ...props }) => <ViewOrCreateStacks {...props} stacks={this.state.stacks} />}/>
          {/* <Route path="/users" component={Users} /> */}
          <Route path="/create" component={(props) => <Create {...props} userObj={this.state.userObj} />} />
          <Route path="/quizroom" component={(props) => <QuizRoom {...props} userObj={this.state.userObj} />} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </div>
      )
  }
};

export default App;
