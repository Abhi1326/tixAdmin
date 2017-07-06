import React, { Component } from 'react'
import { CouponList } from './CouponList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { getCouponUpdateForm, getdeleteCoupon, getFilteredCoupon } from '../../../actions/couponActions'
import Head from 'next/head'

let searchQuery = ''
class CouponContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      CoupList: [],
      CoupPage: 0,
    }

    this.filter = this.filter.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.openBox = this.openBox.bind(this)
    this.logout = this.logout.bind(this)
    this.getdeleteCoupData = this.getdeleteCoupData.bind(this)

  }

  componentDidMount () {

  }

  componentWillReceiveProps (newProps) {

  }

  getdeleteCoupData (arr) {
    this.props.getdeleteCoupon(arr, this.props.headers).then(res => {
      if (res) {
        location.reload()
        setTimeout(this.openBox(res), 3000)
      } else {
        this.openBox(res)
      }

    })
  }

  openBox (a) {
    this.openToastr(a)
  }

  openToastr (data) {

    toastr.options = {
      closeButton: '<button><i class="icon-off"></i></button>',
      positionClass: 'toast-top-full-width',
      onclick: null,
      closeMethod: 'fadeOut',
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'preventDuplicates': true,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }

    if (data === 'error') {
      toastr.error('Error is Occured. Try after some time!!!!!!!!!!!! ')
    } else {
      toastr.success('Coupon is successfully deleted !!')
    }

  }

  filter (val) {
    searchQuery = ''

    if (val.length === 0) {
      let query = ''
      this.props.getFilteredCoupon(query, this.props.headers)
    } else {

      let query = ''
      let str = ''
      for (let i = 0; i < val.length; i++) {
        if (val.length === 1) {
          str += '?search=' + val[i]
          searchQuery = '&search=' + val[i]
        }
        else {
          str = ''
          if (i === 0) {
            str += '?search=' + val[i]
            searchQuery = '&search=' + val[i]
          } else {
            str += ',' + val[i]
            searchQuery += ',' + val[i]
          }

        }
        query += str
      }

      this.props.getFilteredCoupon(query, this.props.headers)
    }
  }

  pageChange (val) {
    let query = '?page=' + val + searchQuery
    this.props.getFilteredCoupon(query, this.props.headers)
  }

  logout () {
    this.props.logout()
  }

  render () {

    return (
      <div>
        <Head>
          <title>Coupons</title>
          <link rel='stylesheet' href='/static/css/couponList.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
        </Head>
        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">


            <Layout >
              <CouponList
                CouponList={this.props.coupList}
                CouponPage={this.props.coupPage}
                filters={this.filter}
                getdeleteCoupData={this.getdeleteCoupData}
                pageNumber={this.pageChange}
                isFetching={this.props.isFetching }
                getCouponUpdateForm={this.props.getCouponUpdateForm}
                headers={this.props.headers}
                updatecouplist={this.props.updatecouplist}
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
    coupList: state.coupon.couponObj.results || [],
    coupPage: state.coupon.couponObj.count || 0,
    isFetching: state.data.isFetching,
    updatecouplist: state.coupon.updateformObj,
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
    getdeleteCoupon: (arr, headers) => {
      return dispatch(getdeleteCoupon(arr, headers))
    },
    getCouponUpdateForm: (arr, headers) => {
      return dispatch(getCouponUpdateForm(arr, headers))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer)

