import React, { Component } from 'react'
import { ShowList } from './showList'
import Layout from '../../common/layout'
import { Router } from '../../../routes'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import { DisableShow, EnableShow, clearTimeList,getFilteredShows,getFilteredCity,getFilteredTheatreShow,getFilteredMovie,handleTime } from '../../../actions/showAction'
import Head from 'next/head'

let searchQuery = ''
let data = []
let totalPage = 1
let qs = ''
let query = ''

class ShowContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showList: [],
      showPage: 0
    }

    this.filter = this.filter.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.logout = this.logout.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);

  }

  componentWillMount () {

  }

  componentWillReceiveProps (newProps) {

  }

  componentDidMount () {

  }

    pageChange (val) {

        if (qs !== '' && query !== '') {
            let pagequery = qs + '&' + query + '&page=' + val
            this.props.getFilteredShows(pagequery, this.props.headers)
        } else if (qs === '' && query === '') {
            let pagequery = '?page=' + val
            this.props.getFilteredShows(pagequery, this.props.headers)
        } else {
            let pagequery = qs + query + '&page=' + val
            this.props.getFilteredShows(pagequery, this.props.headers)
        }
    }



    filter (val, val1) {


        if (val1.length === 0) {

            query = ''

            if (val.start !== '') {
                val.start = val.start
            }
            qs = '?' + 'theatre=' + val.theatre + '&date=' + val.date + '&start=' + val.start + '&movie=' + val.movie + '&city=' + val.city + '&enabled=' + val.enabled

            this.props.getFilteredShows(qs, this.props.headers)

        } else {

            if (val.start !== '') {
                val.start = val.start
            }
            qs = '?' + 'theatre=' + val.theatre + '&date=' + val.date + '&start=' + val.start + '&movie=' + val.movie + '&city=' + val.city + '&enabled=' + val.enabled
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

            this.props.getFilteredShows(qs + '&' + query, this.props.headers)
        }
    }

    handleTimeChange(val){
        this.props.handleTime(val,this.props.headers)
    }


  // filter (val1,val2) {
  //
  //   if (val1.length === 0) {
  //
  //     let query = '?search='
  //     this.props.getFilteredShows(query,val2, this.props.headers)
  //   } else {
  //
  //     let query = ''
  //     let str = ''
  //     for (let i = 0; i < val1.length; i++) {
  //       if (val1.length === 1) {
  //         str += '?search=' + val1[i]
  //         searchQuery = '&search=' + val1[i]
  //       }
  //       else {
  //         str = ''
  //         if (i === 0) {
  //           str += '?search=' + val1[i]
  //           searchQuery = '&search=' + val1[i]
  //         } else {
  //           str += ',' + val1[i]
  //           searchQuery += ',' + val1[i]
  //         }
  //
  //       }
  //       query += str
  //     }
  //
  //     this.props.getFilteredShows(query,val2, this.props.headers)
  //   }
  // }


  logout () {
    this.props.logout()
  }

  render () {

    return (
      <div>
        <Head>
          <title>Shows</title>
          <link rel='stylesheet' href='/static/css/show.css'/>
        </Head>

        <div className="hold-transition skin-blue sidebar-mini">
          <div className="wrapper">


            <Layout >
              <ShowList
                ShowList={this.props.Showlist}
                pagenumber={this.pageChange}
                ShowPage={this.props.Page}
                cityFilter={this.props.city_filter}
                movieFilter={this.props.movie_filter}
                theatreshowFilter={this.props.theatre_show_filter}
                timeshowFilter={this.props.time_show_filter}
                filters={this.filter}
                handleTimeChange={this.handleTimeChange}
                cityFilterFunction={this.props.cityFilterFunction.bind(this)}
                theatreShowFilterFunction={this.props.theatreShowFilterFunction.bind(this)}
                movieFilterFunction={this.props.movieFilterFunction.bind(this)}
                isFetching={this.props.isFetching}
                DisableButtonClick={this.props.DisableButtonClick}
                EnableButtonClick={this.props.EnableButtonClick}
                headers={this.props.headers}
                clearTimeList={this.props.clearTimeList}/>
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
    Showlist: state.show.showObj.results || [],
    Page: state.show.showObj.count || 0,
    isFetching: state.data.isFetching,
    city_filter: state.show.city_filter,
      movie_filter: state.show.movie_filter,
      theatre_show_filter: state.show.theatre_show_filter,
      time_show_filter:state.show.time_show_filter
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {

    getFilteredShows: (query,headers) => {
      dispatch(getFilteredShows(query,headers))
    },
    logout: () => {
      dispatch(logout())
    },
    cityFilterFunction: (query, headers) => {
      dispatch(getFilteredCity(query, headers))
    },
    theatreShowFilterFunction: (query, city, headers) => {
      dispatch(getFilteredTheatreShow(query,city,headers))
    },
    movieFilterFunction: (query, headers) => {
      dispatch(getFilteredMovie(query, headers))
    },
    DisableButtonClick: (id, headers) => {
      dispatch(DisableShow(id, headers))
    },
    EnableButtonClick: (id, headers) => {
      dispatch(EnableShow(id, headers))
    },
      handleTime: (date, headers) => {
          dispatch(handleTime(date, headers))
      },
      clearTimeList:()=>{
        dispatch(clearTimeList())
      }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)



