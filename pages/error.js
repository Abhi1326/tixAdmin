/**
 * Created by consultadd on 2/3/17.
 */
import React, { Component } from 'react'
import { Router } from '../routes'
import ErrorContainer from '../components/common/404_container'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'

class Error extends Component {
  static async getInitialProps (args) {

    const {req, res, query} = args
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)
    let token
    let statusText = null, statusCode = null
    let initialstate = store.getState()

    if ((typeof window !== 'undefined') && (!initialstate.auth.isServer)) {
      statusText = localStorage.getItem('statusText')
      statusCode = localStorage.getItem('statusCode')
    }
    else if (initialstate.auth.isServer) {
      statusText = initialstate.auth.statusText
      statusCode = initialstate.auth.statusCode
    }

    return {statusText, statusCode}

  }

  constructor (props) {
    super(props)
    this.store = initStore(reducers, {}, props.isServer || false)
  }

  componentDidMount () {

  }

  render () {

    return (

      <Provider store={this.store}>
        <ErrorContainer
          statusText={this.props.statusText}
          statusCode={this.props.statusCode}
        />
      </Provider>



    )
  }
}

export default Error