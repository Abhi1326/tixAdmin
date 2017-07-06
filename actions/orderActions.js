import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise } from './restActions'
import { types } from './types'

export function getAllMovieOrder (headers) {
  return dispatch => {
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETALLMOVIEORDER, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_all_order,
        payload: response
      })

    }, error_handler)

  }
}
export function getEventOrder (headers) {
  return dispatch => {
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETEVENTORDER, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_event_order,
        payload: response
      })

    }, error_handler)

  }
}

export function getFilteredOrder (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETALLMOVIEORDER + query, config).then(response => {

      dispatch({
        type: types.fetch_all_order,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}

export function getFilteredEventOrder (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETEVENTORDER + query, config).then(response => {

      dispatch({
        type: types.fetch_all_order,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })
    }, error_handler)

  }
}



export function getFilteredDateTimeEventList (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {event_id: val}

    return post_promise(URLS.GETEVENTDATETIME, data, config).then(response => {
      dispatch({
        type: types.fetch_all_eventorder_date_time,
        payload: response
      })
    }, error_handler)
  }
}

export function OrderFiltertheatre (theatre, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    return get_promise(URLS.GETFILTERTHEATRE + theatre, config).then(response => {

      dispatch({
        type: types.fetch_filtered_theatre,
        payload: response
      })

    }, error_handler)
  }
}

export function OrderFilterEvent (event, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    return get_promise(URLS.GETFILTEREVENT + event, config).then(response => {

      dispatch({
        type: types.fetch_filtered_event,
        payload: response
      })

    }, error_handler)
  }
}

export function getCancelData (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {order_id: val}

    return post_promise(URLS.GETCANCELBUTTON + val, data, config).then(response => {
      if (response) {
        return response
      }
      else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getResendData (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {order_id: val}

    return post_promise(URLS.GETRESENDBUTTON + val, data, config).then(response => {

      if (response) {
        return response
      }
      else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getRefundData (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {order_id: val}

    return post_promise(URLS.GETREFUNDBUTTON + val, data, config).then(response => {
      if (response) {
        return response
      } else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getEventResendData (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {order_id: val}

    return post_promise(URLS.GETEVENTRESENDBUTTON + val, data, config).then(response => {

      if (response) {
        return response
      }
      else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getEventCancelData (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {order_id: val}

    return post_promise(URLS.GETEVENTCANCELBUTTON + val, data, config).then(response => {

      if (response) {
        return response
      } else {
        return 'error'
      }

    }, error_handler)
  }
}
export function getEventRefundData (val, headers) {

  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {order_id: val}

    return post_promise(URLS.GETEVENTREFUNDBUTTON + val, data, config).then(response => {

      if (response) {
        return response
      }
      else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getAllMovieOrderDetail (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let obj = {
      order_id: val

    }

    return post_promise(URLS.GETORDERBYID + val, obj, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_order_detail,
        payload: response
      })

    }, error_handler)
  }
}

export function getAllEventOrderDetail (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let obj = {
      order_id: val

    }

    return post_promise(URLS.GETORDERBYEVENTID + val, obj, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_order_detail,
        payload: response
      })

    }, error_handler)
  }
}

export function clearDateTimeEventList(){
  return dispatch => {
    dispatch({
      type: types.clear_dateTime_list_event_order,

    })

  }
}


