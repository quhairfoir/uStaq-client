import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

const TopNav = (props) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>
          uStaq
        </Link>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>
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
    </Nav>

  </Navbar>
)

export default TopNav
