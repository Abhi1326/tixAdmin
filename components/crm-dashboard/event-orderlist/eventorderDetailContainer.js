/**
 * Created by consultadd on 28/2/17.
 */

import React, { Component } from 'react'
import { EventOrderDetail } from './EventOrderDetail'
import Layout from '../../common/layout'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { getEventCancelData, getEventRefundData, getEventResendData } from '../../../actions/orderActions'
import Head from 'next/head'

class EventOrderDetailContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      detailorders: {}
    }
    this.logout = this.logout.bind(this)

  }

  componentWillReceiveProps (newProps) {
    this.setState({
      detailorders: newProps.detailorders
    })

  }

  componentDidMount () {
    this.setState({
      detailorders: this.props.detailorders
    })
  }

  logout () {
    this.props.logout()
  }

  render () {

    return (
      <div>
        <Head>
          <title>Event Order Detail</title>
          <link rel='stylesheet' href='/static/css/order.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
        </Head>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">

            <Layout >
              <EventOrderDetail
                headers={this.props.headers}
                OrderDetail={this.props.detailorders}
                getEventResendData={this.props.getEventResendData.bind(this)}
                getEventCancelData={this.props.getEventCancelData.bind(this)}
                getEventRefundData={this.props.getEventRefundData.bind(this)}
              />
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
    detailorders: {...state.order.orderDetail},
    isFetching: state.data.isFetching
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {

    getFilteredCoupon: (query, headers) => {
      dispatch(getFilteredCoupon(query, headers))
    },

    logout: () => {
      dispatch(logout())
    },
    getEventCancelData: (query, headers) => {
      return dispatch(getEventCancelData(query, headers))
    },
    getEventResendData: (query, headers) => {
      return dispatch(getEventResendData(query, headers))
    },
    getEventRefundData: (query, headers) => {
      return dispatch(getEventRefundData(query, headers))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventOrderDetailContainer)

