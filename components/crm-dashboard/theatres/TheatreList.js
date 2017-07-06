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

let chipset = [];
let noData = false;
let index_page = 0;
let disableFilter = false;
let closeBtn = false;
let reset = false;
let changeDisEn = "";
export class TheatreList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      theatres: [],
      chips: [],
      searchQuery: '',
      page: null,
      current: 1,
      inlineValue:'',
      setCity:'',
      setTheatretitle:'',
    }

    this._handleSearchChange = this._handleSearchChange.bind(this);
    this._handleDisableButton = this._handleDisableButton.bind(this);
    this._handleUnableButton = this._handleUnableButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeChip = this.removeChip.bind(this);
    this.searchEnter = this.searchEnter.bind(this);
    this._handleInlineChange=this._handleInlineChange.bind(this);
    this._handleCityChange=this._handleCityChange.bind(this);
    this._setCityChange=this._setCityChange.bind(this);
    this._handleTheatretitleChange=this._handleTheatretitleChange.bind(this);
    this._setTheatretitleChange=this._setTheatretitleChange.bind(this);
    this.handelFilter=this.handelFilter.bind(this);




  }
  _handleInlineChange (e) {

    this.setState({inlineValue: e.target.value},()=>{
      this.handelFilter()
    })

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
          $('.search_top').addClass('search_fixed')
        } else {
          $('.search_top').removeClass('search_fixed')
        }
      })
    }
    this.setState({
      setCity: '',
      setTheatretitle:'',
      inlineValue:''
    })

  }

  componentWillMount () {
    this.setState({
      theatres: this.props.Theatre,
      page: this.props.theatrePage
    })

  }


  _handleTheatretitleChange (val) {

    index_page = val.length
    if (val.length > 2) {
      this.setState({
        setTheatretitle: val
      })
      this.props.theatreTitleFilterFunction(val,this.state.setCity, this.props.headers)
    } else if (index_page === 0) {
      this.setState({
        setTheatretitle: ''
      }, () => {
        this.handelFilter()
      })
    }
  }

  _setTheatretitleChange (value) {

    if (index_page === 0) {
      this.setState({
        setTheatretitle: ''
      }, () => {
        this.handelFilter()
      })
    } else {
      this.setState({
        setTheatretitle: value
      })
    }
  }






  _handleCityChange (val) {

    index_page = val.length
    if (val.length > 2) {
      this.setState({
        setCity: val
      })
      this.props.cityFilterTheatreFunction(val, this.props.headers)
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




  _handleSearchChange (target) {

    let searchval = this.refs.search.value
    this.setState({
      searchQuery: searchval
    })

    if (this.props.TheatrePage !== 0) {
      if (target.charCode === 13 && searchval !== '') {
        this.setState({
          searchQuery: searchval
        })
        this.searchEnter(searchval)
      }
    }

  }

  // $("#search").keydown(function(event){
  //     if(event.keyCode == 13){
  //         console.log('click event');
  //
  //     }
  // });
  //
  // function searchEnter(val) {
  //     let query1 = val
  //     chipset.push(val)
  //     this.setState({
  //         chips: chipset
  //     });
  //     this.handelFilter()
  // }

  // }

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

  handelFilter () {



    this.setState({
      current: 1,
    })


    closeBtn = true

    this.setState({
      current: 1,
    })

    this.props.filters(this.getQuery(),chipset)
  }
  getQuery(){


    let theatre = this.state.setTheatretitle
    let city = this.state.setCity
    let enabled = this.state.inlineValue

    let query = {
      theatre: theatre,
      status:enabled,
      city:city
    }
    return query
  }

  selectOptions () {
    console.log('e')
  }

  _handleDisableButton (id) {
    this.props.DisableButtonClickTheatre(id, this.props.headers)
  }

  _handleUnableButton (id) {
    this.props.EnableButtonClickTheatre(id, this.props.headers)
  }

  // handleResendButton(id){
  //
  //     let orderService = new OrderService
  //     orderService.getResendData(id).then((response)=>{
  //         console.log(response,"AWESOME")
  //     })
  // }

  onChange (current, pageSize) {
    this.setState({
      current: current,
    },()=>{
      this.props.pagenumber(current)
    })
  }


  render () {

    if (this.props.TheatrePage === 0) {
      noData = true
    } else {
      noData = false
    }

    if(this.state.inlineValue==='open'){
      changeDisEn = "Enabled"
    }else if(this.state.inlineValue==='closed'){
      changeDisEn = "Disabled"
    }else{
      changeDisEn = "Enabled/Disabled"
    }


    let cityTitlelist = _.map(_.pluck(this.props.cityFilterTheatre, 'name'), function (c) { return c})
    let theatreshowTitlelist = _.map(_.pluck(this.props.theatreTitleFilter, 'title'), function (c) { return c})



    return (
      <div className="page">

        <div className="content-wrapper full_tag">

          <section className="content">

            <h1 className="main_heading_crm">Theatres</h1>
            <section className="search_top search_sec">


              <div className="md-grid">

                <input style={{width:'48%'}} placeholder="search......." className="md-cell--5 search" ref="search" type="text" id="txtSearch"
                       onKeyPress={this._handleSearchChange}/>
                  {noData ?
                      <Button id="btnSearch" className="noDrop" style={{margin: '0 0 0 35px'}} disabled raised
                              primary type="submit" label="Search"/> :
                      <Button id="btnSearch"  style={{margin: '0 0 0 35px'}} raised primary
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
                    className="md-cell--3"
                    onChange={this. _handleCityChange}
                    onAutocomplete={this._setCityChange}
                    data={cityTitlelist}
                    style={{marginTop: '-20px'}}
                />

                <Autocomplete
                    id="theatre"
                    label="Select Theatre"
                    className="md-cell--3"
                    onChange={this._handleTheatretitleChange}
                    onAutocomplete={this._setTheatretitleChange}
                    data={theatreshowTitlelist}
                    style={{marginTop: '-20px',marginLeft:'11px'}}
                />

                <Button style={{marginLeft:'31px',marginTop:'4px'}} className="md-cell--2-offset" onClick={this.handelFilter.bind(this)} raised primary
                        label="Filter"/>

                </div>

              </form>

            <div className="md-grid">
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
                    value="open"
                    label="Enabled"
                    checked={this.state.inlineValue==='open'}
                />
                <Radio
                    id="inlineRadio2"
                    inline
                    name="inlineRadios"
                    value="closed"
                    label="Disabled"
                    checked={this.state.inlineValue==='closed'}
                />
              </fieldset>
            </div>
            <div className="shadow ">
              {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
              <DataTable plain>
                <TableHeader >
                  <TableRow>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Region</TableColumn>
                    <TableColumn>City</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Booking Amount</TableColumn>
                    <TableColumn>Booking Percentage</TableColumn>
                    <TableColumn>{changeDisEn}</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.props.Theatre.map((theatre, i) => (
                      <TableRow key={i}>
                        <TableColumn className="adjust_column">{theatre.title}</TableColumn>
                        <TableColumn>{theatre.region}</TableColumn>
                        <TableColumn>{theatre.city}</TableColumn>
                        <TableColumn>{theatre.status}</TableColumn>
                        <TableColumn>{theatre.booking_amount}</TableColumn>
                        <TableColumn>{theatre.booking_percentage}</TableColumn>
                        <TableColumn>{theatre.status !== 'open' ?
                          <Button style={{background: 'rgba(18, 85, 115, 0.9)'}} onClick={() => {this._handleUnableButton(theatre.id)}} primary raised
                                  label="Enable"/> :
                          <Button style={{background:'rgba(35, 109, 142, 0.5)'}} onClick={() => {this._handleDisableButton(theatre.id)}} primary raised
                                  label="Disable"/>}</TableColumn>
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
                  total={this.props.TheatrePage}
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

export  default  TheatreList
