import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise } from './restActions'
import cookie from 'react-cookie'
import Router from 'next/router'
import { types } from './types'

export function login (user) {
  return dispatch => {
    let dataObj = {
      input_value: user.email,
      password: user.password
    }

    return post_promise(URLS.DASHBOARDLOGIN, dataObj).then(response => {

      dispatch({
        type: types.save_user,
        payload: response
      })
    }, error => {
      dispatch({
        type: types.invalid_user,
        payload: {statusText: error.response.data.error_desc || error.response}
      })
    })

  }
}
export function logout () {
  return dispatch => {

    return post_promise(URLS.AUTH_USER_LOGOUT, {}).then(response => {
      Router.push('/')
      dispatch({
        type: types.remove_user,
      })

      cookie.remove('token')
      cookie.remove('user_name', {path: '/'})
      cookie.remove('user_type', {path: '/'})
      cookie.remove('user_email', {path: '/'})
      cookie.remove('user_number', {path: '/'})
      cookie.remove('group', {path: '/'})
      localStorage.clear()

    })
  }
}
export function getuser (headers) {

  return dispatch => {
    let config = {
      headers: headers
    }

    return get_promise(URLS.AUTH_USER_DETAIL, config).then(response => {

    }, error_handler)
  }

}

export function getuserfromcookie (token) {

  return dispatch => {

    let key = token.token.split(' ')
    if (typeof token.group === 'undefined') {
      logout()
    }
    else {
      let payload = {
        key: key[1],
        group: JSON.parse(token.group) || [],
        phone: token.user_number,
        email: token.user_email,
        username: token.user_name
      }
      dispatch({
        type: types.save_user,
        payload: payload
      })

    }
  }

}
