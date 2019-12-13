import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

class MyProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.user.name,
      email: this.props.user.email,
      imgUrl: this.props.user.imgUrl
    };
  }

  editClick = () => {
    if (this.state.isEditing) {
      let user = JSON.parse(localStorage.getItem('user'));
      user.imgUrl = this.state.imgUrl;
      user.name = this.state.name;
      user.email = this.state.email;
      let toReturn = this.validateUserData(user);
      if (toReturn)
        return;
      localStorage.setItem('user', JSON.stringify(user));
      this.props.createNotification('info', 'Profile updated');
      this.props.update(user);
    }
    this.setState({ isEditing: !this.state.isEditing });
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  validateUserData(user) {
    if (user.name.length < 4) {
      this.props.createNotification('error', 'Name must be at least 3 symbols long');
      return true;
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.isEditing ?
            <div>
              <Form className="registerForm" onSubmit={this.editClick}>
                <div className='App-title'><p>MY PROFILE</p></div>
                <Form.Group>
                  <Form.Label>Username*</Form.Label>
                  <Form.Control type='text' value={this.props.user.username} disabled />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name*</Form.Label>
                  <Form.Control type='text' value={this.state.name} onChange={(e) => this.inputChange(e, 'name')} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price*</Form.Label>
                  <Form.Control type='text' value={this.state.email} onChange={(e) => this.inputChange(e, 'email')} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image Url*</Form.Label>
                  <Form.Control type='url' value={this.state.imgUrl} onChange={(e) => this.inputChange(e, 'imgUrl')} required />
                </Form.Group>
                <Button variant="primary" type="submit">Save</Button>
              </Form>
            </div>
            :
            <div>
              <div className='App-title'><p>MY PROFILE</p></div>
              <p>{'Username: ' + this.props.user.username}</p>
              <p>{'Name: ' + this.state.name}</p>
              <p>{'Email: ' + this.state.email}</p>
              <button className='App-profile-btn' onClick={this.editClick}>Edit</button>
            </div>
          }
        </div>
        <div className='App-details-img-container'>
          <img className='App-details-img' src={this.state.imgUrl ||
            './imgages/default-profile-picture.jpg'} alt={'Profile'} />
        </div>
      </div>
    )
  }
}

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default MyProfile;
