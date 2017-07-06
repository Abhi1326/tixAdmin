import axios from 'axios'
import Router from 'next/router'
import  {types}    from '../actions/types'

export function get_promise (url, config) {
  return axios.get(url, config)
    .then(checkHttpStatus)
    .then(parseJSON)

}

export function post_promise (url, data = {}, config) {
  return axios.post(url, data, config)
    .then(checkHttpStatus)
    .then(parseJSON)

}

export function put_promise (url, data = {}, config) {
  return axios.put(url, data, config)
    .then(checkHttpStatus)
    .then(parseJSON)

}

export function error_handler (error) {
  if (typeof window === 'undefined') {
    if (error.response.status === 401) {
      return (dispatch) => {
        dispatch({
          type: types.invalid_user,
          payload: {
            statusText: 'UnAuthorised',
            statusCode: error.response.status,
            isServer: true
          }

        })
      }
    }
    else if (error.response.status < 500) {
      return (dispatch) => {
        dispatch({
          type:types.invalid_user,
          payload: {
            statusText: 'Oops Something Went Wrong',
            statusCode: error.response.status,
            isServer: true
          }

        })
      }
    }

    else if (error.response.status >= 500) {
      return (dispatch) => {
        dispatch({
          type:types.invalid_user,
          payload: {
            statusText: 'Oops Something Went Wrong',
            statusCode: error.response.status,
            isServer: true
          }

        })
      }
    }
  }
  else {
    return (dispatch) => {
      dispatch({
        type:types.is_fetching,
        payload:false
      })
      if (error.response.status === 401) {

        localStorage.setItem('statusText', 'UnAuthorised');
        localStorage.setItem('statusCode', error.response.status);
        Router.push('/error')

      }
      else if (error.response.status < 500) {
        localStorage.setItem('statusText', 'Ooops Something Went Wrong');
        localStorage.setItem('statusCode', error.response.status);
        Router.push('/error')
      }

      else if (error.response.status >= 500) {
        localStorage.setItem('statusText', 'Server Error')
        localStorage.setItem('statusCode', error.response.status)
        Router.push('/error')
      }
    }

  }
}
function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

}

function parseJSON (response) {

  return response.data
}
