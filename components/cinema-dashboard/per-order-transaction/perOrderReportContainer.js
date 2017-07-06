import _ from 'underscore'
import Autocomplete from 'react-md/lib/Autocompletes'
import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons/Button'
import React, { Component } from 'react'
import { contentHeaders } from '../../common/headers'
import Chip from 'react-md/lib/Chips'
import { connect } from 'react-redux'
import DataTable from 'react-md/lib/DataTables/DataTable'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import { getFilters, movieOrderList } from '../../../actions/moveOrderActions'
import Head from 'next/head'
import Layout from '../../common/layout'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import { URLS } from '../../common/url-constants'
import Loader from '../../common/pageLoader'
import cookie from 'react-cookie'
import Dialog from 'react-md/lib/Dialogs'
import FontIcon from 'react-md/lib/FontIcons'
import { scrollup } from '../../common/scrollup'
import PropTypes from 'prop-types'



let searchArray = []
let chipset = []
let searchquery = ''
let mtcquery = ''
let datequery = ''
let acntQuery = ''
let noData = false
let movies = []
let clean
let reset_btn_show = false
let disable_download = false
let disable_download_btn = false
let ScrollUp = require('react-scroll-up')

class ReportConatiner extends Component {

  constructor (props) {
    super(props)
    this.state = {
      chips: [],
      movie: [],
      searchQuery: '',
      FilterList: {},
      theatre: [],
      city: [],
      movieName: '',
      theatreName: '',
      cityName: '',
      date1: null,
      date2: null,
      visible1: false,
      visible2: false,
      visible: false,
      current_page: 1,
      accountTypeName: '',
      accountType: []

    }

    this._handleMovieChange = this._handleMovieChange.bind(this)
    this._handleTheatreChange = this._handleTheatreChange.bind(this)
    this._handleCityChange = this._handleCityChange.bind(this)
    this.search = this.search.bind(this)
    this._handleSearchChange = this._handleSearchChange.bind(this)
    this.removeChip = this.removeChip.bind(this)
    this._handlePageChange = this._handlePageChange.bind(this)
    this._resetDate1 = this._resetDate1.bind(this)
    this._resetDate2 = this._resetDate2.bind(this)
    this._handleDate1VisibilityChange = this._handleDate1VisibilityChange.bind(this)
    this._handleDate2VisibilityChange = this._handleDate2VisibilityChange.bind(this)
    this._handleDate1Change = this._handleDate1Change.bind(this)
    this._handleDate2Change = this._handleDate2Change.bind(this)
    this.setMovie = this.setMovie.bind(this)
    this.setTheatre = this.setTheatre.bind(this)
    this.setCity = this.setCity.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this._handleAccountTypeChange = this._handleAccountTypeChange.bind(this)
    this.setAccountType = this.setAccountType.bind(this)
  }

  _resetDate1 () {
    datequery = ''
    this.setState({date1: null})
  }

  _resetDate2 () {
    datequery = ''
    this.setState({date2: null})
  }

  openDialog () {
    this.setState({visible: true})
  };

  closeDialog () {
    this.setState({
      visible: false,
      files: []
    })
  };

  _handleDate1Change (value) {
    let datearray = value.split('/')
    this.setState({date1: value})
  }

  _handleDate2Change (value) {
    let datearray = value.split('/')
    this.setState({date2: value})
  }

  _handleDate1VisibilityChange (visible) {
    this.setState({visible1: visible})
  }

  _handleDate2VisibilityChange (visible) {
    this.setState({visible2: visible})
  }

