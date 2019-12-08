import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

class Product extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Link href={'/details/' + this.props.product._id}> <img className="App-img-product" variant="top" src={this.props.product.img}/></Card.Link>
          <Card.Body>
            <Card.Title>{this.props.product.name}</Card.Title>
            <Card.Text>{this.props.product.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </div>
    );
  };
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product