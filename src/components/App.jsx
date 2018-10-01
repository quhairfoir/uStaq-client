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

  getUserStacks = () => {
    let userId = this.state.userObj.id
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
     return alert("ERROR - cannot send empty request")
    } else if (proto.title === null) {
      return alert("ERROR - stack must have a title")
    } else if (proto.query && proto.text) {
      return alert("ERROR - cannot submit both query and text")
    }
    let protoStack = {
      userId: this.state.userObj.id,
      proto
    }

    axios.post('http://localhost:8080/proto', protoStack)
      .then(response => {
        this.setState({
          stacks: [...this.state.stacks, response.data]
       })
      })
      .catch(error => console.log(error))
  }

  // handleStackDelete(stackId) {
  //   if(window.confirm("Are you sure you want to delete this stack?")){
  //     console.log('Here  is what I am looking for');
  //     axios.delete(`http://localhost:8080/stacks/delete/${stackId}`, {params: { _id: stackId }} )
  //       .then(response => console.log(response))
  //       .catch(error => console.log(error))
  //   }
  // }

  render(){
    return (
      <div className="App">
        <TopNav handleStoringUsers={this.handleStoringUsers} userObj={this.state.userObj}/>
        <Switch>
          <Route path="/quizroom" component={(props) => <QuizRoom {...props} userObj={this.state.userObj} />} />
          <Route path="/stacks" render={({staticcontext, ...props }) => <ViewOrCreateStacks {...props} handleSubmitStack={this.handleSubmitStack} stacks={this.state.stacks} getUserStacks={this.getUserStacks} />}/>
          <Route path="/" component={Main} />
        </Switch>
      </div>
    )
  }
};

export default App;
