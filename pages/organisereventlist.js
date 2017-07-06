import React, { Component } from 'react'
import { getEventByOrgId } from '../actions/eventDashboardActions'
import { contentHeaders } from '../components/common/headers'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import Router from 'next/router'
import cookie from 'cookie'
import OrganiserEventListContainer from '../components/event-dashboard/organiser-eventlist/organiserEventListConatiner'
import { getuserfromcookie } from '../actions/authActions'
import { WINDOWLOCATION } from '../components/common/enviroment'

class OrganiserEventListProvider extends Component {
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
        await store.dispatch(getEventByOrgId(contentHeaders, id))
      }
    } else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getEventByOrgId(contentHeaders, id))

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

        <OrganiserEventListContainer
          headers={this.props.headers}
          isFetching={this.props.initialstate.data.isFetching}
        />
      </Provider>
    )
  }
}

export default OrganiserEventListProvider