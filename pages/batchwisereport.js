/**
 * Created by consultadd on 9/2/17.
 */
import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import BadgeWiseReportContainer from '../components/admin-dashboard/batch-wise-report/badgeWiseReportContainer'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import Router from 'next/router'
import cookie from 'cookie'
import { getuserfromcookie } from '../actions/authActions'
import { getBadgeWiseReport } from '../actions/dashboardActions'
import { WINDOWLOCATION } from '../components/common/enviroment'

class BadgeReportProvider extends Component {
  static async getInitialProps (args) {

    const {req, res, query} = args
    let id = query.id
    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)
    let type = 'ticket'
    if (process.env.DEBUG || (!isServer)) {
      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token
        await store.dispatch(getBadgeWiseReport(id, type, contentHeaders))
      }
    }
    else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getBadgeWiseReport(id, type, contentHeaders))

      }
    }
    let initialstate = store.getState()
    return {initialstate: initialstate, isServer, headers: contentHeaders, parent_id: id, type: type}

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

        <BadgeWiseReportContainer badgeReport={this.props.initialstate.dash.badgeReport || {}}
                                  headers={this.props.headers}
                                  parentId={this.props.parent_id}
                                  type={this.props.type}
        />
      </Provider>

    )
  }

}

export default BadgeReportProvider