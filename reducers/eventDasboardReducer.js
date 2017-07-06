import { types } from '../actions/types'
const eventDashboardReducer = (state = {
                                 eventPartner: [],
                                 eventData: [],
                                 orderData: {},
                                 orgData: {},
                                 event_data: {}

                               }, action) => {

  switch (action.type) {
    case types.fetch_event_partner:
      state = {
        ...state,
        eventPartner: [...action.payload.organization],
        eventData: [...action.payload.events_data]

      }
      break
    case types.fetch_event_org_id:
      state = {
        ...state,
        eventData: [...action.payload.events_data],
        orgData: {...action.payload.organization}

      }
      break
    case types.fetch_event_orders:
      state = {
        ...state,
        orderData: action.payload,

      }
      break
  }

  return state
}

export default eventDashboardReducer


