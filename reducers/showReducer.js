import { types } from '../actions/types'

const showReducer = (state = {
                       showObj: {},
                        city_filter: [],
  movie_filter:[],
  theatre_show_filter:[],
    time_show_filter:{}


                     }, action) => {

  switch (action.type) {
    case types.fetch_shows:
      state = {
        ...state,
        showObj: {...action.payload}

      }
      break;
    case types.fetch_filtered_city:
      state = {
        ...state,
        city_filter: action.payload.results
      }
      break;
    case types.fetch_filtered_movie:
      state = {
        ...state,
        movie_filter: action.payload.results
      }
      break;
    case types.fetch_filtered_theatre_show:
      state = {
        ...state,
        theatre_show_filter: action.payload.results
      }
      break;
    case types.fetch_shows_by_time:
          state = {
              ...state,
              time_show_filter: {...action.payload.results}
          }
          break;
    case types.change_disable_object:
      state = {
        ...state,
        showObj: {
          ...state.showObj,
          results: state.showObj.results.map(show => {
            if (show.id === action.payload.id) {
              return action.payload
            }
            else {
              return show
            }
          })
        }

      }
      break;
    case types.clear_time_list:
      state = {
        ...state,
        time_show_filter:{}
      }

  }

  return state
}

export default showReducer