  filter () {
    datequery = ''

    if (this.state.date1 === null || this.state.date2 === null) {
      let movieName = this.state.movieName
      let theatreName = this.state.theatreName
      let cityName = this.state.cityName
      let accountTypeName = this.state.accountTypeName
      if (movieName !== '' || theatreName !== '' || cityName !== '' || accountTypeName !== '' || searchquery !== '' || this.state.date1 !== null || this.state.date2 !== null) {
        reset_btn_show = true
        disable_download = false
      } else {
        reset_btn_show = false
        disable_download = true
      }
      mtcquery = '&movie=' + movieName + '&theatre=' + theatreName + '&city=' + cityName
      acntQuery = '&account=' + accountTypeName
      let query = '?start=' + '&end=' + searchquery + mtcquery + acntQuery
      this.props.getMovieOrderList(query, this.props.headers)
    } else {
      reset_btn_show = true
      disable_download = false

      let date1 = this.state.date1
      let date2 = this.state.date2
      let movieName = this.state.movieName
      let theatreName = this.state.theatreName
      let cityName = this.state.cityName
      let accountTypeName = this.state.accountTypeName
      mtcquery = '&movie=' + movieName + '&theatre=' + theatreName + '&city=' + cityName
      acntQuery = '&account=' + accountTypeName
      if (date1 === null || date2 === null) {
        let query = '?start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59' + searchquery + mtcquery + acntQuery
        this.props.getMovieOrderList(query, this.props.headers)
      } else {
        let datearray1 = date1.split('/')
        let datearray2 = date2.split('/')
        if (parseInt(datearray1[2]) === parseInt(datearray2[2])) {
          if (parseInt(datearray1[1]) === parseInt(datearray2[1])) {
            if (parseInt(datearray1[0]) <= parseInt(datearray2[0])) {
              let query = '?start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59' + searchquery + mtcquery + acntQuery
              datequery = '&start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59'

              this.props.getMovieOrderList(query, this.props.headers)
            } else {
              this.openDialog()
            }
          }
          if (parseInt(datearray1[1]) < parseInt(datearray2[1])) {
            let query = '?start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59' + searchquery + mtcquery + acntQuery
            datequery = '&start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59'

            this.props.getMovieOrderList(query, this.props.headers)
          }
          if (parseInt(datearray1[1]) > parseInt(datearray2[1])) {
            this.openDialog()
          }
        } else {
          if (parseInt(datearray1[2]) < parseInt(datearray2[2])) {
            let query = '?start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59' + searchquery + mtcquery + acntQuery
            datequery = '&start=' + date1 + ' 00:00:00' + '&end=' + date2 + ' 23:59:59'

            this.props.getMovieOrderList(query, this.props.headers)
          } else {
            this.openDialog()
          }
        }
      }
    }
  }

  _handleMovieChange (value) {
    if (value.length > 2) {
      this.setState({
        movieName: value
      })
      let type = '?type=movie'
      let q = '&q=' + value
      let query = type + q
      this.props.getAllFilters(query, this.props.headers)
    } else {
      this.setState({
        movieName: value
      }, () => {
        mtcquery = '&movie=' + this.state.movieName + '&theatre=' + this.state.theatreName + '&city=' + this.state.cityName
      })
    }
  }

  setMovie (value) {
    this.setState({
      movieName: value
    })
  }

  _handleTheatreChange (value) {
    if (value.length > 2) {
      this.setState({
        theatreName: value
      })
      let type = '?type=theatre'
      let q = '&q=' + value
      let query = type + q
      this.props.getAllFilters(query, this.props.headers)
    } else {
      this.setState({
        theatreName: value
      }, () => {
        mtcquery = '&movie=' + this.state.movieName + '&theatre=' + this.state.theatreName + '&city=' + this.state.cityName
      })
    }
  }

  setTheatre (value) {
    this.setState({
      theatreName: value,
      theatre: []

    })
  }

  _handleCityChange (value) {
    if (value.length > 2) {
      this.setState({
        cityName: value
      })
      let type = '?type=city'
      let q = '&q=' + value
      let query = type + q
      this.props.getAllFilters(query, this.props.headers)
    } else {
      this.setState({
        cityName: value
      }, () => {
        mtcquery = '&movie=' + this.state.movieName + '&theatre=' + this.state.theatreName + '&city=' + this.state.cityName
      })
    }
  }

  setCity (value) {
    this.setState({
      cityName: value
    })
  }

  _handleAccountTypeChange (value) {
    if (value.length > 2) {
      this.setState({
        accountTypeName: value
      })
      acntQuery = '&account=' + this.state.accountTypeName
      let type = '?type=account'
      let q = '&q=' + value
      let query = type + q
      this.props.getAllFilters(query, this.props.headers)
    } else {
      this.setState({
        accountTypeName: value
      }, () => {
        acntQuery = '&account=' + this.state.accountTypeName
      })
    }
  }

  setAccountType (value) {
    this.setState({
      accountTypeName: value
    })
  }

  _handleSearchChange (value) {
    if (typeof value !== 'undefined') {
      this.setState({
        searchQuery: value
      })
    }
  }

  _handlePageChange (current, pageSize) {
    this.setState({
      current_page: current
    })

    this.pageChange(current)
  }

  searchOrder () {
    if (this.state.searchQuery !== '') {
      if (chipset.indexOf(this.state.searchQuery) === -1) {
        chipset.push(this.state.searchQuery)
        this.setState({
          chips: chipset
        })
        this.search(chipset)
      }
    }
  }

