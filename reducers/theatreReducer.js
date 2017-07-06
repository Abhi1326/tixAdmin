import { types } from '../actions/types'

const theatreReducer = (state = {
                          theatreObj: {},
  theatre_filter_title:[],
  city_filter_theatre:[]

                        }, action) => {

  switch (action.type) {
    case types.fetch_theatres:
      state = {
        ...state,
        theatreObj: {...action.payload}
      }
      break
    case types.fetch_filtered_city_theatre:
      state = {
        ...state,
        city_filter_theatre: action.payload.results
      }
      break
    case types.fetch_filtered_theatre_title:
      state = {
        ...state,
        theatre_filter_title: action.payload.results
      }
      break
    case types.change_disabletheatre_object:
      state = {
        ...state,
        theatreObj: {
          ...state.theatreObj,
          results: state.theatreObj.results.map(theatre => {
            if (theatre.id === action.payload.id) {
              return action.payload
            }
            else {
              return theatre
            }
          })
        }

      }
      break
    case types.change_disabletheatrechain_object:
      state = {
        ...state,
        theatreObj: {
          ...state.theatreObj,
          results: state.theatreObj.results.map(theatre => {
            if (theatre.id === action.payload.id) {
              return action.payload
            }
            else {
              return theatre
            }
          })
        }

      }
      break


  }
  return state

}

export default theatreReducer
