import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      name: '',
      password2: '',
      email: ''
    }
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  formSubmit = e => {
    e.preventDefault()

    let user = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email,
      password2: this.state.password2,
      imgUrl: this.state.imgUrl
    }

    let toReturn = this.validateUserData(user);
    if (toReturn)
      return;
      
    this.props.register(user).then(res => {
      if (res.code) {
        this.props.createNotification('Error', 'Username already exists');
        return;
      }
      this.props.createNotification('success', 'Registered');
      this.props.updateAppState();
      this.props.history.push('/');
    });
  }

  validateUserData(user) {
    if (user.name.length < 4) {
      this.props.createNotification('error', 'Name should be at least 4 symbols long');
      return true;
    }
    if (user.username.length < 4) {
      this.props.createNotification('error', 'Username should be at least 4 symbols long');
      return true;
    }
    if (user.password.length < 6) {
      this.props.createNotification('error', 'Password should be at least 6 symbols long');
      return true;
    }
    if (user.password2.length !== user.password.length) {
      this.props.createNotification('error', "Passwords don't match");
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <div className='App-body-title'><p>REGISTER</p></div>
        <Form className="registerForm" onSubmit={this.formSubmit}>
          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control type='text' id='name' name='name' value={this.state.name} onChange={(e) => this.inputChange(e, 'name')} required placeholder="Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
              <Form.Control type='text' id='username' name='username' value={this.state.username} onChange={(e) => this.inputChange(e, 'username')} required placeholder="Username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' id='email' name='email' value={this.state.email} onChange={(e) => this.inputChange(e, 'email')} required placeholder="Email address" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' id='password' name='password' value={this.state.password} onChange={(e) => this.inputChange(e, 'password')} required placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type='password' id='password2' name='password2' value={this.state.password2} onChange={(e) => this.inputChange(e, 'password2')} required placeholder="Repeat Password" />
          </Form.Group>
          <Button variant="primary" type="submit">Register</Button>
        </Form>
      </div>
    )
  }
}

Register.propType = {
  register: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
  updateAppState: PropTypes.func.isRequired
}

export default Register;
