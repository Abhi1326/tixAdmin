import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import { getOrdersByEvent } from '../actions/eventDashboardActions'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import { getuserfromcookie } from '../actions/authActions'
import Router from 'next/router'
import { WINDOWLOCATION } from '../components/common/enviroment'
import EventDashOrderListContainer from '../components/event-dashboard/event-orderlist/eventDashOrderLIstContainer'

class EventDashOrderListProvider extends Component {
  static async getInitialProps (args) {
    const {req, res, query} = args
    let token
    let id = query.id
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)

    if (process.env.DEBUG || (!isServer)) {
      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token

        await  store.dispatch(getOrdersByEvent(contentHeaders, id))

      }
    } else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getOrdersByEvent(contentHeaders, id))
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
        <EventDashOrderListContainer headers={this.props.headers}/>
      </Provider>

    )
  }
}

export default EventDashOrderListProvider