import { types } from '../actions/types'

const orderReducer = (state = {
                        orders: [],
                        orderPage: 0,
                        theatre_filter: [],
                        event_filter: [],
                        orderDetail: {},
                        eventordersDatetime:[]
                      }, action) => {

  switch (action.type) {
    case types.fetch_all_order:
      state = {
        ...state,
        orders: action.payload.results,
        orderPage: action.payload.count
      }
      break
    case types.fetch_event_order:
      state = {
        ...state,
        orders: action.payload.results,
        orderPage: action.payload.count
      }
      break
    case types.fetch_filtered_theatre:
      state = {
        ...state,
        theatre_filter: action.payload.results
      }
      break
    case types.fetch_filtered_event:
      state = {
        ...state,
        event_filter: action.payload.results
      }
      break
    case types.fetch_all_eventorder_date_time:
      state = {
        ...state,
        eventordersDatetime: action.payload,
      }
      break
    case types.fetch_order_detail:
      state = {
        ...state,
        orderDetail: {...action.payload}
      }
      break;
    case types.clear_dateTime_list_event_order:
      state={
          ...state,
        eventordersDatetime:[]
      }
      break;
  }
  return state
}

export default orderReducer