  removeChip (index) {
    chipset.splice(index, 1)
    this.setState({
      chips: chipset,
      searchQuery: ''
    }, () => {
      this.search(chipset)
    })
  }

  search (val) {
    if (chipset.length === 0) {
      if(mtcquery==='' && acntQuery===''){
          reset_btn_show = false
          disable_download = false
      }
      else{
          reset_btn_show = true
          disable_download = false
      }
    }
    else {
      reset_btn_show = true
      disable_download = false
    }
    searchquery = ''
    if (this.state.date1 === null || this.state.date2 === null) {
      datequery = ''
    } else {
      datequery = '&start=' + this.state.date1 + ' 00:00:00' + '&end=' + this.state.date2 + ' 23:59:59'
    }
    let query = ''
    let str = ''

    if (val.length === 0) {
      query = '?search=' + mtcquery + datequery
    } else {
      query = ''
      for (let i = 0; i < val.length; i++) {
        if (val.length === 1) {
          str += '?search=' + val[i]
          searchquery += '&search=' + val[i]
        } else {
          if (i === 0) {
            str += '?search=' + val[i]
            searchquery += '&search=' + val[i]
          } else {
            str += ',' + val[i]
            searchquery += ',' + val[i]
          }
        }
      }

      query = str + mtcquery + datequery+acntQuery
    }

    this.props.getMovieOrderList(query, this.props.headers)
  }

  pageChange (val) {
    if (this.state.date1 === null || this.state.date2 === null) {
      datequery = '&start=' + '&end='
      let query = '?page=' + val + searchquery + mtcquery + datequery + acntQuery
      this.props.getMovieOrderList(query, this.props.headers)
    } else {
      let query = '?page=' + val + searchquery + mtcquery + datequery + acntQuery
      this.props.getMovieOrderList(query, this.props.headers)
    }
  }

  download () {
    let dateRange
    let token = localStorage.getItem('key')
    contentHeaders['Authorization'] = 'token' + ' ' + token
    let obj1 = {
      headers: contentHeaders,
      url: URLS.GETORDERDOWNLOAD
    }
    if (this.state.date1 === null || this.state.date2 === null) {
      let Token = '?token=' + token
      window.location = URLS.GETORDERDOWNLOAD + Token + mtcquery + searchquery + acntQuery
    } else {
      datequery = '&start=' + '&end='
      let date1 = this.state.date1
      let date2 = this.state.date2
      let datearray1 = date1.split('/')
      let datearray2 = date2.split('/')
      let newdate1 = datearray1[0] + '/' + datearray1[1] + '/' + datearray1[2]
      let newdate2 = datearray2[0] + '/' + datearray2[1] + '/' + datearray2[2]
      dateRange = '?start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59'
      let Token = '&token=' + token
      window.location = URLS.GETORDERDOWNLOAD + dateRange + searchquery + mtcquery + acntQuery + Token
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.movieOrder.count !== newProps.movieOrder.count) {
      console.log('not equal')
      this.setState({
        current_page: 1
      })
    }

    this.setState({
      movie: newProps.movieFilter,
      theatre: newProps.theatreFilter,
      city: newProps.cityFilter,
      accountType: newProps.accountFilters
    })
  }

  componentDidMount () {
    this.setState({
      date1: cookie.load('back_date'),
      date2: cookie.load('current_date')

    }, () => {
      datequery = '&start=' + this.state.date1 + ' 00:00:00' + '&end=' + this.state.date2 + ' 23:59:59'
    })
  }

  resetAllFilter () {
    reset_btn_show = false
    disable_download = true
    this.setState({
      chips: [],
      searchQuery: '',
      FilterList: {},
      movieName: '',
      theatreName: '',
      cityName: '',
      date1: null,
      date2: null,
      accountTypeName: '',
      theatre: [],
      city: [],
      movie: []
    }, () => {
      searchArray = []
      chipset = []
      searchquery = ''
      mtcquery = ''
      datequery = ''
      acntQuery = ''
      movies = []
      acntQuery = ''
      let query = '?start=' + '&end='
      this.props.resetAll(query, this.props.headers)
    })
  }

  componentWillUnmount () {
    chipset = []
    searchquery = ''
    reset_btn_show = false
    mtcquery = ''
    datequery = ''
    acntQuery = ''
  }

