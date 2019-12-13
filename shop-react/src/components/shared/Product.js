import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

class Product extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Link href={'/details/' + this.props.product._id}> <img variant="top" src={this.props.product.img} style={{width:'100%',height:'100%'}} alt=""/></Card.Link>
          <Card.Body>
            <Card.Title>{this.props.product.name}</Card.Title>
            <Card.Title>Price: {this.props.product.price}$</Card.Title>
            <Card.Text>{this.props.product.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <br/>
      </div>
    );
  };
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}

export default Product