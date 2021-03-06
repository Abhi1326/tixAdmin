/**
 * Created by consultadd on 14/3/17.
 */

import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import { Provider } from 'react-redux'
import { getuserfromcookie } from '../actions/authActions'
import { getEventOrder } from '../actions/orderActions'
import EventOrderContainer from '../components/crm-dashboard/event-orderlist/eventorderContainer'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import Router from 'next/router'
import { WINDOWLOCATION } from '../components/common/enviroment'

let data = []
let totalPage = 1

export default class EventOrder extends Component {

  static async getInitialProps (args) {
    const {req, res} = args

    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)

    if (process.env.DEBUG || (!isServer)) {

      if (typeof localStorage.getItem('key') !== 'undefined') {
        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token

        await store.dispatch(getEventOrder(contentHeaders))
      }
      else {
        Router.push('/')
      }

    }
    else {
      token = cookie.parse(req.headers.cookie || '')
      contentHeaders['Authorization'] = token.token
      await store.dispatch(getuserfromcookie(token))
      await store.dispatch(getEventOrder(contentHeaders))

    }
    let initialstate = store.getState()
    return {initialstate: initialstate, isServer, headers: contentHeaders}

  }

  constructor (props) {
    super(props)

    this.store = initStore(reducers, props.initialstate || {}, props.isServer || false)
  }

  componentWillMount () {

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


        <EventOrderContainer orderPage={this.props.initialstate.order.orderPage || 0}
                             orders={this.props.initialstate.order.orders || []}
                             isFetching={this.props.initialstate.data.isFetching}
                             headers={this.props.headers}
        />

      </Provider>

    )
  }
}

