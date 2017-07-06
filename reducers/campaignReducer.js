import { types } from '../actions/types'
const campaignReducer = (state = {
                           campaignObj: {},
                           updateformcampObj: {},
                           campcityObj: [],
                           camptheatrechainObj: [],
                           campdiscounttypeObj: [],
                           campcouponObj: [],
                           camptypeObj: [],
                           campeventObj: [],
                           campmovieObj: [],
                           camptheatreObj: []

                         }, action) => {

  switch (action.type) {
    case types.fetch_campaign:
      state = {
        ...state,
        campaignObj: {...action.payload}

      }
      break
    case types.fetch_updateformcamp_data:
      state = {
        ...state,
        updateformcampObj: {...action.payload}

      }
      break

    case types.fetch_event_data:
      state = {
        ...state,
        campeventObj: action.payload.results || []

      }
      break
    case types.fetch_movie_data:
      state = {
        ...state,
        campmovieObj: action.payload.results || []

      }
      break
    case types.fetch_theatre_data:
      state = {
        ...state,
        camptheatreObj: action.payload.results || []

      }
      break
    case types.fetch_city_data:
      state = {
        ...state,
        campcityObj: action.payload.results || []

      }
      break
    case types.fetch_theatrechain_data:
      state = {
        ...state,
        camptheatrechainObj: action.payload.results || []

      }
      break
    case types.fetch_discounttype_data:
      state = {
        ...state,
        campdiscounttypeObj: action.payload || []

      }
      break
    case types.fetch_campaigntype_data:
      state = {
        ...state,
        camptypeObj: action.payload || []

      }
      break
    case types.fetch_campaigncoupon_data:
      state = {
        ...state,
        campcouponObj: action.payload || []

      }
      break
    case types.remove_deleted_elements:
      state = {
        ...state,
        campaignObj: {
          ...state.campaignObj,
          results: state.campaignObj.results.filter(campDel => {
            if (action.payload.indexOf(campDel.id) !== -1) {

            }
            else {
              return campDel
            }
          })
        }

      }
      break
    case types.add_campaign_to_list:
      state = {
        ...state,
        campaignObj: {
          ...state.campaignObj,
          results: [action.payload, ...state.campaignObj.results]
        }
      }
      break
    case types.update_campaign_list:
      state = {
        ...state,
        campaignObj: {
          ...state.campaignObj,
          results: state.campaignObj.results.map(camp => {
            if (camp.id === action.payload.id) {
              return action.payload
            }
            else {
              return camp
            }
          })

        }
      }
      break
  }
  return state
}

export default campaignReducer
