/**
 * Created by consultadd on 14/3/17.
 */
import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import EventOrderDetailContainer from '../components/crm-dashboard/event-orderlist/eventorderDetailContainer'
import { Router } from '../routes'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import { getAllEventOrderDetail } from '../actions/orderActions'
import { WINDOWLOCATION } from '../components/common/enviroment'
import { getuserfromcookie } from '../actions/authActions'

class OrderDetailProvider extends Component {

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
        await  store.dispatch(getAllEventOrderDetail(id, contentHeaders))
      }
    }

    else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getAllEventOrderDetail(id, contentHeaders))
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


        <EventOrderDetailContainer
          headers={this.props.headers}
        />
      </Provider>


    )
  }
}

export default OrderDetailProvider

