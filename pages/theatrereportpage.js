/**
 * Created by consultadd on 9/2/17.
 */
import React, { Component } from 'react'
import { getFullTheatreReport } from '../actions/moveOrderActions'
import { contentHeaders } from '../components/common/headers'
import TheatreReportContainer from '../components/cinema-dashboard/theatre-wise-report/theatreReportContainer'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import Router from 'next/router'
import cookie from 'cookie'
import { getuserfromcookie } from '../actions/authActions'
import { WINDOWLOCATION } from '../components/common/enviroment'

class TheatreReportProvider extends Component {
  static async getInitialProps (args) {

    const {req, res} = args
    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)
    if (process.env.DEBUG || (!isServer)) {
      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token
        await store.dispatch(getFullTheatreReport(contentHeaders))
      }
    } else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getFullTheatreReport(contentHeaders))

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

        <TheatreReportContainer fullTheatreReport={this.props.initialstate.data.fullTheatreReport | {}}
                                headers={this.props.headers}
                                isFetching={this.props.initialstate.data.isFetching}
        />
      </Provider>
    )
  }
}

export default TheatreReportProvider