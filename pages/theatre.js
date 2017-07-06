/**
 * Created by consultadd on 15/2/17.
 */
import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import TheatreContainer from '../components/crm-dashboard/theatres/theatreContainer'
import { Router } from '../routes'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import { getTheatre } from '../actions/theatreActions'
import { getuserfromcookie } from '../actions/authActions'
import { WINDOWLOCATION } from '../components/common/enviroment'

class TheatreProvider extends Component {

  static async getInitialProps (args) {

    const {req, res, query} = args

    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)
    if (process.env.DEBUG || (!isServer)) {

      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token

        await  store.dispatch(getTheatre(contentHeaders))
      }
    }

    else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getTheatre(contentHeaders))

      }
    }
    let initialstate = store.getState()
    return {initialstate: initialstate, isServer, headers: contentHeaders}

  }

  constructor (props) {
    super(props)
    this.store = initStore(reducers, props.initialstate || {}, props.isServer || false)

  }

  componentDidMount () {
    if (this.props.isServer) {

      if (this.props.initialstate.auth.isAuthenticated) {

      }
      else {
        Router.push('/')
      }
    }
  }

  render () {

    return (
      <Provider store={this.store}>


        <TheatreContainer
          headers={this.props.headers}
        />
      </Provider>


    )
  }
}

export default TheatreProvider

