import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Modal, Button, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import axios from 'axios';

bootstrapUtils.addStyle(Navbar, 'custom');

class ModalNav extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      show: false,
      user: null
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    axios(`http://localhost:8080/users/token`, {withCredentials: true})
    .then( (response) => {  
      window.OAuth.initialize('_iSZVvDIMwLHtJgOQQ8gXsOftQI');

      // console.log("this is token", token)
  
      // Popup Github and ask for authorization
      window.OAuth.popup('github', {
        state: response.data.token
      })
      .done((result) => {
        // Prompts 'welcome' message with User's name on successful login
        // Check console logs for additional User info
        console.log("this is result", result)
        axios.post('http://localhost:8080/users/auth', {code: result.code}, {withCredentials: true})
        .then(() => {
          this.props.fetchingUser();
          this.handleClose();
        })
        // result.me().then((data) => {
        //   console.log("data: ", data);
        //   let userObj = data;
          
        //   // alert("Welcome " + data.name + "!");
        // });
  
        // // You can also call Github's API using .get()
        // result.get('/user').then((data) => {
        //   console.log('self data:', data);
        // });
      });
    });

  }
  componentWillReceiveProps(nextProps){
    this.setState({user: nextProps.userObj})
  }

  render() {
    var styles={
      "backgroundColor" : "purple",
      "color"           : "white"
  };

    return (
      <div>
        <Navbar style={styles} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">uStaq</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title="Stacks" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1}><Link to={`/stacks`}>My Stacks</Link></MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={1.2}>All Stacks</MenuItem>
                
              </NavDropdown>
              <NavItem eventKey={2}>
                <Link to={`/quizroom`}>Quiz</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} >
                {this.state.user ? 
                <div>{this.state.user.email}</div>
                :                
                <Button bsStyle="link" onClick={this.handleShow}>
                  Sign in
                </Button>
                }
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
