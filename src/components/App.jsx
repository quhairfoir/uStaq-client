import React, { Component } from 'react';
import logo from '../logo.svg';
// import './App.css';
import Dashboard from './Dashboard'
import Main from './Main'
import Users from './Users'
import Create from './Create'
import Stacks from './Stacks'
import SignIn from './Sign-in'
import SignUp from './Sign-up'
import Filter from './Filter'
import TopNav from './TopNav'
import {Grid} from 'react-bootstrap'
import { render } from 'react-dom';

// import react router
import {Route, Switch} from 'react-router-dom'

const App = () => (
  <div className="App">
    <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/stacks" component={Stacks} />
    <Route path="/users" component={Users} />
    <Route path="/create" component={Create} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/search" component={Filter} />
    <Route path="/users/:userId" component={Users} />
    </Switch>
  </div>
);


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">uStaq</h1>
//           <p>u learn</p>
//         </header>
//         <p className="App-intro">
//           This is a wireframe for uStaq. We need to edit
//           <code>src/App.js</code> and <code>src/components </code>
//            to make thing look as expected.
//           Then just save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
