import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Product from './shared/Product'
import { Container, Row, Col } from 'react-bootstrap'

class Products extends Component {
    render() {
        let productItems;
        if (this.props.products && this.props.products.length > 0 && typeof this.props.products !== 'string') {
            productItems = this.props.products.map((product, index) => {
                return <Col sm="4">
                    <Product
                        key={index}
                        product={product} />
                </Col>
            })
        } else {
            productItems = <div><i>No products added yet.</i></div>;
        }

        return (
            <div>
                <Container fluid>
                    <Row>
                        {productItems}
                    </Row>
                </Container>
            </div>
        );
    };
}

Products.propTypes = {
    products: PropTypes.array.isRequired
}

export default Products