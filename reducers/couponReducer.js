import { types } from '../actions/types'
const couponReducer = (state = {
                         couponObj: {},
                         updateformObj: {},
                         campaignListObj: [],
                         formObj: []

                       }, action) => {

  switch (action.type) {
    case types.fetch_coupon:
      state = {
        ...state,
        couponObj: {...action.payload}

      }
      break
    case types.fetch_form_data:
      state = {
        ...state,
        formObj: [...action.payload.results]

      }
      break
    case types.fetch_updateform_data:
      state = {
        ...state,
        updateformObj: {...action.payload}

      }
      break
    case types.fetch_campaignlist_data:
      state = {
        ...state,
        campaignListObj: action.payload.results || []

      }
      break
    case types.remove_deletedcoup_elements:
      state = {
        ...state,
        couponObj: {
          ...state.couponObj,
          results: state.couponObj.results.filter(coupDel => {
            if (action.payload.indexOf(coupDel.id) !== -1) {

            }
            else {
              return coupDel
            }
          })
        }

      }
      break
    case types.add_coupon_to_list:
      state = {
        ...state,
        couponObj: {
          ...state.couponObj,
          results: [action.payload, ...state.couponObj.results]
        }
      }
      break
    case types.update_coupon_list:
      state = {
        ...state,
        couponObj: {
          ...state.couponObj,
          results: state.couponObj.results.map(coup => {
            if (coup.id === action.payload.id) {
              return action.payload
            }
            else {
              return coup
            }
          })

        }
      }
      break

  }

  return state
}

export default couponReducer


