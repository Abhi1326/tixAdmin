/**
 * Created by consultadd on 22/2/17.
 */

import React, { Component } from 'react'
import { OrderList } from './OrderList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import Head from 'next/head'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import {
  getCancelData,
  getFilteredOrder,
  getRefundData,
  getResendData,
  OrderFiltertheatre
} from '../../../actions/orderActions'
let data = []
let totalPage = 1
let qs = ''
let query = ''

export class OrderContainer extends Component {

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
    this.logout = this.logout.bind(this)

  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillReceiveProps (newProps) {

  }

  filter (val, val1) {

    if (val1.length === 0) {

      query = ''

      if (val.show_time !== '') {
        val.show_time = val.show_time + ':00'
      }
      qs = '?' + 'theatre=' + val.theatre + '&show_date_custom=' + val.show_date_custom + '&show_time=' + val.show_time
      if (val.theatre === '' && val.show_date_custom === '' && val.show_time === '') {

        this.setState({
          ShowCancel: false
        })
      } else {
        this.setState({
          ShowCancel: true
        })
      }

      this.props.getFilteredOrderList(qs, this.props.headers)

    } else {

      if (val.show_time !== '') {
        val.show_time = val.show_time + ':00'
      }
      qs = '?' + 'theatre=' + val.theatre + '&show_date_custom=' + val.show_date_custom + '&show_time=' + val.show_time + ':00'
      if (val.theatre === '' && val.show_date_custom === '' && val.show_time === '') {

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

      this.props.getFilteredOrderList(qs + '&' + query, this.props.headers)
    }
  }

  pageChange (val) {

    console.log(qs, 'qs', query, 'query')
    if (qs !== '' && query !== '') {
      let pagequery = qs + '&' + query + '&page=' + val
      this.props.getFilteredOrderList(pagequery, this.props.headers)
    } else if (qs === '' && query === '') {
      let pagequery = '?page=' + val
      this.props.getFilteredOrderList(pagequery, this.props.headers)
    } else {
      let pagequery = qs + query + '&page=' + val
      this.props.getFilteredOrderList(pagequery, this.props.headers)
    }
  }

  logout () {
    this.props.logout()
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
    this.props.getFilteredOrderList(query, this.props.headers)
  }

  render () {

    return (
      <div>
        <Head>
          <title>Movie Orders</title>
          <link rel='stylesheet' href='/static/css/order.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
          <script src="/static/js/main.js"/>
        </Head>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">

            <Layout >
              <OrderList
                Orders={this.props.orders}
                OrderPage={this.props.orderPage}
                theatreFilter={this.props.theatre_filter}
                theatreFilterFunction={this.props.getFilteredTheatre.bind(this)}
                getResendData={this.props.getResendData.bind(this)}
                getCancelData={this.props.getCancelData.bind(this)}
                getRefundData={this.props.getRefundData.bind(this)}
                filters={this.filter}
                pageNumber={this.pageChange}
                searches={this.searchData}
                ShowCancel={this.state.ShowCancel}
                headers={this.props.headers}
                isFetching={this.props.isFetching}
              />
            </Layout>


          </div>


        </div>
      </div>

    )
  }
}
const mapStateToProps = (state) => {

  return {

    orderPage: state.order.orderPage,
    orders: [...state.order.orders],
    theatre_filter: state.order.theatre_filter,
    isFetching: state.data.isFetching
  }

  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredOrderList: (query, headers) => {
      dispatch(getFilteredOrder(query, headers))
    },
    logout: () => {
      dispatch(logout())
    },
    getFilteredTheatre: (query, headers) => {
      dispatch(OrderFiltertheatre(query, headers))
    },
    getCancelData: (query, headers) => {
      return dispatch(getCancelData(query, headers))
    },
    getResendData: (query, headers) => {
      return dispatch(getResendData(query, headers))
    },
    getRefundData: (query, headers) => {
      return dispatch(getRefundData(query, headers))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer)