import React, { Component } from 'react'

class NotFound extends Component {
  render () {
    return (
      <div>        
        <h1>404 Page not found</h1>
        <p>URL {this.props.match.url} is not present on the server</p>
      </div>
    );
  };
}

export default NotFound