  render () {

    let current_date = new Date()
    movies = _.map(_.uniq(_.pluck(this.state.movie, 'title')), function (c) {
      return c
    })

    let theatres = _.map(_.uniq(_.pluck(this.state.theatre, 'title')), function (c) {
      return c
    })
    let cities = _.map(_.pluck(this.state.city, 'name'), function (c) {
      return c
    })
    let accountType = _.map(_.uniq(_.pluck(this.state.accountType, 'account')), function (c) {
      return c
    })
    if (typeof this.props.movieOrder.results === 'undefined' || this.props.movieOrder.results.length === 0) {
      noData = true
      disable_download_btn = true
    } else {
      if (disable_download === true) {
        disable_download_btn = true
        noData = false
      } else {
        noData = false
        disable_download_btn = false
      }
    }
    console.log(theatres,"th")
      console.log(this.state.theatre,"")

    return (
      <Layout >
        <div className="page">
          <Head>
            <title>Per Order Report</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel='stylesheet' href='/static/css/perorderreportcontainer.css'/>
          </Head>
          <h2 className="main_heading">Per Order Transaction</h2>
          <section className="md-grid margin_left_15">
            <Autocomplete
              id="search0"
              label="Search"
              className="md-cell md-cell--4"
              onChange={this._handleSearchChange}
              data={[]}
              value={this.state.searchQuery}
            />
            <div className=" md-cell md-cell--2">
              <Button className="search_btn" raised primary type="submit" label="Search" onClick={() => {
                this.searchOrder()
              }}/>
            </div>
            <div className=" md-cell md-cell--6 chip-list">
              {
                this.state.chips.map((chip, i) => (
                  <Chip
                    key={i}
                    label={chip}
                    Usernameavatar={<Avatar random>{chip[0]}</Avatar>}
                    removable
                    onClick={() => {
                      this.removeChip(i)
                    }}
                  />
                ))
              }
            </div>
          </section>

          <section className="md-grid margin_left_15">
            <div className="md-cell--12">
              <div className="md-grid">
                {((this.props.user !== null) && (this.props.user.group !== null) && (this.props.user.group.indexOf('SuperAdmin') > -1))
                  ? <Autocomplete
                    id="search"
                    label="Select Account Type"
                    className="md-cell--2 "
                    onChange={this._handleAccountTypeChange}
                    data={accountType}
                    value={this.state.accountTypeName}
                    onAutocomplete={this.setAccountType}
                    style={{marginRight: '12px'}}
                  /> : <span></span>
                }
                <Autocomplete
                  id="movie"
                  label="Select Movie"
                  className="md-cell--2 "
                  onChange={this._handleMovieChange}
                  data={movies}
                  value={this.state.movieName}
                  onAutocomplete={this.setMovie}
                  style={{marginRight: '12px'}}
                />
                <Autocomplete
                  id="theatre"
                  label="Select theatre"
                  className="md-cell--3 "
                  onChange={this._handleTheatreChange}
                  data={theatres}
                  value={this.state.theatreName}
                  onAutocomplete={this.setTheatre}
                  style={{marginRight: '12px'}}
                />
                <Autocomplete
                  id="search3"
                  label="Select city"
                  className="md-cell--2"
                  onChange={this._handleCityChange}
                  data={cities}
                  value={this.state.cityName}
                  onAutocomplete={this.setCity}
                  style={{marginRight: '12px'}}
                />
                <DatePicker
                  id="fully-controlled-date1"
                  label="Select start date"
                  locales="en-IN"
                  autoOk
                  maxDate={current_date}
                  displayMode="portrait"
                  className="md-cell--2"
                  visible={this.state.visible1}
                  value={this.state.date1}
                  onChange={this._handleDate1Change}
                  onVisibilityChange={this._handleDate1VisibilityChange}
                />
                <Button icon onClick={this._resetDate1} className="md-cell--bottom">close</Button>
                <DatePicker
                  id="fully-controlled=date2"
                  label="Select end date"
                  displayMode="portrait"
                  autoOk
                  maxDate={current_date}
                  locales="en-IN"
                  className="md-cell--2"
                  visible={this.state.visible2}
                  value={this.state.date2}
                  onChange={this._handleDate2Change}
                  onVisibilityChange={this._handleDate2VisibilityChange}
                />
                <Button icon onClick={this._resetDate2} className="md-cell--bottom">close</Button>
                <Button style={{marginRight: '24px', marginLeft: '0px'}} className='filter_btn' raised primary
                        type="submit" label="Filter"
                        onClick={() => {
                          this.filter()
                        }}/>
                {
                  (reset_btn_show === true) ? <Button className="filter_btn reset_filter" raised type="reset" label="Reset All" onClick={() => {
                    this.resetAllFilter()
                  }}/> : <span></span>
                }

              </div>
            </div>
            <Dialog
              id="speedBoost"
              visible={this.state.visible}
              title=""
              onHide={this.closeDialog}
              aria-labelledby="speedBoostDescription"
              dialogStyle={{width: '40%', overflowX: 'hidden'}}
              modal
              actions={[{
                onClick: this.closeDialog,
                primary: true,
                label: 'Close'
              }]}>
              <div id="speedBoostDescription" className="md-color--secondary-text">
                <div className="date_message">
                  End Date should be ahead of Start Date
                </div>
              </div>
            </Dialog>
          </section>

          <section className="md-grid margin_left_15">
            {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
            <DataTable plain>
              <TableHeader >
                <TableRow >
                  <TableColumn className="table_column">Book Id</TableColumn>
                  <TableColumn className="table_column">Transaction Id</TableColumn>
                  <TableColumn className="table_column">Transaction Date</TableColumn>
                  <TableColumn className="table_column">Cinema Name</TableColumn>
                  <TableColumn className="table_column">Movie Name</TableColumn>
                  <TableColumn className="table_column">Tickets</TableColumn>
                  <TableColumn className="table_column">Ticket Amount</TableColumn>
                  <TableColumn className="table_column">Booking Fee Amount</TableColumn>
                  <TableColumn className="table_column">Cinema Pg Amount</TableColumn>
                  <TableColumn className="table_column">Commission Share</TableColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(typeof this.props.movieOrder.results === 'undefined')
                  ? <TableRow></TableRow> : this.props.movieOrder.results.map((order, i) => (
                    <TableRow key={i}>
                      <TableColumn className="table_column">{order.book_id}</TableColumn>
                      <TableColumn className="table_column">{order.transaction_id}</TableColumn>
                      <TableColumn className="table_column">{order.transaction_date}</TableColumn>
                      <TableColumn className="table_column adjust_column">{order.theatre_name}</TableColumn>
                      <TableColumn className="table_column adjust_column">{order.movie_name}</TableColumn>
                      <TableColumn className="table_column">{order.tickets}</TableColumn>
                      <TableColumn className="table_column">{order.ticket_amount}</TableColumn>
                      <TableColumn className="table_column">{order.booking_fee_amount}</TableColumn>
                      <TableColumn className="table_column">{order.pg_amount}</TableColumn>
                      <TableColumn className="table_column">{order.commission_share}</TableColumn>
                    </TableRow>))
                }

              </TableBody>
            </DataTable>
          </section>
          {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
            className="smile">:(</span></p></div>}

          <Button disabled={disable_download_btn} className="download_btn_disabled" raised primary type="submit"
                  label="Download report" onClick={() => {
                    this.download()
                  }}/>
          <div className="pagenation">
            <Pagination
              selectComponentClass={Select}
              defaultPageSize={100}
              defaultCurrent={1}
              current={this.state.current_page}
              onChange={this._handlePageChange}
              total={this.props.movieOrder.count}
            />
          </div>
          {scrollup}

          <footer>
            <script src="/static/js/filesaver.min.js"/>
          </footer>

          <style jsx>{`

                        `}
          </style>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {

    movieOrder: {
      ...state.data.movieOrderDetail
    },

    isFetching: state.data.isFetching,
    movieFilter: state.data.movieFilter,
    cityFilter: state.data.cityFilter,
    theatreFilter: state.data.theatreFilter,
    user: state.auth.user,
    accountFilters: state.data.accountFilter

  }

  return state
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAllFilters: (query, headers) => {
      dispatch(getFilters(query, headers))
    },
    getMovieOrderList: (query, headers) => {
      dispatch(movieOrderList(query, headers))
    },
    resetAll: (query, headers) => {
      return dispatch(movieOrderList(query, headers))
    }

  }
}
ReportConatiner.propTypes = {
    movieOrder:PropTypes.object,
    isFetching:PropTypes.boolean,
    movieFilter:PropTypes.array,
    cityFilter:PropTypes.array,
    theatreFilter:PropTypes.array,
    user:PropTypes.object,
    accountFilters:PropTypes.array,
    getMovieOrderList:PropTypes.func,
    headers:PropTypes.object,
    resetAll:PropTypes.func,
    getAllFilters:PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportConatiner)
