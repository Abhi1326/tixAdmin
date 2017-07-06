/**
 * Created by consultadd on 16/2/17.
 */

import React, { Component } from 'react'
import { CampaignList } from './CampaignList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import {
  getCampaignCouponType,
  getCampaignDiscountType,
  getCampaignTheatreChain,
  getCampaignType,
  getdeleteCampaign,
  getFilteredCampaign,
  getUpdateCampForm
} from '../../../actions/campaignActions'
import Head from 'next/head'

let searchQuery = ''
class CampaignContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      CampList: [],
      campPage: 0,
    }

    this.filter = this.filter.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.openBox = this.openBox.bind(this)
    this.getdeleteCampData = this.getdeleteCampData.bind(this)
    this.logout = this.logout.bind(this)

  }

  componentDidMount () {

  }

  componentWillReceiveProps (newProps) {

  }

  filter (val) {
    searchQuery = ''
    if (val.length === 0) {

      this.props.getFilteredCampaign(searchQuery, this.props.headers)

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
      this.props.getFilteredCampaign(query, this.props.headers)

    }
  }

  getdeleteCampData (arr) {
    this.props.getdeleteCampaign(arr, this.props.headers).then(res => {

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
      toastr.success('Campaign Deleted successfully !!!!!!!')
    }

  }

  pageChange (val) {
    let query = '?page=' + val + searchQuery
    this.props.getFilteredCampaign(query, this.props.headers)
  }

  logout () {
    this.props.logout()
  }

  render () {

    return (
      <div>
        <Head>
          <link rel='stylesheet' href='/static/css/campainList.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
        </Head>
        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">


            <Layout >
              <CampaignList
                CampaignList={this.props.campList}
                CampaignPage={this.props.campPage}
                filters={this.filter}
                pageNumber={this.pageChange}
                getdeleteCampData={this.getdeleteCampData}
                isFetching={this.props.isFetching}
                getcampUpdateData={ this.props.getcampUpdateData}
                getCampaignTheatreChain={this.props.getCampaignTheatreChain}
                getCampaignDiscountType={this.props.getCampaignDiscountType}
                getCampaignType={this.props.getCampaignType}
                getCampaignCouponType={this.props.getCampaignCouponType}
                updatecamplist={this.props.updatecamplist}
                headers={this.props.headers}
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
    campList: state.campaign.campaignObj.results || [],
    campPage: state.campaign.campaignObj.count || 0,
    isFetching: state.data.isFetching,
    updatecamplist: state.campaign.updateformcampObj,
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {

    getFilteredCampaign: (query, headers) => {
      dispatch(getFilteredCampaign(query, headers))
    },
    getdeleteCampaign: (arr, headers) => {
      return dispatch(getdeleteCampaign(arr, headers))
    },
    logout: () => {
      dispatch(logout())
    },
    getcampUpdateData: (val, headers) => {
      return dispatch(getUpdateCampForm(val, headers))
    },
    getCampaignTheatreChain: (val, headers) => {
      return dispatch(getCampaignTheatreChain(val, headers))
    },
    getCampaignCouponType: (val, headers) => {
      return dispatch(getCampaignCouponType(val, headers))
    },
    getCampaignType: (val, headers) => {
      return dispatch(getCampaignType(val, headers))
    },
    getCampaignDiscountType: (val, headers) => {
      return dispatch(getCampaignDiscountType(val, headers))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer)



