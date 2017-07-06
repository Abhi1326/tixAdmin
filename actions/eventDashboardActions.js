import { URLS } from '../components/common/url-constants'
import {  get_promise ,error_handler} from './restActions'
import { types } from './types'


export function getEventMembers (headers) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GET_EVENT_MEMBERS, config).then(response => {
      dispatch({
        type: types.valid_user,
      })

      dispatch({
        type: types.fetch_event_partner,
        payload: response
      })
    },error_handler)
  }
}

export function getEventByOrgId (headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GET_EVENTS_ORG_ID + id, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_event_org_id,
        payload: response
      })
    },error_handler)
  }
}
export function getOrdersByEvent (headers, id) {
  return dispatch => {

    let config = {
      headers: headers
    }

    return get_promise(URLS.GET_ORDERS_BY_EVENTS + id, config).then(response => {
      dispatch({
        type: types.valid_user,
      })
      dispatch({
        type: types.fetch_event_orders,
        payload: response
      })

    },error_handler)
  }
}
export function getNormalExcelView (id) {
  return dispatch => {

    let token = localStorage.getItem('key')
    console.log('token', token)
    window.location = URLS.GET_NORMAL_EXCEL_VIEW + id + '&token=' + token
  }

}
export function getDetailExcelView (id) {
  return dispatch => {
    let token = localStorage.getItem('key')
    console.log('token', token)
    window.location = URLS.GET_DETAIL_EXCEL_VIEW + id + '&token=' + token
  }
}
export function getFilteredEventDashOrderList (id, query, headers) {
  return dispatch => {

    let config = {
      headers: headers
    }
    dispatch({
      type: types.is_fetching,
      payload: true
    })

    return get_promise(URLS.GET_ORDERS_BY_EVENTS + id + query, config).then(response => {
      console.log('----->', response)
      dispatch({
        type: types.is_fetching,
        payload: false
      })
      dispatch({
        type: types.fetch_event_orders,
        payload: response
      })

    },error_handler)
  }
}

export function getAllOrdersInExcel () {
  return dispatch => {
    let token = localStorage.getItem('key')
    window.location = URLS.GET_All_Orders_In_Excel + '?token=' + token
  }
}

export function getSingleOrgOrdersToExcel (id) {
  return dispatch => {
    let token = localStorage.getItem('key')
    window.location = URLS.GET_Single_Org_Orders_In_Excel + id + '&token=' + token
  }
}