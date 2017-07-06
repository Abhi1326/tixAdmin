import React, { Component } from 'react'
import { TheatreList } from './TheatreList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { DisableTheatre, EnableTheatre, getFilteredTheatres,getFilteredCityTheatre,getFilteredTheatreTitle } from '../../../actions/theatreActions'
import { logout } from '../../../actions/authActions'
import Head from 'next/head'

let searchQuery = ''
let qs = ''
let query = ''
let data = []
let totalPage = 1

class TheatreContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      theatreList: [],
      theatrePage: 0,
      page: 1
    }

    this.pageChange = this.pageChange.bind(this)
    this.filter = this.filter.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentWillMount () {

  }

  componentDidMount () {
    this.setState({
      theatreList: this.props.TheatreList,
      theatrePage: this.props.Page
    })
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      theatreList: newProps.TheatreList,
      theatrePage: newProps.Page
    })
  }

  pageChange (val,val2) {
    let query = '?page=' + val + searchQuery
    this.props.getFilteredTheatres(query,val2, this.props.headers)
  }

  pageChange (val) {

    if (qs !== '' && query !== '') {
      let pagequery = qs + '&' + query + '&page=' + val
      this.props.getFilteredTheatres(pagequery, this.props.headers)
    } else if (qs === '' && query === '') {
      let pagequery = '?page=' + val
      this.props.getFilteredTheatres(pagequery, this.props.headers)
    } else {
      let pagequery = qs + query + '&page=' + val
      this.props.getFilteredTheatres(pagequery, this.props.headers)
    }
  }


  filter (val, val1) {


    if (val1.length === 0) {

      query = ''
      qs = '?' + 'title=' + val.theatre + '&city=' + val.city + '&status=' + val.status

      this.props.getFilteredTheatres(qs, this.props.headers)

    } else {

      qs = '?' + 'title=' + val.theatre + '&city=' + val.city + '&enabled=' + val.status
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

      this.props.getFilteredTheatres(qs + '&' + query, this.props.headers)
    }
  }


  logout () {
    this.props.logout()
  }

  render () {

    return (
      <div>
        <Head>
          <title>Theatres</title>
          <link rel='stylesheet' href='/static/css/theatre.css'/>
        </Head>
        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">

            <Layout >
              <TheatreList
                Theatre={this.props.TheatreList}
                TheatrePage={this.props.Page}
                pagenumber={this.pageChange}
                filters={this.filter}
                cityFilterTheatre={this.props.city_filter_theatre}
                theatreTitleFilter={this.props.theatre_title_filter}
                isFetching={this.props.isFetching}
                page={this.state.page}
                cityFilterTheatreFunction={this.props.citytheatreFilterFunction.bind(this)}
                theatreTitleFilterFunction={this.props.theatretitleFilterFunction.bind(this)}
                DisableButtonClickTheatre={this.props.DisableButtonClick}
                EnableButtonClickTheatre={this.props.EnableButtonClick}
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
    TheatreList: state.theatre.theatreObj.results || [],
    Page: state.theatre.theatreObj.count || 0,
    isFetching: state.data.isFetching,
    city_filter_theatre: state.theatre.city_filter_theatre,
    theatre_title_filter: state.theatre.theatre_filter_title,
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredTheatres: (query, headers) => {
      dispatch(getFilteredTheatres(query, headers))
    },
    citytheatreFilterFunction: (query, headers) => {
      dispatch(getFilteredCityTheatre(query, headers))
    },
    theatretitleFilterFunction: (query,city, headers) => {
      dispatch(getFilteredTheatreTitle(query,city, headers))
    },
    logout: () => {
      dispatch(logout())
    },
    DisableButtonClick: (id, headers) => {
      dispatch(DisableTheatre(id, headers))
    },
    EnableButtonClick: (id, headers) => {
      dispatch(EnableTheatre(id, headers))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheatreContainer)
