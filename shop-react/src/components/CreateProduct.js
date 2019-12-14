import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

import * as products from '../fetcher/products'

class CreateProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      price: '',
      imgUrl: '',
      description: '',
      additionalInformation: ''
    }
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  onSubmit = e => {
    e.preventDefault();
    let additionalInformation = [];

    if (typeof this.state.additionalInformation === 'string' && this.state.additionalInformation.length > 0) {
      additionalInformation = this.state.additionalInformation.split(',').map(item => item.trim());
    }

    let product = {
      name: this.state.name,
      price: this.state.price,
      img: this.state.imgUrl,
      description: this.state.description,
      additionalInformation: additionalInformation,
      categoryName: this.props.match.params.categoryName,
    };

    let isValid = this.validateProduct(product);
    if (isValid)
      return;

    products.create(product).then(() => {
      this.props.createNotification('success', 'Product created');
      this.props.history.goBack();
    })
  }

  validateProduct(product) {
    if (product.name.length < 3) {
      this.props.createNotification('error', 'Name must be at least 3 symbols long');
      return true;
    }
    if (product.description.length < 10) {
      this.props.createNotification('error', 'Description must be at least 10 symbols long');
      return true;
    }
  }

  render() {
    return (
      <div>
        <Form className="registerForm" onSubmit={this.onSubmit}>
          <div className="App-title">Create new product</div>
          <br/>
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control value={this.state.name} onChange={e => this.inputChange(e, 'name')} required  placeholder="Name of product" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price*</Form.Label>
              <Form.Control type='number' value={this.state.price} onChange={e => this.inputChange(e, 'price')} required placeholder="00.00$" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image Url*</Form.Label>
            <Form.Control type='url' value={this.state.imgUrl} onChange={e => this.inputChange(e, 'imgUrl')} required placeholder="example.com/image.jpg" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description*</Form.Label>
            <Form.Control value={this.state.description} onChange={e => this.inputChange(e, 'description')} required placeholder="Describe the product" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional information</Form.Label>
            <Form.Control value={this.state.additionalInformation} onChange={e => this.inputChange(e, 'additionalInformation')} placeholder="Additional information" />
          </Form.Group>
          <Button variant="success" style={{ position:'relative', left:'45%', marginBottom:'12.5%'}} type="submit">Create product</Button>
        </Form>
      </div>
    )
  }
}

CreateProduct.propTypes = {
  createNotification: PropTypes.func.isRequired
}

export default CreateProduct
