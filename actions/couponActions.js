import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise, put_promise } from './restActions'
import { types } from './types'

export function getCoupon (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCOUPON, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_coupon,
        payload: response
      })

    }, error_handler)

  }
}
export function getFilteredCoupon (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCOUPON + query, config).then(response => {
      dispatch({
        type: types.fetch_coupon,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}

export function getdeleteCoupon (array, headers) {

  return dispatch => {
    let config = {
      headers: headers
    }

    let data = {coupon_ids: array}

    return post_promise(URLS.GETDELETECOUPON, data, config).then(response => {
      if (response.success) {

        return true
      }
      else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getCouponUpdateForm (id, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCOUPON + id + '/', config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_updateform_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCouponForm (val, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    return get_promise(URLS.GETMULTIUSERDATA + val, config).then(response => {
      dispatch({
        type: types.fetch_form_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getSubmitCoupAddData (camp, headers) {
  console.log(headers,'ppppppppp')

  return dispatch => {

    let config = {
      headers: headers
    }

    let data = camp

    return post_promise(URLS.GETCOUPON, data, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.add_coupon_to_list,
        payload: response
      })
      return {success: true, response: response}
    }, error => {
      return {success: false, response: error.response.data}
    })

  }
}

export function getSubmitCoupUpdateData (camp, id, headers) {

  return dispatch => {

    let config = {
      headers: headers
    }

    let data = camp

    return put_promise(URLS.GETCOUPON + id + '/', data, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.update_coupon_list,
        payload: response
      })
      return {success: true, response: response}
    }, error => {
      return {success: false, response: error.response.data}
    })

  }
}

export function getCampaignList (camp, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCAMPAIGNLIST + camp, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_campaignlist_data,
        payload: response
      })
    }, error_handler)
  }
}

