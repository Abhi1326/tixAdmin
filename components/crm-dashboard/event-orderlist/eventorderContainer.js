/**
 * Created by consultadd on 22/2/17.
 */

import React, { Component } from 'react'
import Head from 'next/head'
import { EventOrderList } from './EventOrderList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import {
  getEventCancelData,
  getEventRefundData,
  getEventResendData,
  getFilteredEventOrder,
  OrderFilterEvent,
    getFilteredDateTimeEventList,
    clearDateTimeEventList
} from '../../../actions/orderActions'
let data = []
let totalPage = 1
let qs = ''
let query = ''

export class EventOrderContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      orders: [],
      orderpage: 0,
      ShowCancel: false,
    }

    this.filter = this.filter.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.searchData = this.searchData.bind(this)
    this.filtersDateTime = this.filtersDateTime.bind(this)
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.setState({
      orders: this.props.orders,
      orderpage: this.props.orderPage,
    })
  }

  componentWillReceiveProps (newProps) {

    this.setState({
      orders: newProps.orders,
      orderpage: newProps.orderPage,
    })
  }

  filter (val, val1) {

    if (val1.length === 0) {

      query = ''
      if (val.show_time !== '') {
        val.show_time = val.show_time
      }
      qs = '?' + 'event_name=' + val.event + '&show_date_custom=' + val.show_date_custom + '&show_time=' + val.show_time
      if (val.event === '' && val.show_date_custom === '' && val.show_time === '') {

        this.setState({
          ShowCancel: false
        })
      } else {
        this.setState({
          ShowCancel: true
        })
      }

      this.props.getFilteredOrderEventList(qs, this.props.headers)

    } else {

      if (val.show_time !== '') {
        val.show_time = val.show_time
      }
      qs = '?' + 'event_name=' + val.event + '&show_date_custom=' + val.show_date_custom + '&show_time=' + val.show_time
      if (val.event === '' && val.show_date_custom === '' && val.show_time === '') {

        this.setState({
          ShowCancel: false
        })
      } else {
        this.setState({
          ShowCancel: true
        })
      }
      query = ''
      let str = ''
      for (let i = 0; i < val1.length; i++) {
        if (val1.length === 1) {
          str += 'search=' + val1[i]
        }
        else {
          str = ''
          if (i === 0) {
            str += 'search=' + val1[i]
          } else {
            str += ',' + val1[i]
          }

        }
        query += str
      }
      console.log(query,'--------->')
      this.props.getFilteredOrderEventList(qs + '&' + query, this.props.headers)
    }
  }


  filtersDateTime(val){
    this.props.getFilteredDateTimeEventList(val, this.props.headers)
  }

  pageChange (val) {

    if (qs !== '' && query !== '') {
      let pagequery = qs + '&' + query + '&page=' + val
      this.props.getFilteredOrderEventList(pagequery, this.props.headers)
    } else if (qs === '' && query === '') {
      let pagequery = '?page=' + val
      this.props.getFilteredOrderEventList(pagequery, this.props.headers)
    } else {
      let pagequery = qs + query + '&page=' + val
      this.props.getFilteredOrderEventList(pagequery, this.props.headers)
    }

  }

  searchData (val) {

    let query = ''
    let str = ''
    for (let i = 0; i < val.length; i++) {
      if (val.length === 1) {
        str += '?search=' + val[i]
      }
      else {
        str = ''
        if (i === 0) {
          str += '?search=' + val[i]
        } else {
          str += ',' + val[i]
        }

      }
      query += str
    }

    this.props.getFilteredOrderEventList(query, this.props.headers)
  }

  render () {

    return (
      <div>
        <Head>
          <title>Event Order</title>
          <link rel='stylesheet' href='/static/css/eventOrder.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
        </Head>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">

            <Layout >
              <EventOrderList
                Orders={this.props.orders}
                EventordersDateTime={this.props.eventordersDateTime}
                OrderPage={this.props.orderPage}
                eventFilter={this.props.event_filter}
                eventFilterFunction={this.props.getFilteredEvent.bind(this)}
                getEventResendData={this.props.getEventResendData.bind(this)}
                getEventCancelData={this.props.getEventCancelData.bind(this)}
                getEventRefundData={this.props.getEventRefundData.bind(this)}
                filters={this.filter}
                filtersDateTime={this.filtersDateTime}
                pageNumber={this.pageChange}
                searches={this.searchData}
                ShowCancel={this.state.ShowCancel}
                headers={this.props.headers}
                isFetching={this.props.isFetching}
                clearDateTimeList={this.props.clearDateTimeEventList}/>

            </Layout>


          </div>


        </div>
        <footer>
          <script src="/static/js/main.js"/>
        </footer>
      </div>

    )
  }
}
const mapStateToProps = (state) => {

  return {

    orderPage: state.order.orderPage,
    orders: [...state.order.orders],
    event_filter: state.order.event_filter,
    isFetching: state.data.isFetching,
    eventordersDateTime:state.order.eventordersDatetime,
  }

  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredOrderEventList: (query, headers) => {
      dispatch(getFilteredEventOrder(query, headers))
    },
    getFilteredDateTimeEventList: (query, headers) => {
      dispatch(getFilteredDateTimeEventList(query, headers))
    },
    logout: () => {
      dispatch(logout())
    },
    getFilteredEvent: (query, headers) => {
      dispatch(OrderFilterEvent(query, headers))
    },
    getEventCancelData: (query, headers) => {
      return dispatch(getEventCancelData(query, headers))
    },
    getEventResendData: (query, headers) => {
      return dispatch(getEventResendData(query, headers))
    },
    getEventRefundData: (query, headers) => {
      return dispatch(getEventRefundData(query, headers))
    },
    clearDateTimeEventList:()=>{
      return dispatch(clearDateTimeEventList())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventOrderContainer)