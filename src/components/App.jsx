import React, { Component } from 'react';
// import logo from '../logo.svg';
import './App.css';
// import Dashboard from './Dashboard'
import Main from './Main'
import Users from './Users'
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

// import react router
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stacks: [
        {
          id: faker.random.number({ min: 1, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 2, max: 100 }),
        },
        {
          id: faker.random.number({ min: 1, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 2, max: 100 }),
        },
        {
          id: faker.random.number({ min: 1, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 2, max: 100 }),
        },
        {
          id: faker.random.number({ min: 1, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 2, max: 100 }),
        },
        {
          id: faker.random.number({ min: 1, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 2, max: 100 }),
        },
        {
          id: faker.random.number({ min: 1, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 2, max: 100 }),
        },
        {
          id: faker.random.number({ min: 2, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 1, max: 100 }),
        },
        {
          id: faker.random.number({ min: 2, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 1, max: 100 }),
        },
        {
          id: faker.random.number({ min: 2, max: 100 }),
          name: faker.random.word(),
          description: faker.random.words(),
          quantity: faker.random.number({ min: 1, max: 100 }),
        },
      ]
    }
  }

  render(){
    return (
      <div className="App">
        <TopNav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/stacks" render={({staticcontext, ...props }) => <Stacks {...props} stacks={this.state.stacks} />}/>
          <Route path="/users" component={Users} />
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
