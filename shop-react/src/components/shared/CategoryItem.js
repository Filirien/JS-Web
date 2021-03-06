import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class CategoryItem extends Component {
  render () {
    return (
      <Link className='App-category-item' to={'/categories/' + this.props.to}>
        <p className="App-category-item-title">{this.props.name}</p>
      </Link>
    );
  };
}

CategoryItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default CategoryItem;
