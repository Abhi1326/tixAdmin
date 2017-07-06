import { URLS } from '../components/common/url-constants'
import { error_handler, get_promise, post_promise } from './restActions'
import { types } from './types'

export function getShows (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GETSHOWS, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_shows,
        payload: response
      })

    }, error_handler)

  }
}


export function getFilteredShows (query,headers) {
  return dispatch => {
    dispatch({
      type: types.is_fetching,
      payload: true
    })
    let config = {
      headers: headers
    }

    return get_promise(URLS.GETSHOWS + query, config).then(response => {
      dispatch({
        type: types.fetch_shows,
        payload: response
      })
      dispatch({
        type: types.is_fetching,
        payload: false
      })

    }, error_handler)

  }
}


export function DisableShow (id, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let data = {show_id: id}

    return post_promise(URLS.GETSHOWDISABLEBUTTON, data, config).then(response => {
      dispatch({
        type: types.change_disable_object,
        payload: response.results
      })

    }, error_handler)

  }
}
export function EnableShow (id, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    let data = {show_id: id}
    return post_promise(URLS.GETSHOWUNABLEBUTTON, data, config).then(response => {
      dispatch({
        type: types.change_disable_object,
        payload: response.results
      })
    }, error_handler)

  }
}


export function handleTime (query,headers) {
    return dispatch => {
        let config = {
            headers: headers
        }

        return get_promise(URLS.GETFILTERTIMESHOW, config).then(response => {
            dispatch({
                type: types.fetch_shows_by_time,
                payload: response
            })

        }, error_handler)

    }
}





export function getFilteredCity (show, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    return get_promise(URLS.GETFILTERCITY + show, config).then(response => {

      dispatch({
        type: types.fetch_filtered_city,
        payload: response
      })

    }, error_handler)
  }
}


export function getFilteredMovie (movie, headers) {
  return dispatch => {
    let config = {
      headers: headers
    }
    return get_promise(URLS.GETFILTERMOVIE + movie, config).then(response => {

      dispatch({
        type: types.fetch_filtered_movie,
        payload: response
      })

    }, error_handler)
  }
}


export function getFilteredTheatreShow (theatre, city,headers) {
    return dispatch => {
        let config = {
            headers: headers
        }
        return get_promise(URLS.GETFILTERTHEATRESHOW + theatre +'&city='+city, config).then(response => {

            dispatch({
                type: types.fetch_filtered_theatre_show,
                payload: response
            })

        }, error_handler)
    }
}
export function clearTimeList() {
    return dispatch => {
        dispatch({
            type: types.clear_time_list,

        })
    }

}