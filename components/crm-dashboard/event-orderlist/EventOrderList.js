import React from 'react'
import Avatar from 'react-md/lib/Avatars'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Button from 'react-md/lib/Buttons/Button'
import _ from 'underscore'
import Pagination from 'rc-pagination'
import Chip from 'react-md/lib/Chips'
import { Router } from '../../../routes'
import Autocomplete from 'react-md/lib/Autocompletes'
import Snackbar from 'react-md/lib/Snackbars'
import Loader from '../../common/pageLoader'
import SelectField from 'react-md/lib/SelectFields';
import $ from 'jquery'
import { scrollup } from '../../common/scrollup'
import {isActiveShow} from '../../common/utils'

let tag = []
let searchArray = []
let chipset = []
let totalPage = 0
let index_page = 0
let noData = false
const today = new Date()
const twoMonthsAgo = new Date(new Date().setMonth(today.getMonth() - 2))
const oneYearFuture = new Date(new Date().setYear(today.getFullYear() + 1))
let todayAt1522 = null
let showDateTime = false
let closeBtn = false
let disableFilter = false

export class EventOrderList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      tags: [],
      show_date_custom: null,
      show_time: null,
      event: {value: '', label: ''},
      chips: [],
      pages: this.props.OrderPage,
      searchQuery: '',
      current: 1,
      toasts: [],
      autohide: true,

    }

    this._handleEventChange = this._handleEventChange.bind(this)
    this._handleShowdateChange = this._handleShowdateChange.bind(this)
    this._handleShowtimeChange = this._handleShowtimeChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.search = this.search.bind(this)
    this._handleSearchChange = this._handleSearchChange.bind(this)
    this.removeChip = this.removeChip.bind(this)
    this._removeToast = this._removeToast.bind(this)
    this._toastMultiple = this._toastMultiple.bind(this)
    this._setEventChange = this._setEventChange.bind(this)
    this.openBox = this.openBox.bind(this)
  }

  componentWillMount () {

  }

  componentWillUnmount () {
    chipset = []
  }

  componentDidMount () {
    if (typeof window === 'undefined') {
      global.window = {}
    } else {
      $(window).scroll(function () {
        let $scroll_pos = 0
        $scroll_pos = $(window).scrollTop()
        if ($scroll_pos >= 52) {
          $('.search_top').removeClass('search_sec')
          $('.search_top').addClass('search_fixed')
        } else {
          $('.search_top').addClass('search_sec')
          $('.search_top').removeClass('search_fixed')
        }
      })
    }

    this.setState({
      pages: this.props.OrderPage,
      orders: this.props.Orders,
      filterEvent: [],
      setEvent: ''

    })
  }


  _setEventChange (value,i,k) {

    if (index_page === 0) {
      this.setState({
        setEvent: ''
      }, () => {
        this.handelFilter('call');
      })
    } else {
      this.setState({
        setEvent: value
      },()=>{
        if (k instanceof Array) {
          this.props.filtersDateTime(k[i].id)
        }
      });


    }
  }

  _handleEventChange (val) {

    index_page = val.length
    if (val.length > 2) {
      this.setState({
        setEvent: val
      })
      this.props.eventFilterFunction(val, this.props.headers)
    } else if (index_page === 0) {
      this.setState({
        setEvent: ''
      }, () => {
        this.props.clearDateTimeList()
        this.handelFilter('call')
      })
    }
  }

  _handleShowdateChange (val) {
    if (this.state.show_date_custom === null) {
      closeBtn = false
    }

    if (val === 'close') {
      this.setState({
        show_date_custom: null
      }, () => {
        if (closeBtn) {
          disableFilter = true
          this.handelFilter('disable')
        }
      })
    } else {
      this.setState({show_date_custom: val}, () => {
        disableFilter = false
      })
    }
  }

  _handleShowtimeChange (val) {

    if (this.state.show_time === null) {
      closeBtn = false
    }
    if (val === 'close') {
      todayAt1522 = null
      this.setState({
        show_time: null
      }, () => {
        if (closeBtn) {
          disableFilter = true
          this.handelFilter('disable')
        }
      })
    } else {
      let time = val.split(':')
      todayAt1522 = new Date
      todayAt1522.setHours(time[0])
      todayAt1522.setMinutes(time[1])
      this.setState({
        show_time: val
      }, () => {
        disableFilter = false
      })
    }

  }

  _handleSearchChange (target) {

    let val = this.refs.search.value
    this.setState({
      searchQuery: val
    })
    if (this.props.OrderPage !== 0) {
      if (target.charCode === 13 && val !== '') {
        this.setState({
          searchQuery: val
        })
        this.searchEnter(val)
      }
    }
  }

  searchEnter (val) {
    this.refs.search.value = ''
    if (val !== '') {
      let query1 = val
      chipset.push(val)
      this.setState({
        chips: chipset
      })
      this.handelFilter('search')
    }
  }

  search () {}

  removeChip (index) {

    this.refs.search.value = ''
    this.setState({
      current: 1,
    })

    let showDate
    let showTime
    if (this.state.show_date_custom === null) {
      showDate = ''

    }
    else {
      showDate = this.state.show_date_custom

    }
    if (this.state.show_time === null) {

      showTime = ''
    }
    else {

      showTime = this.state.show_time
    }

    let eventName = this.state.setEvent
    let query = {
      event: eventName,
      show_date_custom: showDate,
      show_time: showTime
    }

    chipset.splice(index, 1)
    this.setState({
      chips: chipset
    })
    this.props.filters(query, chipset)
  }

  handelFilter (val) {

    closeBtn = true

    this.setState({
      current: 1,
    })

    let showDate
    let showTime
    if (this.state.show_date_custom === null) {
      showDate = ''
    }
    else {
      showDate = this.state.show_date_custom
    }
    if (this.state.show_time === null) {
      showTime = ''
    }
    else {
      showTime = this.state.show_time
    }

    let eventName = this.state.setEvent

    let query = {
      event: eventName,
      show_date_custom: showDate,
      show_time: showTime
    }

    if ((eventName !== '' && eventName !== null) || (showDate !== '' && showDate !== null) || (showTime !== '' && showTime !== null)) {
      this.props.filters(query, chipset)
    } else if (disableFilter && val === 'disable') {
      this.props.filters(query, chipset)
    } else if (val === 'search') {
      this.props.filters(query, chipset)
    } else if (val === 'call') {
      this.props.filters(query, chipset)
    } else {
      disableFilter = false
    }

  }

  onChange (current, pageSize) {

    this.setState({
      current: current,
    })

    this.props.pageNumber(current)

  }

  selectOptions () {
    console.log('e')
  }

  handleClickDetailPage (id) {
    Router.pushRoute('eventorder', {id: id})
  }

  handleResendButton (id) {

    this.props.getEventResendData(id, this.props.headers).then(res => {
      this.openBox(res)
    })
  }

  handleCancelButton (id) {
    this.props.getEventCancelData(id, this.props.headers).then(res => {
      this.openBox(res)
    })
  }

  handleRefundButton (id) {
    this.props.getEventRefundData(id, this.props.headers).then(res => {
      this.openBox(res)
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

    if (data.Message) {
      toastr.success(data.Message)
    } else if (data.error) {
      toastr.warning(data.error)
    } else if (data === 'error') {
      toastr.error('Sryy...some error has been occured!!!!!!!!')
    } else {
      toastr.success(data.success)
    }

  }

  //start snackbar

  _removeToast () {
    const [, ...toasts] = this.state.toasts
    this.setState({toasts})
  }

  _toastMultiple (id, val) {

    if (val === 'cancel') {
      const toasts = this.state.toasts.slice()
      toasts.push({
        text: 'Are You Sure...You Wanna Do This ????',
        action: {
          label: 'Yes!!',
          onClick: () => {
            this.handleCancelButton(id)
          },
        },
      })

      this.setState({toasts})
    } else if (val === 'resend') {

      const toasts = this.state.toasts.slice()
      toasts.push({
        text: 'Are You Sure...You Wanna Do This ????',
        action: {
          label: 'Yes!!',
          onClick: () => {
            this.handleResendButton(id)
          },
        },
      })

      this.setState({toasts})
    } else if (val === 'refund') {
      const toasts = this.state.toasts.slice()
      toasts.push({
        text: 'Are You Sure...You Wanna Do This ????',
        action: {
          label: 'Yes!!',
          onClick: () => {
            this.handleRefundButton(id)
          },
        },
      })

      this.setState({toasts})
    }

  }

  //end snackbar

  render () {
    if (this.props.OrderPage === 0) {
      noData = true
    } else {
      noData = false
    }

    let eventTitlelist = _.map(_.pluck(this.props.eventFilter, 'title'), function (c) { return c})
    let eventDateItems = _.uniq(_.map(_.pluck(this.props.EventordersDateTime, 'date'), function (c) { return c}))
    let eventTimeItems = _.uniq(_.map(_.pluck(this.props.EventordersDateTime, 'start'), function (c) { return c}))

    const {rows, page, rowsPerPage} = this.state

    return (
      <div className="page">

        <div className="content-wrapper full_tag">

          <section className="content">
            <h1 className="main_heading_crm">Event Orders</h1>
            <section className="search_top search_sec">

              <div className="md-grid">

                <input placeholder="search......." className="md-cell--6 search" ref="search" type="text" id="txtSearch"
                       onKeyPress={this._handleSearchChange}/>

                  {noData ?
                      <Button id="btnSearch" disabled className="noDrop" style={{margin: '0 0 0 12px'}} raised
                              primary type="submit" label="Search"/> :
                      <Button id="btnSearch" style={{margin: '0 0 0 12px'}} raised primary
                              type="submit" label="Search" onClick={() => {this.searchEnter(this.refs.search.value)}}/>}


                <div className="md-cell--5 chip_list adjust_chip">
                    {
                        this.state.chips.map((chip, i) => (
                            <Chip
                                key={i}
                                label={chip}
                                avatar={<Avatar random>{chip[0]}</Avatar>}
                                removable
                                onClick={() => {this.removeChip(i)}}
                            />
                        ))
                    }
                </div>

              </div>
            </section>

            <form className="filter_sec">
              <div className=" md-grid">


                <Autocomplete
                  id="events"
                  label="Select Event"
                  className="md-cell--3"
                  onChange={this._handleEventChange}
                  onAutocomplete={this._setEventChange}
                  data={this.props.eventFilter}
                  dataLabel='title'
                  filter={null}
                  style={{marginTop: '-25px',width:'27%'}}
                />


                    <SelectField
                        disabled={eventDateItems.length==0||this.state.setEvent==''}
                        id="dates"
                        iconChildren={null}
                        label="Dates"
                        placeholder="Select Event Date"
                        menuItems={eventDateItems}
                        itemLabel="date"
                        itemValue="date"
                        className="md-cell--3"
                        value={this.state.show_date_custom}
                        onChange={this._handleShowdateChange}
                        style={{margin: '-25px 0 0 22px',width:'27%'}}
                    />
                    <span className="adjustIcon" onClick={() => this._handleShowdateChange('close')}><i
                        className="material-icons">cancel</i></span>

                {/*<Autocomplete*/}
                    {/*id="events"*/}
                    {/*label="Date"*/}
                    {/*className="md-cell--3"*/}
                    {/*onChange={this._handleShowdateChange}*/}
                    {/*onAutocomplete={this._handleShowdateChange}*/}
                    {/*data={eventDateItems}*/}
                    {/*dataLabel='date'*/}
                    {/*filter={null}*/}
                    {/*style={{margin: '-25px 0 0 22px'}}*/}
                {/*/>*/}
                {/*<span className="adjustIcon" onClick={() => this._handleShowdateChange('close')}><i*/}
                {/*className="material-icons">cancel</i></span>*/}


                {/*<DatePicker*/}
                  {/*id="appointmentLandscape"*/}
                  {/*autoOk*/}
                  {/*iconBefore={false}*/}
                  {/*label="Select Date"*/}
                  {/*defaultValue={today}*/}
                  {/*locales="en-IN"*/}
                  {/*className="md-cell--3"*/}
                  {/*displayMode="landscape"*/}
                  {/*value={this.state.show_date_custom}*/}
                  {/*onChange={this._handleShowdateChange}*/}
                  {/*style={{margin: '-25px 0 0 22px'}}*/}
                {/*/>*/}
                {/*<span className="adjustIcon" onClick={() => this._handleShowdateChange('close')}><i*/}
                  {/*className="material-icons">cancel</i></span>*/}

               <SelectField
                    id="time"
                    label="Time"
                    placeholder="Select Show Time"
                    menuItems={eventTimeItems}
                    disabled={eventTimeItems.length==0||this.state.setEvent==''}
                    iconChildren={null}
                    itemLabel="start"
                    itemValue="start"
                    className="md-cell--3"
                    value={this.state.show_time}
                    onChange={this._handleShowtimeChange}
                    style={{margin: '-25px 0 0 22px',width:'27%'}}
                />
                <span className="adjustIcon" onClick={() => this._handleShowtimeChange('close')}><i
                className="material-icons">cancel</i></span>
                {/*<Autocomplete*/}
                    {/*id="events"*/}
                    {/*label="Time"*/}
                    {/*className="md-cell--3"*/}
                    {/*onChange={this._handleShowtimeChange}*/}
                    {/*onAutocomplete={this._handleShowtimeChange}*/}
                    {/*data={eventTimeItems}*/}
                    {/*dataLabel='start'*/}
                    {/*filter={null}*/}
                    {/*style={{margin: '-25px 0 0 22px'}}*/}
                {/*/>*/}
                {/*<span className="adjustIcon" onClick={() => this._handleShowtimeChange('close')}><i*/}
                {/*className="material-icons">cancel</i></span>*/}
                {/*<TimePicker*/}
                  {/*id="locale2"*/}
                  {/*label="Select Time"*/}
                  {/*locales="en-GB"*/}
                  {/*defaultValue={todayAt1522}*/}
                  {/*className="md-cell--3 "*/}
                  {/*placeholder="Select time"*/}
                  {/*value={todayAt1522}*/}
                  {/*onChange={this._handleShowtimeChange}*/}
                  {/*style={{margin: '-25px 0 0 22px'}}*/}
                {/*/>*/}
                {/*<span className="adjustIcon" onClick={() => this._handleShowtimeChange('close')}><i*/}
                  {/*className="material-icons">cancel</i></span>*/}
                <Button  style={{marginLeft:'35px'}} className="md-cell--1 md-cell--2-offset" onClick={this.handelFilter.bind(this)} raised primary
                        label="Filter"/>

              </div>

            </form>




            <div className="shadow">
              {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
              <DataTable plain>
                <TableHeader >
                  <TableRow>
                    <TableColumn>Book Id<i className="material-icons page_view">details</i></TableColumn>
                    <TableColumn>User Mobile</TableColumn>
                    <TableColumn>User Email</TableColumn>
                    <TableColumn>Event</TableColumn>
                    <TableColumn>Order State</TableColumn>
                    <TableColumn>Resend Ticket</TableColumn>
                    {/*<TableColumn></TableColumn>*/}
                    <TableColumn>Actions</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.props.Orders.map((order, i) => (
                      <TableRow key={i}>
                        <TableColumn className="table_column" style={{cursor: 'pointer', color: '#0b66ad'}}
                                     onClick={() => {this.handleClickDetailPage(order.id)}}>{order.book_id}</TableColumn>
                        <TableColumn className="table_column">{order.user_mobile}</TableColumn>
                        <TableColumn className="table_column">{order.user_email}</TableColumn>
                        <TableColumn className="table_column adjust_column">{order.event_name}</TableColumn>
                        <TableColumn className="table_column ">{order.order_state}</TableColumn>
                        <TableColumn className="table_column ">
                          {(isActiveShow(order.show_date_custom))?
                              <Button onClick={() => this._toastMultiple(order.id, 'resend')} primary flat
                                             label="Resend"/>:null}
                                             </TableColumn>
                        <TableColumn className="table_column ">{this.props.ShowCancel &&
                        <div><Button primary onClick={() => this._toastMultiple(order.id, 'cancel')} flat
                                     label="Cancel"/></div>}</TableColumn>
                      </TableRow>))
                  }

                </TableBody>
              </DataTable>

              {noData &&
              <div className="NotFound"><p><span className="wdata">No data Found</span><span className="smile">:(</span>
              </p></div>}
              <Snackbar style={{width: ' 48%', height: '67px'}} toasts={this.state.toasts}
                        onDismiss={this._removeToast}/>

            </div>
            <div className="pagenation">
              <Pagination
                defaultPageSize={30}
                defaultCurrent={1}
                current={this.state.current}
                onChange={this.onChange}
                total={this.props.OrderPage}
              />
            </div>


          </section>

          {scrollup}

        </div>
        <style jsx>{``}</style>
      </div>
    )
  }
}

export  default  EventOrderList