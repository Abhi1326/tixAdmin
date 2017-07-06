/**
 * Created by consultadd on 25/1/17.
 */
import React, { Component } from 'react'
import { contentHeaders } from '../components/common/headers'
import MovieOrderContainer from '../components/cinema-dashboard/movie-order/movieOrderContainer'
import cookie from 'cookie'
import { getuserfromcookie } from '../actions/authActions'
import { getMovieOrder, getTheatreWiseReport } from '../actions/moveOrderActions'
import { Provider } from 'react-redux'
import { initStore } from '../store'
import reducers from '../reducers/index.js'
import Router from 'next/router'
import { WINDOWLOCATION } from '../components/common/enviroment'

let data = []

class MovieOrderProvider extends Component {
  static async getInitialProps (args) {
    const {req, res} = args
    let token
    const isServer = !!req
    const store = initStore(reducers, {}, isServer)

    if (process.env.DEBUG || (!isServer)) {

      if (typeof localStorage.getItem('key') !== 'undefined') {
        token = localStorage.getItem('key')
        contentHeaders['Authorization'] = 'token' + ' ' + token
        await store.dispatch(getMovieOrder(contentHeaders))
        await store.dispatch(getTheatreWiseReport(contentHeaders))

      }

    }
    else if (req) {
      token = cookie.parse(req.headers.cookie || '')
      if (typeof token.token !== 'undefined') {
        contentHeaders['Authorization'] = token.token
        await store.dispatch(getuserfromcookie(token))
        await store.dispatch(getTheatreWiseReport(contentHeaders))
        await store.dispatch(getMovieOrder(contentHeaders))
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

        <MovieOrderContainer movieOrder={this.props.initialstate.data.movieOrder || {}}
                             isFetching={this.props.initialstate.data.isFetching}
                             theatreReport={this.props.initialstate.data.theatreReport || []}

                             headers={this.props.headers}
        />

      </Provider>

    )
  }
}

export default MovieOrderProvider