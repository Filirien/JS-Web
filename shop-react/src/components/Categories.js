import React, { Component } from 'react'
import CategoryItem from './shared/CategoryItem'
import * as fetcher from '../fetcher/categories'

export default class Categories extends Component {
  constructor (props) {
    super(props)

    this.state = {
      categories: []
    }
  }

  componentDidMount () {
    fetcher.allCategories().then(categories => {
      this.setState({ categories });
    });
  }

  render () {
    const categoriesComponents = this.state.categories.map((item, index) => {
      return (
        <CategoryItem
          key={index}
          name={item.name}
          to={item.name}
        />
      );
    });

    return (
      <div>
        <div className="App-title"><p>CATEGORIES</p></div>
        {categoriesComponents}
      </div>
    )
  }
}