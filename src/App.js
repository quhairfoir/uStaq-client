import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard'
import Users from './components/Users'
import Create from './components/Create'
import TopNav from './components/TopNav'
import {Grid} from 'react-bootstrap'
import { render } from 'react-dom';

// import react router
import {BrowserRouter, Route, Switch} from 'react-router-dom'


const App = () => (
  <BrowserRouter>
    <div className="sans-serif">
      <Route path="/" component={Dashboard} />
      <Route path="/users/:userId" component={Users} />
    </div>
  </BrowserRouter>
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
