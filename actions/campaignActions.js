
import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise, put_promise } from './restActions'
import { types } from './types'

export function getCampaign (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCAMPAIGN, config).then(response => {

      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_campaign,
        payload: response
      })

    }, error_handler)

  }
}
export function getFilteredCampaign (query, headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCAMPAIGN + query, config).then(response => {
      dispatch({
        type: types.fetch_campaign,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}

export function getdeleteCampaign (array, headers) {

  return dispatch => {
    let config = {
      headers: headers
    }

    let data = {campaign_ids: array}

    return post_promise(URLS.GETDELETECAMPAIGN, data, config).then(response => {

      if (response.success) {

        return true
      }
      else {
        return 'error'
      }

    }, error_handler)
  }
}

export function getUpdateCampForm (id, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCAMPAIGN + id + '/', config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_updateformcamp_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignMovie (movie, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETMOVIECAMPAIGN + movie, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_movie_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignTheatres (theatre, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETTHEATRECAMPAIGN + theatre, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_theatre_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignEvent (event, headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETEVENTCAMPAIGN + event, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_event_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignCity (city, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCITYCAMPAIGN + city, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_city_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignTheatreChain (headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETTHEATRECHAINCAMPAIGN, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_theatrechain_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignDiscountType (headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETDISCOUNTTYPECAMPAIGN, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_discounttype_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignType (headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCAMPAIGNTYPECAMPAIGN, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_campaigntype_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getCampaignCouponType (headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETCOUPONTYPECAMPAIGN, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_campaigncoupon_data,
        payload: response
      })
    }, error_handler)

  }
}

export function getSubmitData (camp, headers) {

  return dispatch => {

    let config = {
      headers: headers
    }

    let data = camp

    return post_promise(URLS.GETCAMPAIGN, data, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.add_campaign_to_list,
        payload: response
      })
      return {success: true, response: response}
    }, error => {
      return {success: false, response: error.response.data}
    })
  }
}

export function getSubmitUpdateData (camp, id, headers) {

  return dispatch => {

    let config = {
      headers: headers
    }

    let data = camp

    return put_promise(URLS.GETCAMPAIGN + id + '/', data, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.update_campaign_list,
        payload: response
      })

      return {success: true, response: response}
    }, error => {
      return {success: false, response: error.response.data}
    })
  }
}




