/**
 * Created by consultadd on 14/2/17.
 */

import React, { Component } from 'react'
import { OrderDetail } from './OrderDetail'
import Layout from '../../common/layout'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { getCancelData, getRefundData, getResendData } from '../../../actions/orderActions'
import Head from 'next/head'

class OrderDetailContainer extends Component {

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
          <title>Movie Order Detail</title>
          <link rel='stylesheet' href='/static/css/orderDetail.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
        </Head>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">

            <Layout >
              <OrderDetail
                OrderDetail={this.props.detailorders}
                headers={this.props.headers}
                getResendData={this.props.getResendData.bind(this)}
                getCancelData={this.props.getCancelData.bind(this)}
                getRefundData={this.props.getRefundData.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailContainer)

