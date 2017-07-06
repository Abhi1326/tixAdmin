/**
 * Created by consultadd on 28/2/17.
 */

import React, { Component } from 'react'
import { TransactionList } from './TransactionList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { getFilteredTransactions, getRefundData } from '../../../actions/transactionActions'

let searchQuery = ''

class TransactionContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      transactionList: [],
      // payloadData:false,
      Loader: false
    }

    this.filter = this.filter.bind(this)
    this.logout = this.logout.bind(this)

  }

  componentWillReceiveProps (newProps) {

  }

  componentDidMount () {

  }

  filter (val1) {
    searchQuery = ''

    if (val1.length === 0) {
      this.props.getFilteredTransactions(searchQuery, this.props.headers)

    } else {

      let query = ''
      let str = ''

      for (let i = 0; i < val1.length; i++) {
        if (val1.length === 1) {
          str += '?order_id=' + val1[i]
          searchQuery = '&order_id=' + val1[i]
        }
        else {
          str = ''
          if (i === 0) {
            str += '?order_id=' + val1[i]
            searchQuery = '&order_id=' + val1[i]
          } else {
            str += ',' + val1[i]
            searchQuery += ',' + val1[i]
          }

        }
        query += str
      }
      this.props.getFilteredTransactions(query, this.props.headers)
    }
  }

  logout () {
    this.props.logout()
  }

  render () {

    return (
      <div>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">


            <Layout >
              <TransactionList
                Transaction={this.props.TransactionList}
                filters={this.filter}
                isFetching={this.props.isFetching}
                handleRefundButton={this.props.handleRefundButton}
                headers={this.props.headers}/>
            </Layout>


          </div>


        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {

  return {
    TransactionList: state.transaction.transactionList || [],
    isFetching: state.data.isFetching,

  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {

    getFilteredTransactions: (query, headers) => {
      dispatch(getFilteredTransactions(query, headers))
    },

    logout: () => {
      dispatch(logout())
    },
    handleRefundButton: (id, amnt, headers) => {
      dispatch(getRefundData(id, amnt, headers))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer)

