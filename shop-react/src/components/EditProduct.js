import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

import * as products from '../fetcher/products'

class EditProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: {},
      name: '',
      price: '',
      img: '',
      description: '',
      additionalInformation: ''
    }
  }

  inputChange = (e, key) => {
    let product = this.state.product;
    product[key] = e.target.value;
    this.setState(product);
  }

  onSubmit = e => {
    e.preventDefault();
    let additionalInformation = [];

    if (typeof this.state.additionalInformation === 'string' && this.state.additionalInformation.length > 0) {
      additionalInformation = this.state.additionalInformation.split(',').map(item => item.trim());
    }

    let product = this.state.product;
    product.additionalInformation = additionalInformation;
    let toReturn = this.validateProduct(product);

    if (toReturn)
      return;

    products.update(product).then(() => {
      this.props.createNotification('info', 'Product updated');
      this.props.history.goBack();
    })
  }

  componentDidMount() {
    let id = this.props.match.params.productId;

    products.getProductById(id).then(product => {
      let additionalInformation = product.additionalInformation.join(', ');
      this.setState({
        product,
        additionalInformation,
        name: product.name,
        price: product.price,
        img: product.img,
        description: product.description
      });
    });
  }

  validateProduct(product) {
    if (product.name.length < 3) {
      this.props.createNotification('error', 'Name must be at least 3 symbols long');
      return true;
    }
    if (product.description.length < 15) {
      this.props.createNotification('error', 'Description must be at least 15 symbols long');
      return true;
    }
  }

  render() {
    return (
      <div>
        <Form className="registerForm" onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control value={this.state.name} onChange={e => this.inputChange(e, 'name')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price*</Form.Label>
            <Form.Control type='number' value={this.state.price} onChange={e => this.inputChange(e, 'price')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image Url*</Form.Label>
            <Form.Control type='url' value={this.state.img} onChange={e => this.inputChange(e, 'img')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description*</Form.Label>
            <Form.Control value={this.state.description} onChange={e => this.inputChange(e, 'description')} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional information</Form.Label>
            <Form.Control value={this.state.additionalInformation} onChange={e => this.inputChange(e, 'additionalInformation')} />
          </Form.Group>
          <Button variant="success" style={{ position:'relative', left:'45%', marginBottom:'16.5%'}} type="submit">Edit product</Button>
        </Form>
      </div>
    )
  }
}

EditProduct.propTypes = {
  createNotification: PropTypes.func.isRequired
}

export default EditProduct
