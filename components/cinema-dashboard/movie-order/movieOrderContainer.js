import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MovieOrderList } from './movieOrderList'
import { TheatreWiseReport } from './theatreReport'
import Layout from '../../common/layout'
import { paidReportDetail } from '../../../actions/moveOrderActions'
import Head from 'next/head'
import cookie from 'react-cookie'
import PropTypes from 'prop-types'


class MovieOrderContainer extends Component {

  constructor (props) {
    super(props)

    this.viewPaidDetail = this.viewPaidDetail.bind(this)
    this.state = {
      date1: '',
      date2: ''
    }
  }

  componentDidMount () {
    this.setState({
      date1: cookie.load('back_date'),
      date2: cookie.load('current_date')
    })
  }

  viewPaidDetail (batch_name) {
    this.props.viewPaidDetail(batch_name, this.props.headers)

  }

  render () {

    return (

      <Layout >
        <Head>
          <title>Cinema Dashboard</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          <link rel='stylesheet' href='/static/css/movieOrderList.css'/>
          <link rel='stylesheet' href='/static/css/theatrereport.css'/>
        </Head>

        <MovieOrderList
          Summary={this.props.movieOrder}/>

        <br/>

        <TheatreWiseReport
          authData={this.props.user}
          theatreWiseReport={this.props.theatreReport}
          date1={this.state.date1}
          date2={this.state.date2}
        />
      </Layout>

    )
  }
}

const mapStateToProps = (state) => {

  return {
    movieOrder: {
      ...state.data.movieOrder
    },
    theatreReport: state.data.theatreReport
    ,
    isFetching: state.data.isFetching,
    user: state.auth.user
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewPaidDetail: (batch_name, headers) => {
      dispatch(paidReportDetail(batch_name, headers))
    }

  }
}

MovieOrderContainer.propTypes = {
    movieOrder:PropTypes.object,
    theatreReport:PropTypes.array,
    isFetching:PropTypes.boolean,
    user:PropTypes.object,
    headers:PropTypes.object,
    viewPaidDetail:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieOrderContainer)