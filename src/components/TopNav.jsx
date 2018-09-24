import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

const TopNav = (props) => (
  <Navbar>
    <Nav>
      <Navbar.Brand>
        <Link to='/'>uStaq <small>u learn</small></Link>
      </Navbar.Brand>

      <NavItem className="nav-item" eventKey={1}>
        <Link to="/stacks">Stacks</Link>
      </NavItem>

      <NavItem className="nav-item" eventKey={2}>
        <Link to="/users">Users</Link>
      </NavItem>

      <NavItem className="nav-item" eventKey={3}>
        <Link to="/create">Create</Link>
      </NavItem>

      <NavItem className="nav-item" eventKey={4}>
        <Link to="/sign-in">Sign in</Link>
      </NavItem>

      <NavItem className="nav-item" eventKey={5}>
        <Link to="/sign-up">Sign up</Link>
      </NavItem>

      <NavItem className="nav-item" eventKey={6}>
        <Link to="/search">Search</Link>
      </NavItem>
    </Nav>

  </Navbar>
)

export default TopNav
