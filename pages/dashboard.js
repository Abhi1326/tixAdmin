/**
 * Created by consultadd on 1/2/17.
 */

import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import DashboardContainer from '../components/admin-dashboard/dashboard/dashboardContainer'
import { getOrderSummary, getPaymentSummary, getReportSummary } from '../actions/dashboardActions'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import { getuserfromcookie } from '../actions/authActions'
import Router from 'next/router'
import { WINDOWLOCATION } from '../components/common/enviroment'


class DashboardProvider extends Component {
  static async getInitialProps (args) {
    const {req, res} = args
    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)

    if (process.env.DEBUG || (!isServer)) {
      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token

        store.dispatch(getOrderSummary(contentHeaders))
        store.dispatch(getReportSummary(contentHeaders))
        await store.dispatch(getPaymentSummary(contentHeaders))

      }
    } else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getOrderSummary(contentHeaders))
        await store.dispatch(getPaymentSummary(contentHeaders))
        await store.dispatch(getReportSummary(contentHeaders))
      }
    }
    let initialstate = store.getState()
    return {initialstate: initialstate, isServer, headers: contentHeaders}

  }

  constructor (props) {
    super(props)
    this.store = initStore(reducers, props.initialstate || {}, props.isServer || false)
    this.state = {
      paymentData: {},
      reportData: [],
      orderData: {}
    }

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


        <DashboardContainer paymentData={this.props.initialstate.dash.paymentData || {}}
                            reportData={this.props.initialstate.dash.reportData || []}
                            orderData={this.props.initialstate.dash.orderData || {}}
                            headers={this.props.headers}
        />

      </Provider>

    )
  }
}

export default DashboardProvider