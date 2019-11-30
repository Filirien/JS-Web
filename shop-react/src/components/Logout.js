import { Component } from 'react'
import PropTypes from 'prop-types'

class Logout extends Component {
  componentWillMount () {
    this.props.logout();
    this.props.createNotification('info', 'Logged out');
    this.props.history.push('/');
  }

  render () {
    return null;
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
}

export default Logout;
