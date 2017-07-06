import { types } from '../actions/types'

const dataReducer = (state = {
                       isFetching: false,
                       filters: {},
                       movieOrder: {},
                       movieOrderDetail: {},
                       paymentStatus: {},
                       dueStatus: [],
                       theatreReport: [],
                       fullTheatreReport: {},
                       paidReportDetail: [],
                       movieFilter: [],
                       cityFilter: [],
                       theatreFilter: [],
                       accountFilter: []
                     }, action) => {

  switch (action.type) {
    case types.fetch_movie_order:
      state = {
        ...state,
        isFetching: false,
        movieOrder: {
          ...action.payload
        }

      }
      break
    case types.fetch_movie_order_detail:
      state = {
        ...state,
        isFetching: false,
        movieOrderDetail: {
          ...action.payload
        }

      }
      break
    case types.fetch_all_filter:
      state = {
        ...state,
        isFetching: false,
        filters: action.payload

      }
      break
    case types.fetch_all_city:
      state = {
        ...state,
        isFetching: false,
        cityFilter: action.payload

      }
      break
    case types.fetch_all_theatre:
      state = {
        ...state,
        isFetching: false,
        theatreFilter: action.payload

      }
      break

    case types.fetch_all_movie:
      state = {
        ...state,
        isFetching: false,
        movieFilter: action.payload

      }
      break
    case types.fetch_all_accounts:
      state = {
        ...state,
        isFetching: false,
        accountFilter: action.payload

      }
      break
    case types.is_fetching:
      state = {
        ...state,
        isFetching: action.payload
      }
      break
    case types.fetch_payment_status:
      state = {
        ...state,
        isFetching: false,
        paymentStatus: {...action.payload}
      }
      break
    case types.fetch_theatre_wise_report:
      state = {
        ...state,
        isFetching: false,
        theatreReport: [...action.payload]
      }
      break
    case types.fetch_theatre_wise_filtered_report:
      state = {
        ...state,
        isFetching: false,
        fullTheatreReport: {...action.payload}
      }
      break
    case types.fetch_full_theatre_report:
      state = {
        ...state,
        isFetching: false,
        fullTheatreReport: {...action.payload}
      }
      break
    case types.fetch_due_status:
      state = {
        ...state,
        isFetching: false,
        dueStatus: [...action.payload]
      }
      break

    case types.fetch_paid_detail:
      state = {
        ...state,
        isFetching: false,
        paidReportDetail: action.payload
      }
      break

  }
  return state
}

export default dataReducer
