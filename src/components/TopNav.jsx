import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Grid} from 'react-bootstrap'

const handleClick = (e) => {
  // Prevents page reload
  e.preventDefault();

  // Initializes OAuth.io with API key
  // Sign-up an account to get one
  window.OAuth.initialize('_iSZVvDIMwLHtJgOQQ8gXsOftQI');

  // Popup Github and ask for authorization
  window.OAuth.popup('github').then((provider) => {

    // Prompts 'welcome' message with User's name on successful login
    // Check console logs for additional User info
    provider.me().then((data) => {
      console.log("data: ", data);
      alert("Welcome " + data.name + "!");
    });

    // You can also call Github's API using .get()
    provider.get('/user').then((data) => {
       console.log('self data:', data);
    });

  });
}

const TopNav = (props) => (
  <Grid>
  <Navbar>

    <Link to='/' className="nav-item">uStaq <small>u learn</small></Link>

    <Link to="/stacks" className="nav-item">Stacks</Link>

    <Link to="/users" className="nav-item">Users</Link>

    <Link to="/create" className="nav-item">Create</Link>

    <a href="" onClick={handleClick.bind(this)} className="btn btn-social btn-github">
        <span className="fa fa-github"></span> Sign in with Github
      </a>

    <Link to="/sign-up" className="nav-item">Sign up</Link>

    <button type="button" class="btn btn-link">Sign in</button>

  </Navbar>
</Grid>
)

export default TopNav
