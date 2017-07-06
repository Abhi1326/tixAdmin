/**
 * Created by consultadd on 28/2/17.
 */
import { types } from './types'
import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise } from './restActions'

export function getTheatre (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETTHEATRES, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_theatres,
        payload: response
      })

    }, error_handler)

  }
}


export function getTheatreChain (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETTHEATRECHAIN, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_theatres,
        payload: response
      })

    }, error_handler)

  }
}



export function DisableButtonClickChainList (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETDISABLETHEATRECHAINLIST + 'False', config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_theatres,
        payload: response
      })

    }, error_handler)

  }
}

export function UnableButtonClickChainList (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETENABLETHEATRECHAINLIST + 'True', config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_theatres,
        payload: response
      })

    }, error_handler)

  }
}



export function getFilteredTheatres (query,headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETTHEATRES + query, config).then(response => {
      dispatch({
        type: types.fetch_theatres,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}



export function DisableTheatre (id, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let data = {theatre_id: id}

    return post_promise(URLS.GETDISABLEBUTTON, data, config).then(response => {

      dispatch({
        type: types.change_disabletheatre_object,
        payload: response.results
      })

    }, error_handler)

  }
}

export function DisableTheatreChain (id, headers) {
  return dispatch => {

    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }
    let data = {source_id: id}

    return post_promise(URLS.GETDISABLEBUTTONCHAIN, data, config).then(response => {

      dispatch({
        type: types.change_disabletheatrechain_object,
        payload: response.results
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}




export function EnableTheatre (id, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let data = {theatre_id: id}
    return post_promise(URLS.GETUNABLEBUTTON, data, config).then(response => {

      dispatch({
        type: types.change_disabletheatre_object,
        payload: response.results
      })

    }, error_handler)

  }
}


export function EnableTheatreChain (id, headers) {
  return dispatch => {

    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }
    let data = {source_id: id}
    return post_promise(URLS.GETUNABLEBUTTONCHAIN, data, config).then(response => {

      dispatch({
        type: types.change_disabletheatrechain_object,
        payload: response.results
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}

export function getFilteredCityTheatre (show, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    return get_promise(URLS.GETFILTERCITY + show, config).then(response => {

      dispatch({
        type: types.fetch_filtered_city_theatre,
        payload: response
      })

    }, error_handler)
  }
}

export function getFilteredTheatreTitle (title,city, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    return get_promise(URLS.GETFILTERTHEATRESHOW + title +'&city='+city, config).then(response => {

      dispatch({
        type: types.fetch_filtered_theatre_title,
        payload: response
      })

    }, error_handler)
  }
}