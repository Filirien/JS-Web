import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  formSubmit = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user).then(res => {
      if (typeof res === 'object') {
        this.props.createNotification('success', 'Logged in')
        this.props.updateAppState()
        this.props.history.push('/')
      } else {
        this.props.createNotification('error', res)
      }
    });
  }

  render() {
    return (
      <div>
        <div className='App-body-title'><p>LOGIN</p></div>
        <Form className="registerForm" onSubmit={this.formSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' id='username' name='username' value={this.state.username} onChange={(e) => this.inputChange(e, 'username')} required placeholder="Username" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' id='password' name='password' value={this.state.password} onChange={(e) => this.inputChange(e, 'password')} required placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
        </Form>
      </div>
    )
  }
}

Login.propTypes = {
  createNotification: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  updateAppState: PropTypes.func.isRequired
}

export default Login