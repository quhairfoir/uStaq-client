import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Grid} from 'react-bootstrap'

const TopNav = (props) => (
  <Grid>
  <Navbar>

    <Link to='/' className="nav-item">uStaq <small>u learn</small></Link>

    <Link to="/stacks" className="nav-item">Stacks</Link>

    <Link to="/users" className="nav-item">Users</Link>

    <Link to="/create" className="nav-item">Create</Link>

    <Link to="/quizroom" className="nav-item">Quiz Room</Link>

    <Link to="/sign-in" className="nav-item">Sign in</Link>

    <Link to="/sign-up" className="nav-item">Sign up</Link>

  </Navbar>
</Grid>
)

export default TopNav
