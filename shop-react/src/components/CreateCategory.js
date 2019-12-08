import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

import * as categories from '../fetcher/categories'

class CreateCategory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    };
  }

  onSubmit = e => {
    e.preventDefault()
    let category = {
      name: this.state.name
    };

    if (category.name.length < 4) {
      this.props.createNotification('Error', 'Category name must be at least 4 symbols long');
      return;
    }
    
    categories.create(category).then(res => {
      if (res.code) {
        this.props.createNotification('Error', 'Category already exists');
        return;
      }
      this.props.createNotification('success', 'Category created');
      this.props.history.push('/categories');
    })
  }

  inputChange = (e, key) => {
    let state = this.state;
    state[key] = e.target.value;
    this.setState(state);
  }

  render () {
    return (
      <div>
        <div>CREATE CATEGORY</div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control value={this.state.name} onChange={e => this.inputChange(e, 'name')} required  placeholder="Name of category" />
          </Form.Group>        
          <Button variant="primary" type="submit">Create category</Button>
        </Form>
      </div>
    )
  }
}

CreateCategory.propTypes = {
  createNotification: PropTypes.func.isRequired
}

export default CreateCategory