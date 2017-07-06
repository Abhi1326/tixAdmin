/**
 * Created by consultadd on 21/2/17.
 */

import { URLS } from '../components/common/url-constants'
import { check_error, error_handler, get_promise, post_promise } from './restActions'
import { types } from './types'

export function getPaymentSummary (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETPAYMENTSUMMARY, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_payment_summary,
        payload: response
      })

    }, error => {
      if (error.response.status === 403 || error.response.status === 401) {
        error_handler(error)
      }
      else {
        dispatch({
          type: types.fetch_payment_summary,
          payload: {}
        })
      }

    })

  }
}
export function getOrderSummary (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    get_promise(URLS.GETMOVIEORDERSUMMARY,config).then(response => {
      dispatch({
        type: types.fetch_order_summary,
        payload: response
      })

    }, error_handler)

  }
}

export function getReportSummary (headers) {
  return dispatch => {
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETREPORTSUMMARY, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_report_summary,
        payload: response
      })

    }, error_handler)

  }
}
export function getDetailReport (obj) {
  return dispatch => {
    let config = {
      headers: obj.headers
    }

    return post_promise(obj.url, obj.data, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_detail_report,
        payload: response
      })

    }, error_handler)

  }
}
export function getBadgeWiseReport (id, type, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    let parentId = {
      parent_id: id
    }
    let report_type = '?report_type=' + type

    return post_promise(URLS.GETBADGEWISEREPORT + report_type, parentId, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_badge_report,
        payload: response
      })

    }, error => {
      if (error.response.status === 403 || error.response.status === 401) {
        error_handler(error)
      }
      else {
        dispatch({
          type: types.fetch_badge_report,
          payload: {}
        })
      }
    })

  }
}
export function getBatchReport (type,status ,params, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    let rtype = '?report_type=' + type
    let payment_status = '&payment_status=' + status

    return post_promise(URLS.GETDETAILBADGEREPORT + rtype+payment_status, params, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_batch_report,
        payload: response
      })

    }, error => {
      if (error.response.status === 403 || error.response.status === 401) {
        error_handler(error)
      }
      else {
        dispatch({
          type: types.fetch_batch_report,
          payload: {}
        })
      }
    })

  }
}
export function filterByType (params, type, status, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    let report_type = '?report_type=' + type

    return post_promise(URLS.GETBADGEWISEREPORT + report_type + status, params, config).then(response => {
      dispatch({
        type: types.fetch_filter_batch_report,
        payload: response
      })

    }, error_handler)

  }
}
export function filterByStatus (params, AmountType, status, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }
    let report_type = '?report_type=' + AmountType
    return post_promise(URLS.GETBADGEWISEREPORT + report_type + status, params, config).then(response => {
      dispatch({
        type: types.fetch_filter_batch_report,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}

export function getPayment (params, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    delete config.headers['Content-Type']

    return post_promise(URLS.GETUPLOADFILE, params, config).then(response => {
      dispatch({
        type: types.payment_response,
        payload: response
      })

    }, error_handler)

  }
}
export function getPagedData (query, id, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }

    return post_promise(URLS.GETBADGEWISEREPORT + query, id, config).then(response => {
      dispatch({
        type: types.fetch_badge_report,
        payload: response
      })

    }, error_handler)

  }
}
export function getPagedBatchReport (query, params, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }

    return post_promise(URLS.GETDETAILBADGEREPORT + query, params, config).then(response => {
      dispatch({
        type: types.fetch_batch_report,
        payload: response
      })

    }, error_handler)

  }
}

export function mark_individual_as_paid (obj, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }

    return post_promise(URLS.GETMARKINDIVIDUALASPAID, obj, config).then(response => {
      dispatch({
        type: types.payment_response,
        payload: response
      })

      dispatch({
        type: types.fetch_mark_individual_as_paid,
        payload: obj.report_id
      })

    }, error_handler)

  }
}

