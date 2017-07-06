import React from 'react'
import Avatar from 'react-md/lib/Avatars'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Button from 'react-md/lib/Buttons/Button'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import Chip from 'react-md/lib/Chips'
import { Router } from '../../../routes'
import Loader from '../../common/pageLoader'
import $ from 'jquery'
import { scrollup } from '../../common/scrollup'
import Radio from 'react-md/lib/SelectionControls/Radio'
import Autocomplete from 'react-md/lib/Autocompletes'
import _ from 'underscore'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import SelectField from 'react-md/lib/SelectFields';



let tag = [];
let searchArray = [];
let chipset = [];
let noData = false;
let index_page = 0;
const today = new Date();
const twoMonthsAgo = new Date(new Date().setMonth(today.getMonth() - 2));
const oneYearFuture = new Date(new Date().setYear(today.getFullYear() + 1));
let todayAt1522 = null;
let disableFilter = false;
let closeBtn = false;
let reset = false;
let changeDisEn="";

export class ShowList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      shows: [],
      chips: [],
      searchQuery: '',
      pages: 0,
      current: 1,
      inlineValue:'',
      setCity:'',
      setMovie:'',
      setTheatreshow:'',
      show_date:null,
      show_time:null

    }

    this.onChange = this.onChange.bind(this)
    this.removeChip = this.removeChip.bind(this)
    this._handleSearchChange = this._handleSearchChange.bind(this)
    this._handleDisableButton = this._handleDisableButton.bind(this)
    this._handleUnableButton = this._handleUnableButton.bind(this)
    this.searchEnter = this.searchEnter.bind(this)
    this._handleInlineChange=this._handleInlineChange.bind(this)
    this._handleCityChange=this._handleCityChange.bind(this)
    this._setCityChange=this._setCityChange.bind(this)
    this._handleMovieshowChange=this._handleMovieshowChange.bind(this)
    this._setMovieshowChange=this._setMovieshowChange.bind(this)
    this._handleTheatreshowChange=this._handleTheatreshowChange.bind(this)
    this._setTheatreshowChange=this._setTheatreshowChange.bind(this)
    this._handleFilterShowdateChange=this._handleFilterShowdateChange.bind(this)
    this._handletimedateChange=this._handletimedateChange.bind(this)
  }

  _handleInlineChange (e) {
    this.setState({inlineValue: e.target.value},()=>{
      this.handelFilter();
    })
  }

  _handletimedateChange (val) {
    console.log(val,'---------->')
    if (this.state.show_time === '') {
      closeBtn = false
    }

    if (val === 'close') {
      this.setState({
        show_time: ''
      }, () => {
        if (closeBtn) {
          disableFilter = true
          this.handelFilter()
        }
      })
    } else {
      this.setState({show_time: val}, () => {
        disableFilter = false
      })
    }
  }

  _handleFilterShowdateChange (val) {

    if (this.state.show_date === null) {
      closeBtn = false
    }

    if (val === 'close') {
      this.setState({
        show_date: null,
        show_time:''
      }, () => {
        if (closeBtn) {
          disableFilter = true
            this.props.handleTimeChange('');
          this.handelFilter()

        }
        this.props.clearTimeList()
      })
    } else {
      this.setState({show_date: val}, () => {
          this.props.handleTimeChange(val);
        disableFilter = false
      })
    }

  }

  _handleTheatreshowChange (val) {

    index_page = val.length
    if (val.length > 2) {
      this.setState({
        setTheatreshow: val
      })
      this.props.theatreShowFilterFunction(val,this.state.setCity, this.props.headers)
    } else if (index_page === 0) {
      this.setState({
        setTheatreshow: ''
      }, () => {
        this.handelFilter()
      })
    }
  }

  _setTheatreshowChange (value) {

    if (index_page === 0) {
      this.setState({
        setTheatreshow: ''
      }, () => {
        this.handelFilter()
      })
    } else {
      this.setState({
        setTheatreshow: value
      })
    }
  }





  _handleMovieshowChange (val) {

    index_page = val.length
    if (val.length > 2) {
      this.setState({
        setMovie: val
      })
      this.props.movieFilterFunction(val, this.props.headers)
    } else if (index_page === 0) {
      this.setState({
        setMovie: ''
      }, () => {
        this.handelFilter()
      })
    }
  }

  _setMovieshowChange (value) {

    if (index_page === 0) {
      this.setState({
        setMovie: ''
      }, () => {
        this.handelFilter()
      })
    } else {
      this.setState({
        setMovie: value
      })
    }
  }


  _handleCityChange (val) {

    index_page = val.length
    if (val.length > 2) {
      this.setState({
        setCity: val
      })
      this.props.cityFilterFunction(val, this.props.headers)
    } else if (index_page === 0) {
      this.setState({
        setCity: ''
      }, () => {
        this.handelFilter()
      })
    }
  }

  _setCityChange (value) {

    if (index_page === 0) {
      this.setState({
        setCity: ''
      }, () => {
        this.handelFilter()
      })
    } else {
      this.setState({
        setCity: value
      })
    }
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
      setCity: '',
      setMovie:'',
      setTheatreshow:'',
      show_date:null,
      show_time:null
    })

  }

  componentWillUnmount () {
    chipset = []
  }

  componentWillMount () {
    this.setState({
      shows: this.props.ShowList,
      pages: this.props.ShowPage,
    })

  }

  _handleSearchChange (target) {

    let searchval = this.refs.search.value
    this.setState({
      searchQuery: searchval
    })

    if (this.props.ShowPage !== 0) {
      if (target.charCode === 13 && searchval !== '') {
        this.setState({
          searchQuery: searchval
        })
        this.searchEnter(searchval)
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
      this.handelFilter()
    }
  }

  search () {}

  removeChip (index) {

    this.refs.search.value = ''
    this.setState({
      current: 1,
    })

    chipset.splice(index, 1)
    this.setState({
      chips: chipset
    })
    this.props.filters(this.getQuery(),chipset)

  }


  onChange (current, pageSize) {
    this.setState({
      current: current,
    },()=>{
      this.props.pagenumber(current)
    })
  }

  handelFilter () {


    this.setState({
      current: 1,
    })


    closeBtn = true

    this.setState({
      current: 1,
    })

   let query =this.getQuery()
    this.props.filters(query,chipset)
  }
  getQuery(){
    let date
    let start
    if (this.state.show_date === null) {
      date = ''
    }
    else {
      date = this.state.show_date
    }
    if (this.state.show_time === null) {
      start = ''
    }
    else {
      start = this.state.show_time
    }

    let theatre = this.state.setTheatreshow
    let city = this.state.setCity
    let movie = this.state.setMovie
    let enabled = this.state.inlineValue

    let query = {
      theatre: theatre,
      date: date,
      start: start,
      movie:movie,
      enabled:enabled,
      city:city
    }
    return query
  }

  selectOptions () {

  }

  _handleDisableButton (id) {
    this.props.DisableButtonClick(id, this.props.headers)
  }

  _handleUnableButton (id) {
    this.props.EnableButtonClick(id, this.props.headers)
  }

  render () {
    let timeFilter=[]
    console.log(this.props.timeshowFilter,'[[[[[[[')
  if(typeof this.props.timeshowFilter.show_times!=='undefined'){
    timeFilter=_.flatten(this.props.timeshowFilter.show_times)
    timeFilter= _.pluck(timeFilter,'start')
  }
    if (this.props.ShowPage === 0) {
      noData = true
    } else {
      noData = false
    }

    if(this.state.inlineValue==='True'){
      changeDisEn = "Enabled"
    }else if(this.state.inlineValue==='False'){
      changeDisEn = "Disabled"
    }else{
      changeDisEn = "Enabled/Disabled"
    }

    let cityTitlelist = _.map(_.pluck(this.props.cityFilter, 'name'), function (c) { return c})
    let theatreshowTitlelist = _.map(_.pluck(this.props.theatreshowFilter, 'title'), function (c) { return c})
    let movieTitlelist = _.map(_.pluck(this.props.movieFilter, 'name'), function (c) { return c})


    return (
      <div className="page">

        <div className="content-wrapper full_tag">

          <section className="content">

            <h1 className="main_heading_crm">Shows</h1>

            <section className="search_top search_sec">

              <div className="md-grid">

                <input placeholder="search" className="md-cell--5 search" ref="search" type="text" id="txtSearch"
                       onKeyPress={this._handleSearchChange}/>

                  {noData ?
                      <Button id="btnSearch" className="md-cell--1 noDrop" style={{margin: '0 0 0 30px'}} disabled raised
                              primary type="submit" label="Search"/> :
                      <Button id="btnSearch" className="md-cell--1" style={{margin: '0 0 0 30px'}} raised primary
                              type="submit" label="Search" onClick={() => {this.searchEnter(this.refs.search.value)}}/>}

                <div className="md-cell--5 chip-list adjust_chip">
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


            <form className="fiter_sec">
              <div className=" md-grid">

                <Autocomplete
                    id="city"
                    label="Select City"
                    className="md-cell--2"
                    onChange={this. _handleCityChange}
                    onAutocomplete={this._setCityChange}
                    data={cityTitlelist}
                    style={{marginTop: '-20px'}}
                />

                <Autocomplete
                    id="movie"
                    label="Select Movie"
                    className="md-cell--2"
                    onChange={this._handleMovieshowChange}
                    onAutocomplete={this._setMovieshowChange}
                    data={ movieTitlelist}
                    style={{marginTop: '-20px',marginLeft:'11px'}}
                />

                <Autocomplete
                    id="theatre"
                    label="Select Theatre"
                    className="md-cell--2"
                    onChange={this._handleTheatreshowChange}
                    onAutocomplete={this._setTheatreshowChange}
                    data={theatreshowTitlelist}
                    style={{marginTop: '-20px',marginLeft:'11px'}}
                />

                <DatePicker
                    id="appointmentLandscape"
                    autoOk
                    iconBefore={false}
                    label="Select Show Date"
                    className="md-cell--2"
                    locales='en-IN'
                    displayMode="landscape"
                    value={this.state.show_date}
                    onChange={this._handleFilterShowdateChange}
                    style={{marginTop:'-22px',marginLeft:'11px'}}
                />
                <span className="adjustIconcrossDate" onClick={() => this._handleFilterShowdateChange('close')}><i
                    className="material-icons">cancel</i></span>

                <Autocomplete
                    id="dates"
                    label="Select Show Time"
                    placeholder="Select Time"
                    className="md-cell--2"
                    onChange={this._handletimedateChange}
                    onAutocomplete={this._handletimedateChange}
                    disabled={timeFilter.length==0||this.state.show_date===null}
                    value={this.state.show_time||''}
                    data={timeFilter}

                    style={{marginTop: '-20px', marginLeft:'12px'}}
                />
                  {/*<SelectField*/}
                  {/*id="dates"*/}
                  {/*label="Select Show Time"*/}
                  {/*placeholder="Select Time"*/}
                  {/*iconChildren={null}*/}
                  {/*disabled={timeFilter.length==0}*/}
                  {/*menuItems={timeFilter}*/}
                  {/*value={this.state.show_time}*/}
                  {/*onChange={this._handletimedateChange}*/}
                  {/*style={{marginTop:'-12px'}}*/}
                  {/*/>*/}
                <span className="adjustIconcross" onClick={() => this._handletimedateChange('close')}><i
                    className="material-icons">cancel</i></span>


                <Button style={{marginLeft:'35px',marginTop:'11px'}} className="md-cell--2-offset" onClick={this.handelFilter.bind(this)} raised primary
                        label="Filter"/>
              </div>



            </form>


            <div className="md-grid " >
              <fieldset className=" md-cell md-cell--4 fields" onChange={this._handleInlineChange}>
                <Radio
                    id="inlineRadio1"
                    inline
                    name="inlineRadios"
                    value=""
                    label="All"
                    checked={this.state.inlineValue===''}
                />
                <Radio
                    id="inlineRadio1"
                    inline
                    name="inlineRadios"
                    value="True"
                    label="Enabled"
                    checked={this.state.inlineValue==='True'}
                />
                <Radio
                    id="inlineRadio2"
                    inline
                    name="inlineRadios"
                    value="False"
                    label="Disabled"
                    checked={this.state.inlineValue==='False'}
                />
              </fieldset>
            </div>


            <div className="shadow">
              {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
              <DataTable plain>
                <TableHeader >
                  <TableRow>
                    <TableColumn>Movie Name</TableColumn>
                    <TableColumn>Dimension</TableColumn>
                    <TableColumn>Language</TableColumn>
                      <TableColumn>Date</TableColumn>
                    <TableColumn>Time</TableColumn>
                    <TableColumn>Theatre Name</TableColumn>
                    <TableColumn>City</TableColumn>
                    <TableColumn>{changeDisEn}</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.props.ShowList.map((show, i) => (
                      <TableRow key={i}>
                        <TableColumn className="table_column adjust_column">{show.movie}</TableColumn>
                        <TableColumn>{show.dimension}</TableColumn>
                        <TableColumn>{show.language}</TableColumn>
                        <TableColumn>{show.date}</TableColumn>
                        <TableColumn>{show.start}</TableColumn>
                        <TableColumn className="table_column adjust_column">{show.theatre}</TableColumn>
                        <TableColumn>{show.city}</TableColumn>
                        <TableColumn>{show.enabled == true ?
                          <Button style={{background:'rgba(35, 109, 142, 0.5)'}} onClick={() => {this._handleDisableButton(show.id)}} primary raised
                                  label="Disable"/> :
                          <Button style={{background: 'rgba(18, 85, 115, 0.9)'}} onClick={() => {this._handleUnableButton(show.id)}} primary raised
                                  label="Enable"/>}</TableColumn>
                      </TableRow>))
                  }

                </TableBody>

              </DataTable>

              {noData &&
              <div className="NotFound"><p><span className="wdata">No data Found</span><span className="smile">:(</span>
              </p></div>}

            </div>


            <div className="pagenation">
              <Pagination
                selectComponentClass={Select}
                defaultPageSize={30}
                defaultCurrent={1}
                current={this.state.current}
                onChange={this.onChange}
                total={this.props.ShowPage}
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

export  default  ShowList




