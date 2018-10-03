import React, { Component } from 'react';
import '../styles/App.css';
import Main from './Main'
import ViewOrCreateStacks from './ViewOrCreateStacks'
import TopNav from './TopNav'
import QuizRoom from './QuizRoom'
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
    this.handleSubmitStack = this.handleSubmitStack.bind(this)
    this.fetchingUser = this.fetchingUser.bind(this);
  }

  fetchingUser() {
    axios('http://localhost:8080/users', {withCredentials: true})
    .then(response => {
      if (response.data) {
      this.getUserStacks(response.data._id)
      this.setState({ userObj: response.data });
      }
    })
  }

  getUserStacks = (userId) => {
    axios(`http://localhost:8080/stacks/user/${userId}`)
    .then(stacks => this.setState({ stacks: stacks.data }))
    .catch(error => console.log(error))
  }

  componentDidMount() {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
    document.body.appendChild(oauthScript);
    this.fetchingUser();
  }

  handleSubmitStack (proto) {
    if (proto.query === null && proto.text === null) {
     return alert("ERROR - cannot send empty request")
    } else if (proto.title === null && proto.text) {
      return alert("ERROR - stack must have a title")
    } else if (proto.query && proto.text) {
      return alert("ERROR - cannot submit both query and text")
    }
    let protoStack = {
      userId: this.state.userObj._id,
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

  render(){
    return (
      <div className="App">
        <TopNav fetchingUser={this.fetchingUser} userObj={this.state.userObj}/>
        <Switch>
          <Route path="/quizroom" component={(props) => <QuizRoom {...props} userObj={this.state.userObj} />} />
          <Route path="/stacks" component={({staticcontext, ...props }) => <ViewOrCreateStacks {...props} handleSubmitStack={this.handleSubmitStack} stacks={this.state.stacks} getUserStacks={this.getUserStacks} userObj={this.state.userObj} />}/>
          <Route path="/" component={Main} />
        </Switch>
      </div>
    )
  }
};

export default App;
