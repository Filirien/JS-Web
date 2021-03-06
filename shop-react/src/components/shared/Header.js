import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css'

class Header extends Component {
    render() {
        let user = localStorage.getItem('user');
        let isAdmin = user !== null && JSON.parse(user).roles[0] === 'Admin';
        let addCategory = isAdmin ? <Nav.Link href='/create/category'> Add category</Nav.Link> : '';
        let links = this.props.isLogged
            ?
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {addCategory}
                <Nav.Link href="/categories">Categories</Nav.Link>
                <Nav.Link href="/favorites">Favorites</Nav.Link>
                <Nav.Link href="/myProfile">My profile</Nav.Link>
                <Nav.Link href="/locations">Locations</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
            :
            <Nav className="mr-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/locations">Locations</Nav.Link>
            </Nav>;

        return (
            <div className="fixed-header">
                <div className="container-fluid">
                    <Navbar>
                        <Navbar.Brand href="/"><img src={this.props.logo} className="App-logo" alt="" /></Navbar.Brand>
                        {links}
                    </Navbar>
                </div>
            </div >
        );
    }
}

Header.propTypes = {
    logo: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired
};

export default Header;