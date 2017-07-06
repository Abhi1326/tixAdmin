import { URLS } from '../components/common/url-constants'
import { post_promise, get_promise, error_handler } from './restActions'
import { types } from './types'

export function getTransaction (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETTRANSACTIONS, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_transactions,
        payload: response
      })

    }, error_handler)

  }
}
export function getFilteredTransactions (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }
    if (query !== '') {
      return get_promise(URLS.GETTRANSACTIONS + 'by_order_id/' + query, config).then(response => {

        dispatch({
          type: types.fetch_transactions_by_order_id,
          payload: response
        })
        dispatch({
          type: types.is_fetching,
          payload: false
        })

      }, error_handler)
    }
    else {
      return get_promise(URLS.GETTRANSACTIONS, config).then(response => {
        dispatch({
          type: types.fetch_transactions,
          payload: response
        })
        dispatch({
          type: types.is_fetching,
          payload: false
        })

      }, error_handler)
    }

  }
}

export function getRefundData (id, amt, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    let data = {
      order_id: id,
      unique_id: id,
      amount: amt
    }

    return post_promise(URLS.GETREFUNDTRANSBUTTON + id + '/', data, config).then(response => {
      dispatch({
        type: types.refund_successfull,
        payload: response
      })
    }, error_handler)

  }
}