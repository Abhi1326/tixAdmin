import Button from 'react-md/lib/Buttons/Button'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataTable from 'react-md/lib/DataTables/DataTable'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import { getFilteredTheatresReport, getFilters } from '../../../actions/moveOrderActions'
import Head from 'next/head'
import Layout from '../../common/layout'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Autocomplete from 'react-md/lib/Autocompletes'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import Loader from '../../common/pageLoader'
import Chip from 'react-md/lib/Chips'
import Avatar from 'react-md/lib/Avatars'
import { contentHeaders } from '../../common/headers'
import { URLS } from '../../common/url-constants'
import cookie from 'react-cookie'
import _ from 'underscore'
import Dialog from 'react-md/lib/Dialogs'
import { Styles } from '../../common/utils'
import { scrollup } from '../../common/scrollup'
import PropTypes from 'prop-types'



let searchArray = []
let chipset = []
let searchquery = ''
let datequery = ''
let noData = false
let acntQuery = ''
let reset_btn_show=false;
let disable_download = false;
let disable_download_btn = false;


class TheatreReportConatiner extends Component {

  constructor (props) {
    super(props)
    this.state = {
      date1: null,
      date2: null,
      visible1: false,
      visible2: false,
      chips: [],
      searchQuery: '',
      accountTypeName: '',
      accountType: [],
      visible: false,
      current_page: 1

    }

    this._resetDate1 = this._resetDate1.bind(this)
    this._resetDate2 = this._resetDate2.bind(this)
    this._handleDate1VisibilityChange = this._handleDate1VisibilityChange.bind(this)
    this._handleDate2VisibilityChange = this._handleDate2VisibilityChange.bind(this)
    this._handleDate1Change = this._handleDate1Change.bind(this)
    this._handleDate2Change = this._handleDate2Change.bind(this)
    this._handleSearchChange = this._handleSearchChange.bind(this)
    this._handlePageChange = this._handlePageChange.bind(this)
    this._handleAccountTypeChange = this._handleAccountTypeChange.bind(this)
    this.setAccountType = this.setAccountType.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)

  }

  componentWillUnmount () {
    chipset = []
    searchquery = ''
    reset_btn_show = false
    acntQuery=''
    datequery=''

  }

  componentWillReceiveProps (newProps) {
    if (this.props.count !== newProps.count) {
      this.setState({
        current_page: 1
      })
    }
    this.setState({
      accountType: newProps.filters,
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

  _resetDate1 () {
    this.setState({date1: null})

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

  _resetDate2 () {
    this.setState({date2: null})

  }

  _handleDate1Change (value) {
    this.setState({date1: value})
  }

  _handleDate2Change (value) {
    this.setState({date2: value})
  }

  _handleDate1VisibilityChange (visible) {
    this.setState({visible1: visible})
  }

  _handleDate2VisibilityChange (visible) {
    this.setState({visible2: visible})
  }

  _handleSearchChange (value) {

    if (typeof value !== 'undefined') {
      this.setState({
        searchQuery: value
      })
    }

  }

  _handleAccountTypeChange (value) {
    if (value.length > 2) {
      this.setState({
        accountTypeName: value
      })
      acntQuery = '&account=' + this.state.accountTypeName;
      let type = '?type=account';
      let q = '&q=' + value;
      let query = type + q;
      this.props.getAllFilters(query, this.props.headers)
    }

    else {
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

  _handlePageChange (current, pageSize) {
    this.setState({
      current_page: current
    })
    this.pageChange(current)
  }

  searchTheatre () {
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

  search (val) {

    if(chipset.length===0){
      if(acntQuery===''&& datequery===''){
          reset_btn_show=false
          disable_download=false
      }
      else{
            reset_btn_show=true
            disable_download=false
        }

    }
    else{
      reset_btn_show=true
      disable_download=false

    }
    searchquery = ''
    if (this.state.date1 === null || this.state.date2 === null) {
      datequery = '&start=' + '&end='
    }
    else {
      datequery = '&start=' + this.state.date1 + ' 00:00:00' + '&end=' + this.state.date2 + ' 23:59:59'
    }
    let query = ''
    let str = ''
    if (val.length === 0) {
      query = '?search=' + datequery + acntQuery
    }
    else {
      for (let i = 0; i < val.length; i++) {
        if (val.length === 1) {
          str += '?search=' + val[i]
          searchquery = '&search=' + val[i]
        }
        else {

          if (i === 0) {
            str += '?search=' + val[i]
            searchquery = '&search=' + val[i]
          }
          else {
            str += ',' + val[i]
            searchquery += ',' + val[i]
          }
        }
      }
      query += str + datequery + acntQuery
    }
    this.props.getFilteredTheatresReport(query, this.props.headers)
  }

  filterByDate () {
    datequery = ''
    if (this.state.date1 === null || this.state.date2 === null) {
      let accountTypeName = this.state.accountTypeName
      if(accountTypeName!==''||searchquery!==''||this.state.date1!==null||this.state.date2!==null){
        reset_btn_show=true;
        disable_download=false
      }
      else{
        reset_btn_show=false;
        disable_download=true
      }
      acntQuery = '&account=' + accountTypeName
      let query = '?start=' + '&end=' + searchquery + acntQuery
      this.props.getFilteredTheatresReport(query, this.props.headers)
    }
    else {
      reset_btn_show=true;
      disable_download=false
      let date1 = this.state.date1
      let date2 = this.state.date2
      let accountTypeName = this.state.accountTypeName
      acntQuery = '&account=' + accountTypeName
      let datearray1 = date1.split('/')
      let datearray2 = date2.split('/')
      let newdate1 = datearray1[0] + '/' + datearray1[1] + '/' + datearray1[2]
      let newdate2 = datearray2[0] + '/' + datearray2[1] + '/' + datearray2[2]
      if (parseInt(datearray1[2]) === parseInt(datearray2[2])) {
        if (parseInt(datearray1[1]) === parseInt(datearray2[1])) {
          if (parseInt(datearray1[0]) <= parseInt(datearray2[0])) {

            let query = '?start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59' + searchquery + acntQuery
            datequery = '&start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59'
            this.props.getFilteredTheatresReport(query, this.props.headers)
          }
          else {
            this.openDialog()
          }
        }
        if (parseInt(datearray1[1]) < parseInt(datearray2[1])) {

          let query = '?start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59' + searchquery + acntQuery
          datequery = '&start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59'
          this.props.getFilteredTheatresReport(query, this.props.headers)
        }
        if (parseInt(datearray1[1]) > parseInt(datearray2[1])) {
          this.openDialog()
        }
      }
      else {
        if (parseInt(datearray1[2]) < parseInt(datearray2[2])) {
          let query = '?start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59' + searchquery + acntQuery
          datequery = '&start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59'
          this.props.getFilteredTheatresReport(query, this.props.headers)
        }
        else {
          this.openDialog()
        }
      }
    }
  }

  removeChip (index) {
    chipset.splice(index, 1)
    this.setState({
      chips: chipset,
      searchQuery: ''
    })
    this.search(chipset)
  }

  filterTheatre (val) {
    let qs = '?' + 'start=' + val.date1 + '&end=' + val.date2
    this.props.getFilteredTheatresReport(qs, this.props.headers)
  }

  pageChange (val) {
    if (this.state.date1 === null || this.state.date2 === null) {
      datequery = '&start=' + '&end='
      let query = '?page=' + val + searchquery + datequery
      this.props.getFilteredTheatresReport(query, this.props.headers)
    }
    else {
      let query = '?page=' + val + searchquery + datequery
      this.props.getFilteredTheatresReport(query, this.props.headers)
    }
  }

  download () {
    let dateRange
    let token = localStorage.getItem('key')
    contentHeaders['Authorization'] = 'token' + ' ' + token
    let obj1 = {
      headers: contentHeaders,
      url: URLS.GETORDERDOWNLOAD,
    }
    if (this.state.date1 === null || this.state.date2 === null) {
      let Token = '?token=' + token
      window.location = URLS.GETTHEATREDOWNLOAD + Token + searchquery + acntQuery
    }
    else {
      datequery = '&start=' + '&end='
      let date1 = this.state.date1
      let date2 = this.state.date2
      let datearray1 = date1.split('/')
      let datearray2 = date2.split('/')
      let newdate1 = datearray1[0] + '/' + datearray1[1] + '/' + datearray1[2]
      let newdate2 = datearray2[0] + '/' + datearray2[1] + '/' + datearray2[2]
      dateRange = '?start=' + newdate1 + ' 00:00:00' + '&end=' + newdate2 + ' 23:59:59'
      let Token = '&token=' + token
      window.location = URLS.GETTHEATREDOWNLOAD + dateRange + searchquery + acntQuery + Token
    }
  }

  resetAllFilter () {
    reset_btn_show=false
    disable_download=true
    this.setState({
      date1: null,
      date2: null,
      chips: [],
      searchQuery: '',
      accountTypeName: '',
      accountType: [],
    }, () => {
      searchArray = []
      chipset = []
      searchquery = ''
      datequery = ''
      acntQuery = ''
      let query = '?start=' + '&end='
      this.props.resetAll(query, this.props.headers)
    })
  }

  render () {
    let current_date = new Date()

    let accountType = _.map(_.uniq(_.pluck(this.props.accountFilters, 'account')), function (c) {
      return c
    })
    if (typeof this.props.fullTheatreReport === 'undefined' || this.props.fullTheatreReport.length === 0) {
      noData = true
      disable_download_btn=true
    } else {
      if(disable_download===true){
        disable_download_btn=true
        noData=false
      }
      else {
        noData=false
        disable_download_btn=false
      }
    }

    return (
      <Layout >
        <div className="page theatre_report">
          <Head>
            <title>Theatre Report</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <link rel='stylesheet' href='/static/css/theatrereportcontainer.css'/>
          </Head>
          <h2 className="main_heading">Theatre Report</h2>
          <section className="md-grid margin_left_15">
            <Autocomplete
              id="search"
              label="Search"
              className="md-cell md-cell--4"
              onChange={this._handleSearchChange}
              data={[]}
              value={this.state.searchQuery}
            />
            <div className=" md-cell md-cell--2">
              <Button className="search_btn" raised primary type="submit" label="Search" onClick={() => {
                this.searchTheatre()
              }}/>
            </div>
            <div className=" md-cell md-cell--6 chip-list">
              {
                this.state.chips.map((chip, i) => (
                  <Chip
                    key={i}
                    label={chip}
                    avatar={<Avatar random>{chip[0]}</Avatar>}
                    removable
                    onClick={() => {
                      this.removeChip(i)
                    }}
                  />
                ))
              }
            </div>
            <div className="md-cell--12">
              <div className="md-grid">
                {((this.props.user !== null) && (this.props.user.group !== null) && (this.props.user.group.indexOf('SuperAdmin') > -1)) ?
                  <Autocomplete
                    id="search"
                    label="Select Account Type"
                    className="md-cell--2 "
                    onChange={this._handleAccountTypeChange}
                    data={accountType}
                    onAutocomplete={this.setAccountType}
                    value={this.state.accountTypeName}
                    style={{marginRight: '12px'}}
                  /> : <span></span>
                }
                <DatePicker
                  id="fully-controlled1"
                  label="Select start date"
                  displayMode="portrait"
                  className="md-cell--3"
                  locales="en-IN"
                  maxDate={current_date}
                  autoOk
                  visible={this.state.visible1}
                  value={this.state.date1}
                  onChange={this._handleDate1Change}
                  onVisibilityChange={this._handleDate1VisibilityChange}
                />
                <Button icon onClick={this._resetDate1} className="md-cell--bottom">close</Button>
                <DatePicker
                  id="fully-controlled2"
                  label="Select end date"
                  displayMode="portrait"
                  locales="en-IN"
                  autoOk
                  maxDate={current_date}
                  className="md-cell--3"
                  visible={this.state.visible2}
                  value={this.state.date2}
                  onChange={this._handleDate2Change}
                  onVisibilityChange={this._handleDate2VisibilityChange}
                />
                <Button icon onClick={this._resetDate2} className="md-cell--bottom">close</Button>
                <Button className="filter_btn" raised primary type="submit" label="Filter"
                        onClick={() => {
                          this.filterByDate()
                        }}/>
                {
                  (reset_btn_show===true)?<Button className="filter_btn reset_filter" raised type="reset" label="Reset All" onClick={() => {
                    this.resetAllFilter()
                  }}/>:<span></span>
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
                label: 'Close',
              }]}>
              <div id="speedBoostDescription" className="md-color--secondary-text">
                <div className="date_message">
                  End Date should be ahead of Start Date
                </div>
              </div>
            </Dialog>
          </section>

          <div id="theatre_table">
            {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
            <DataTable plain>
              <TableHeader >
                <TableRow >
                  <TableColumn className="prevent-grow ">Theatre Name</TableColumn>
                  <TableColumn className="prevent-grow ">Ticket Amount</TableColumn>
                  <TableColumn className="prevent-grow ">Tickets</TableColumn>
                  <TableColumn className="prevent-grow ">Booking Fee</TableColumn>
                  <TableColumn className="prevent-grow ">PG Charge</TableColumn>
                  <TableColumn className="prevent-grow ">Commission Share</TableColumn>
                  <TableColumn >City</TableColumn>
                  <TableColumn >Orders</TableColumn>
                </TableRow>
              </TableHeader>

              <TableBody>
                {
                  this.props.fullTheatreReport.map((theatre, i) => (
                    <TableRow key={i}>
                      <TableColumn >{theatre.name}</TableColumn>
                      <TableColumn>{theatre.ticket_amount}</TableColumn>
                      <TableColumn >{theatre.tickets}</TableColumn>
                      <TableColumn>{theatre.booking_fee}</TableColumn>
                      <TableColumn>{theatre.pg_charges}</TableColumn>
                      <TableColumn>{theatre.commission_charges}</TableColumn>
                      <TableColumn >{theatre.city}</TableColumn>
                      <TableColumn>{theatre.orders}</TableColumn>
                    </TableRow>
                  ))
                }
              </TableBody>
            </DataTable>
            {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
              className="smile">:(</span></p></div>}
          </div>
          <Button disabled={disable_download_btn} className="download_btn_disabled" raised primary type="submit"
                  label="Download report" onClick={() => {
            this.download()
          }}/>
          <div className="pagenation">
            <Pagination
              selectComponentClass={Select}
              defaultPageSize={30}
              defaultCurrent={1}
              current={this.state.current_page}
              onChange={this._handlePageChange}
              total={this.props.count}
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

    fullTheatreReport: state.data.fullTheatreReport.results || [],
    count: state.data.fullTheatreReport.count,
    isFetching: state.data.isFetching,
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
    getFilteredTheatresReport: (query, headers) => {
      dispatch(getFilteredTheatresReport(query, headers))
    },
    resetAll: (query, headers) => {
      return dispatch(getFilteredTheatresReport(query, headers))
    },
  }
}
TheatreReportConatiner.propTypes = {
    fullTheatreReport:PropTypes.array,
    count:PropTypes.number,
    isFetching:PropTypes.boolean,
    user:PropTypes.object,
    accountFilters:PropTypes.array,
    headers:PropTypes.object,
    getAllFilters:PropTypes.func,
    getFilteredTheatresReport:PropTypes.func,
    resetAll:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TheatreReportConatiner)