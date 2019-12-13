import React, { Component } from 'react'
import { NotificationManager, NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import AppRouter from './components/router/AppRouter'
import * as users from './fetcher/users'

import logo from './images/logo.png'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: localStorage.getItem('user'),
      isLogged: localStorage.getItem('user') ? true : false
    }
  }

  createNotification = (type, message) => {
    switch (type) {
      case 'info':
        NotificationManager.info(message, '', 3000);
        break;
      case 'success':
        NotificationManager.success(message, '', 3000);
        break;
      case 'warning':
        NotificationManager.warning(message, '', 3000);
        break;
      default:
        NotificationManager.error(message, '', 3000);
        break;
    }
  }

  updateAppState = () => {
    this.checkLogged()
  }

  login = user => {
    return users.login(user)
  }

  register = user => {
    return users.register(user)
  }

  logout = () => {
    users.logout()
    this.checkLogged()
  }

  update = user => {
    users.update(user)
  }

  checkLogged = () => {
    let user = localStorage.getItem('user')
    this.setState({
      user,
      isLogged: user ? true : false
    })
  }

  componentDidMount() {
    this.checkLogged()
  }

  render() {
    return (
      <div>
        <Header
          logo={logo}
          logout={this.logout}
          isLogged={this.state.isLogged}
        />
        <NotificationContainer />
        <div className='App-intro'>
          <div className='App-content'>
            <AppRouter
              createNotification={this.createNotification}
              user={JSON.parse(this.state.user)}
              login={this.login}
              register={this.register}
              logout={this.logout}
              update={this.update}
              isLogged={this.state.isLogged}
              updateAppState={this.updateAppState}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
