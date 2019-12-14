import React, { Component } from 'react'
import Products from './Products'

import * as products from '../fetcher/products'
class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newProducts: []
    };
  }

  componentDidMount () {
    products.getNewProducts().then(newProducts => {
      this.setState({ newProducts });
    });
  }

  render () {
    return (
      <div>
        {/* <h1 class="ribbon">
          <strong class="ribbon-content">Welcome to our new proposals</strong>
        </h1> */}
        <h1 className="App-title">Welcome to our new proposals</h1>
        <Products
          products={this.state.newProducts}
        />
      </div>
    );
  };
}

export default Home;