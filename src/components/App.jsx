import React, { Component } from 'react';
import '../styles/App.css';
import Main from './Main'
import Edit from './Edit'
import ViewOrCreateStacks from './ViewOrCreateStacks'
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
      stacks: []

    }
    this.handleStoringUsers = this.handleStoringUsers.bind(this);
    this.handleSubmitStack = this.handleSubmitStack.bind(this)
  }

  handleStoringUsers(userObj) { //creat the shape of user and set it here, in app, login will eventually need to check whether or not you've alredy been here, if so, don't create the user in the db
    let newUser = {
      _id: userObj.id,
      email: userObj.email,
      owned: []
    }
    axios.post('http://localhost:8080/users', newUser)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    this.setState({ userObj });
    let userId = this.state.userObj.id
    let stacks = this.getUserStacks(userId)
  }

  getUserStacks(userId) {
    axios(`http://localhost:8080/stacks/user/${userId}`)
    .then(stacks => this.setState({ stacks: stacks.data }))
    .catch(error => console.log(error))
  }

  componentDidMount() {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  handleSubmitStack (proto) {
    if (proto.query === null && proto.text === null) {
      throw "ERROR -- cannot send empty request to server"
    }
    let protoStack = {
      userId: this.state.userObj.id,
      proto
    }
    axios.post('http://localhost:8080/proto', protoStack)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  render(){
    return (
      <div className="App">
        <TopNav handleStoringUsers={this.handleStoringUsers} userObj={this.state.userObj}/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/stacks" render={({staticcontext, ...props }) => <ViewOrCreateStacks {...props} handleSubmitStack={this.handleSubmitStack} stacks={this.state.stacks} />}/>
          <Route path="/quizroom" component={QuizRoom} />
        </Switch>
      </div>
      )
  }
};

export default App;
