import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import Categories from '../Categories'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import Details from '../Details'
import MyProfile from '../MyProfile'
import Favorites from '../Favorites'
import NotFound from '../NotFound'
import CreateProduct from '../CreateProduct'
import CreateCategory from '../CreateCategory'
import Logout from '../Logout'
import CategoryProducts from '../CategoryProduct'
import EditProduct from '../EditProduct'
import Locations from '../Locations'

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/categories' exact component={Categories} />
        <Route path='/favorites' exact component={Favorites} />
        <Route path='/locations' exact component={Locations} />
        <Route path='/login' render={props => <Login {...props} login={this.props.login} createNotification={this.props.createNotification} updateAppState={this.props.updateAppState} />} />
        <Route path='/myProfile' render={props => <MyProfile {...props} user={this.props.user} update={this.props.update}  createNotification={this.props.createNotification} />} />
        <Route path='/register' render={props => <Register {...props} register={this.props.register} createNotification={this.props.createNotification} updateAppState={this.props.updateAppState} />} />
        <Route path='/logout' render={props => <Logout {...props} logout={this.props.logout} createNotification={this.props.createNotification} />} />
        <Route path='/create/category' exact render={props => <CreateCategory {...props} createNotification={this.props.createNotification} />} />
        <Route path='/create/:categoryName' render={props => <CreateProduct {...props} createNotification={this.props.createNotification} />} />
        <Route path='/edit/:productId' render={props => <EditProduct {...props} createNotification={this.props.createNotification} />} />
        <Route path='/details/:productId' exact render={props => <Details {...props} update={this.props.update} createNotification={this.props.createNotification} />} />
        <Route path='/categories/:categoryName' component={CategoryProducts} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

AppRouter.propTypes = {
  user: PropTypes.object,
  createNotification: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  updateAppState: PropTypes.func.isRequired
}

export default AppRouter
