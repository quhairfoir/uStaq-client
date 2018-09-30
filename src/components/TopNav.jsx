import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Modal, Button, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class ModalNav extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClick(e) {
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

  render() {

    return (
      <div>


        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">uStaq</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title="Stacks" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1} href="/stacks">My Stacks</MenuItem>
                <MenuItem eventKey={1.2}>All Stacks</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={1.3} href="create">Create</MenuItem>
              </NavDropdown>
              <NavItem eventKey={2} href="/quizroom">
                Quiz
              </NavItem>
              {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown> */}
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} >

                <Button bsStyle="link" onClick={this.handleShow}>
                  Sign in
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Welcome back.</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4>Sign in to access your personalized homepage.</h4>
                    <a href="" onClick={this.handleClick} className="btn btn-social btn-github">
                      <span className="fa fa-github"></span> Sign in with Github
                      </a>

                    <hr />

                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>




      </div>

    );
  }


}

export default ModalNav;
