/**
 * Created by consultadd on 9/2/17.
 */
import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import BatchReportContainer from '../components/admin-dashboard/batch-report/batchReportContainer'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import Router from 'next/router'
import cookie from 'cookie'
import { getuserfromcookie } from '../actions/authActions'
import { getBatchReport } from '../actions/dashboardActions'
import { WINDOWLOCATION } from '../components/common/enviroment'

class BatchReportProvider extends Component {
  static async getInitialProps (args) {

    const {req, res, query} = args
    let parent_id = query.parentId
    let batch_name = query.batchName
    let type = query.type
    let status = query.status
    let params = {
      parent_id: parent_id,
      batch_name: batch_name,
    }
    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)
    if (process.env.DEBUG || (!isServer)) {
      if (typeof localStorage.getItem('key') !== 'undefined') {

        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token
        await store.dispatch(getBatchReport(type,status, params, contentHeaders))
      }
    } else {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getBatchReport(type,status, params, contentHeaders))

      }
    }
    let initialstate = store.getState()
    return {
      initialstate: initialstate,
      isServer,
      headers: contentHeaders,
      batch_name: batch_name,
      parent_id: parent_id,
      payment_status:status
    }

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

        <BatchReportContainer batchReport={this.props.initialstate.dash.batchReport || {}}
                              headers={this.props.headers}
                              parentId={this.props.parent_id}
                              batchName={this.props.batch_name}
                              payment_status={this.props.payment_status}

        />
      </Provider>

    )
  }

}

export default BatchReportProvider