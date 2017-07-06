import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BadgeWiseReport } from './badgeWiseReport'
import Layout from '../../common/layout'
import {
  filterByStatus,
  filterByType,
  getBadgeWiseReport,
  getPagedData,
  getPayment
} from '../../../actions/dashboardActions'
import Head from 'next/head'
import PropTypes from 'prop-types'


let searchArray = []
let chipset = []
let searchquery = ''
let datequery = ''

class BadgeWiseReportConatiner extends Component {

  constructor (props) {
    super(props)
    this.state = {
      crnt_page: 1
    }

    this.filterByAmountType = this.filterByAmountType.bind(this)
    this.filterByStatus = this.filterByStatus.bind(this)
    this.changePage = this.changePage.bind(this)
    this.reset = this.reset.bind(this)

  }

  componentWillReceiveProps (newProps) {
    if (this.props.badgeWiseReport.count !== newProps.badgeWiseReport.count) {
      this.setState({
        crnt_page: 1
      })
    }

  }

  filterByAmountType (params, type, status) {

    this.props.filterbyAmountType(params, type, status, this.props.headers)

  }

  filterByStatus (params, amountType, status) {

    this.props.filterByPaymentStatus(params, amountType, status, this.props.headers)

  }

  changePage (query, headers) {

    let id = {parent_id: this.props.parentId}
    this.props.changePage(query, id, this.props.headers)

  }

  reset () {
    this.props.resetAll(this.props.parentId, this.props.type, this.props.headers)
  }

  render () {

    return (
      <Layout >
        <Head>
          <title>Batch Wise Report</title>
          <link rel="stylesheet" href="/static/css/toastr.css"/>
          <link rel='stylesheet' href='/static/css/badgewisereport.css'/>
        </Head>

        <BadgeWiseReport
          parentId={this.props.parentId}
          badgeWiseReport={this.props.badgeWiseReport || {}}
          filter={this.filterByAmountType}
          filterByStatus={this.filterByStatus}
          payment={this.props.payment}
          paymentresponse={this.props.paymentResponse || {}}
          isFeatching={this.props.isFetching}
          resetAllFilter={this.reset}
          pagenate={this.changePage}
          headers={this.props.headers}
          current_page={this.state.crnt_page}

        />

      </Layout>

    )
  }

}

const mapStateToProps = (state) => {

  return {

    badgeWiseReport: {...state.dash.badgeReport},
    isFetching: state.data.isFetching,
    paymentResponse: {...state.dash.paymentResponse}

  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterbyAmountType: (params, type, status, headers) => {
      dispatch(filterByType(params, type, status, headers))
    },
    filterByPaymentStatus: (params, amountType, status, headers) => {
      dispatch(filterByStatus(params, amountType, status, headers))
    },
    payment: (params, headers) => {
      return dispatch(getPayment(params, headers))
    },
    resetAll: (parent_id, type, headers) => {
      return dispatch(getBadgeWiseReport(parent_id, type, headers))
    },
    changePage: (query, id, headers) => {
      dispatch(getPagedData(query, id, headers))
    },

  }
}
BadgeWiseReportConatiner.propTypes = {
    badgeWiseReport:PropTypes.object,
    isFetching:PropTypes.boolean,
    paymentResponse:PropTypes.object,
    headers:PropTypes.object,
    parentId:PropTypes.string,
    type:PropTypes.string,
    filterbyAmountType:PropTypes.func,
    filterByPaymentStatus:PropTypes.func,
    payment:PropTypes.func,
    resetAll:PropTypes.func,
    changePage:PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(BadgeWiseReportConatiner)
