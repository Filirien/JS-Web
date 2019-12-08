import React, { Component } from 'react'
import Products from './Products'

import * as fetcher from '../fetcher/products'
import { Button } from 'react-bootstrap'

class CategoryProducts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      products: []
    };
  }

  componentDidMount () {
    let categoryName = this.props.match.params.categoryName;
    fetcher.getProductsByCategoryName(categoryName).then(products => {
      this.setState({ products })
    })
  }

  render () {
    let user = localStorage.getItem('user');
    let to = '/create/' + this.props.match.params.categoryName;
    let addProductBtn = user ? <Button href={to} size="lg">Add product</Button> : '';
    let title = this.props.title || this.props.match.params.categoryName.toUpperCase();
    return (
      <div>
        <div>
          <p>
            {title}
          </p>
          {addProductBtn}
          <br/><br/>
        </div>
          <Products
            products={this.state.products}
          />
      </div>
    )
  }
}

export default CategoryProducts