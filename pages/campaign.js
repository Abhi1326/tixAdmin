import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import cookie from 'cookie'
import CampaignContainer from '../components/crm-dashboard/campaign/campaignContainer'
import { Router } from '../routes'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import { getCampaign } from '../actions/campaignActions'
import { WINDOWLOCATION } from '../components/common/enviroment'
import { getuserfromcookie } from '../actions/authActions'

class CampaignProvider extends Component {

  static async getInitialProps (args) {

    const {req, res, query} = args

    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)
    if (process.env.DEBUG || (!isServer)) {

      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token

        await store.dispatch(getCampaign(contentHeaders))
      }
    }

    else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getCampaign(contentHeaders))

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


        <CampaignContainer
          headers={this.props.headers}
        />
      </Provider>


    )
  }
}

export default CampaignProvider

