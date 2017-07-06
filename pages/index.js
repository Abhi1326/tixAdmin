import React from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import Login from '../components/common/Login'
import reducers from '../reducers/index.js'
import { contentHeaders } from '../components/common/headers'
import { WINDOWLOCATION } from '../components/common/enviroment'
import { getuserfromcookie } from '../actions/authActions'
import cookie from 'cookie'

export default class extends React.Component {

  static async getInitialProps (args) {
    const {req, res} = args

    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)

    if (process.env.DEBUG || (!isServer)) {

      if (typeof localStorage.getItem('key') !== 'undefined') {

      }

    }
    else if (req) {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
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

  }

  render () {
    return (
      <Provider store={this.store}>
        <Login user={this.props.initialstate.auth.user}
               isServer={this.props.isServer}/>
      </Provider>

    )
  }
}
