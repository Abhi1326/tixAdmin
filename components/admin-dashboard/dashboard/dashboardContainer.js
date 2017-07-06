import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../common/layout'
import { PaymentSummary } from './paymentSummary'
import { ReportSummary } from './reportSummary'
import { OrderSummary } from './orderSummary'
import Head from 'next/head'
import PropTypes from 'prop-types'

class DashboardContainer extends Component {

  constructor (props) {
    super(props)

  }

  render () {

    return (

      <Layout >

        <Head>
          <title>Admin Dashboard</title>
          <link rel='stylesheet' href='/static/css/paymentSummary.css'/>
          <link rel='stylesheet' href='/static/css/orderSummary.css'/>
          <link rel='stylesheet' href='/static/css/reportSummary.css'/>
        </Head>

        <PaymentSummary
          payment={this.props.paymentData}
        />

        <OrderSummary
          order={this.props.orderData}
        />

        <ReportSummary
          report={this.props.reportData}
        />

      </Layout>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    paymentData: {...state.dash.paymentData},
    reportData: state.dash.reportData,
    orderData: {...state.dash.orderData}
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

DashboardContainer.propTypes = {
    paymentData:PropTypes.object,
    reportData:PropTypes.array,
    orderData:PropTypes.object,
    headers:PropTypes.object

};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
