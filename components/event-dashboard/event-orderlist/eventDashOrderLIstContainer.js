import React, { Component } from 'react'
import EventDashOrderList from './eventDashOrderList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import {
  getDetailExcelView,
  getFilteredEventDashOrderList,
  getNormalExcelView
} from '../../../actions/eventDashboardActions'

let qs = ''
let query = ''

class EventDashOrderListContainer extends Component {

  constructor (props) {

    super(props)

    this.state = {
      eventdashOrder: [],
      eventorderPage: 0,
      ShowCancel: false
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

  componentWillReceiveProps (Props) {

  }

  filter (val, val1) {

    if (val1.length === 0) {

      query = ''

      if (val.show_time !== '') {
        val.show_time = val.show_time + ':00'
      }
      qs = '&date=' + val.show_date_custom + '&time=' + val.show_time
      if (val.show_date_custom === '' && val.show_time === '') {

        this.setState({
          ShowCancel: false
        })
      } else {
        this.setState({
          ShowCancel: true
        })
      }

      this.props.getFilteredEventDashOrderList(this.props.eventData.id, qs, this.props.headers)

    } else {

      if (val.show_time !== '') {
        val.show_time = val.show_time + ':00'
      }
      qs = '&date=' + val.show_date_custom + '&time=' + val.show_time + ':00'
      if (val.show_date_custom === '' && val.show_time === '') {

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

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">

            <Layout >
              <EventDashOrderList
                eventdashOrder={this.props.order_data}
                eventData={this.props.eventData}
                filters={this.filter}
                pageNumber={this.pageChange}
                searches={this.searchData}
                ShowCancel={this.state.ShowCancel}
                headers={this.props.headers}
                _handleExportToExcelDetail={this.props._handleExportToExcelDetail}
                _handleExportToExcel={this.props._handleExportToExcel}
                isFetching={this.props.isFetching}
                total_discounted_price={this.props.total_discounted_price}
                total_price={this.props.total_price}
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
    order_data: [...state.event_dash.orderData.all_orders],
    eventData: {...state.event_dash.orderData.event_obj},
    total_discounted_price: state.event_dash.orderData.total_discounted_price,
    total_price: state.event_dash.orderData.total_price,
    isFetching: state.data.isFetching
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    _handleExportToExcel: (id) => {
      dispatch(getNormalExcelView(id))
    },
    _handleExportToExcelDetail: (id) => {
      dispatch(getDetailExcelView(id))
    },
    getFilteredEventDashOrderList: (id, query, headers) => {
      dispatch(getFilteredEventDashOrderList(id, query, headers))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashOrderListContainer)
