import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import { Router } from '../routes'
import CouponContainer from '../components/crm-dashboard/coupon/coupanContainer'
import { getuserfromcookie } from '../actions/authActions'
import { getCoupon } from '../actions/couponActions'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import { WINDOWLOCATION } from '../components/common/enviroment'

class Coupon extends Component {

  static async getInitialProps (args) {

    const {req, res} = args

    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)

    if (process.env.DEBUG || (!isServer)) {
      if (typeof localStorage.getItem('key') !== 'undefined') {
        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token

        await store.dispatch(getCoupon(contentHeaders))
      }

    } else if (req) {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getCoupon(contentHeaders))
      }

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


        <CouponContainer headers={this.props.headers}
        />

      </Provider>


    )
  }
}

export default Coupon

