import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise } from './restActions'
import { getDateRange } from '../components/common/utils'
import { types } from './types'

export function getFilters (query, headers) {

  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETALLFILTERS + query, config).then(response => {
      if (query.includes('type=movie')) {
        dispatch({
          type: types.fetch_all_movie,
          payload: response
        })

      }
      else if (query.includes('type=theatre')) {
        dispatch({
          type: types.fetch_all_theatre,
          payload: response
        })
      }
      else if (query.includes('type=city')) {
        dispatch({
          type: types.fetch_all_city,
          payload: response
        })
      }
      else if (query.includes('type=account')) {
        dispatch({
          type: types.fetch_all_accounts,
          payload: response
        })
      }

    }, error_handler)

  }
}

export function getMovieOrder (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETMOVIEORDERSUMMARY, config).then(response => {

      dispatch({
        type: types.fetch_movie_order,
        payload: response
      })
      dispatch({
        type: types.valid_user,
      })

    }, error_handler)

  }
}
export function getMovieOrderDetail (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let dateRange = getDateRange()
    return post_promise(URLS.GETMOVIEORDER + '?' + dateRange, {}, config).then(response => {

      dispatch({
        type: types.fetch_movie_order_detail,
        payload: response
      })
      dispatch({
        type: types.valid_user,
      })

    }, error_handler)

  }
}

export function getPaymentStatus (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    return get_promise(URLS.GETPAYMENTSTATUS, config).then(response => {

      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_payment_status,
        payload: response
      })

    }, error_handler)

  }
}

export function getTheatreWiseReport (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let theatre_limit = '?limit_to=5'
    let dateRange = getDateRange()
    return post_promise(URLS.GETTHEATREWISEREPORT + theatre_limit + '&' + dateRange, {}, config).then(response => {

      dispatch({
        type: types.fetch_theatre_wise_report,
        payload: response
      })

    }, error_handler)

  }
}
export function getFullTheatreReport (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let dateRange = getDateRange()

    return post_promise(URLS.GETTHEATREWISEREPORT + '?' + dateRange, {}, config).then(response => {

      dispatch({
        type: types.fetch_full_theatre_report,
        payload: response
      })

      dispatch({
        type: types.valid_user,
      })

    }, error_handler)

  }
}

export function movieOrderList (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return post_promise(URLS.GETMOVIEORDER + query, {}, config).then(response => {

      dispatch({
        type: types.fetch_movie_order_detail,
        payload: response
      })

    }, error_handler)

  }
}
export function paidReportDetail (batch_name, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }
    let batchName = {
      batch_name: batch_name
    }

    return post_promise(URLS.GETPAIDREPORTDETAIL, batchName, config).then(response => {

      dispatch({
        type: types.fetch_paid_detail,
        payload: response
      })

    }, error_handler)

  }
}
export function getFilteredTheatresReport (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return post_promise(URLS.GETTHEATREWISEREPORT + query, {}, config).then(response => {
      dispatch({
        type: types.fetch_theatre_wise_filtered_report,
        payload: response
      })

    }, error_handler)

  }
}
export function getPaymentHistory (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true

    })
    let config = {
      headers: headers
    }
    return get_promise(URLS.GETPAYMENTSTATUS + query, config).then(response => {

      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_payment_status,
        payload: response
      })

    }, error_handler)

  }
}

export function getPaymentFilter (status, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })

    let config = {
      headers: headers
    }
    return get_promise(URLS.GETPAYMENTSTATUS + status, config).then(response => {

      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_payment_status,
        payload: response
      })

    }, error_handler)

  }
}
export function getPaymentByType (type, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })

    let config = {
      headers: headers
    }
    return get_promise(URLS.GETPAYMENTSTATUS + type, config).then(response => {

      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_payment_status,
        payload: response
      })

    }, error_handler)

  }
}
export function getPageData (query, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    return get_promise(URLS.GETPAYMENTSTATUS + query, config).then(response => {

      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_payment_status,
        payload: response
      })

    }, error_handler)

  }
}






