import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PaymentStatus } from './paymentstatus'
import Layout from '../../common/layout'
import {
  getPageData, getPaymentByType,
  getPaymentFilter,
  getPaymentHistory,
  getPaymentStatus,
  paidReportDetail
} from '../../../actions/moveOrderActions'
import Head from 'next/head'
import PropTypes from 'prop-types'


class PaymentHistoryContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      crnt_page: 1
    }

    this.viewPaidDetail = this.viewPaidDetail.bind(this)
    this.searchHistory = this.searchHistory.bind(this)
    this.filter = this.filter.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.reset = this.reset.bind(this)
    this.filterByType = this.filterByType.bind(this)




  }

  componentWillReceiveProps (newProps) {
    if (this.props.paymentStatus.count !== newProps.paymentStatus.count) {
      this.setState({
        crnt_page: 1,
      })
    }
  }

  viewPaidDetail (batch_name) {
    this.props.viewPaidDetail(batch_name, this.props.headers)

  }

  searchHistory (value) {
    this.props.paymentHistorySearch(value, this.props.headers)
  }

  filter (status) {
    this.props.filterByStatus(status, this.props.headers)
  }
  filterByType(type){
    this.props.filterByAmountType(type, this.props.headers)

  }

  pageChange (query) {
    this.props.pageChange(query, this.props.headers)
  }

  reset () {
    this.props.resetAll(this.props.headers)
  }

  render () {

    return (

      <Layout >
        <Head>
          <title>Payment History</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          <link rel='stylesheet' href='/static/css/paymentstatus.css'/>
        </Head>

        <PaymentStatus
          paymentStatus={this.props.paymentStatus || {}}
          viewPaidDetail={this.viewPaidDetail}
          searchHistory={this.searchHistory}
          filter={this.filter}
          pagenate={this.pageChange}
          resetAllFilter={this.reset}
          user={this.props.user}
          paidReportDetail={this.props.paidReportDetail || []}
          isFetching={this.props.isFetching}
          current_page={this.state.crnt_page}
          filterByType={this.filterByType}
        />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    paymentStatus: {...state.data.paymentStatus},
    isFetching: state.data.isFetching,
    paidReportDetail: state.data.paidReportDetail,
    user: state.auth.user,
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewPaidDetail: (batch_name, headers) => {
      dispatch(paidReportDetail(batch_name, headers))
    },
    paymentHistorySearch: (search, headers) => {
      dispatch(getPaymentHistory(search, headers))
    },
    filterByStatus: (status, headers) => {
      dispatch(getPaymentFilter(status, headers))
    },
    filterByAmountType: (type, headers) => {
      dispatch(getPaymentByType(type, headers))
    },
    resetAll: (headers) => {
      return dispatch(getPaymentStatus(headers))
    },
    pageChange: (query, headers) => {
      dispatch(getPageData(query, headers))
    }
  }
}

PaymentHistoryContainer.propTypes = {
    paymentStatus:PropTypes.object,
    user:PropTypes.object,
    paidReportDetail:PropTypes.array,
    headers:PropTypes.object,
    viewPaidDetail:PropTypes.func,
    paymentHistorySearch:PropTypes.func,
    filterByStatus:PropTypes.func,
    filterByAmountType:PropTypes.func,
    resetAll:PropTypes.func,
    pageChange:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistoryContainer)