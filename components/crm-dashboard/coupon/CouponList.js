import React from 'react'
import Avatar from 'react-md/lib/Avatars'
import Loader from '../../common/pageLoader'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Button from 'react-md/lib/Buttons/Button'
import Pagination from 'rc-pagination'
import Chip from 'react-md/lib/Chips'
import { Router } from '../../../routes'
import $ from 'jquery'
import Snackbar from 'react-md/lib/Snackbars'
import Dialog from 'react-md/lib/Dialogs'
import Toolbar from 'react-md/lib/Toolbars'
import CouponFormContainer from './couponFormContainer'
import { getDate, getTime } from '../../common/utils'
import { scrollup } from '../../common/scrollup'

let tag = []
let searchArray = []
let chipset = []
let noCheck = false
let noData = false
let arr = []
let count = 0

export class CouponList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      coupList: [],
      chips: [],
      pages: 0,
      searchQuery: '',
      openButton: false,
      current: 1,
      toasts: [],
      type: '',
      id: '',
      visible: false,
      pageX: null,
      pageY: null

    }

    this.onChange = this.onChange.bind(this)
    this.removeChip = this.removeChip.bind(this)
    this._handleSearchChange = this._handleSearchChange.bind(this)
    this._handleUpdateButton = this._handleUpdateButton.bind(this)
    this.addCoupon = this.addCoupon.bind(this)
    this._handleCheckButton = this._handleCheckButton.bind(this)
    this._removeToast = this._removeToast.bind(this)
    this._toastMultiple = this._toastMultiple.bind(this)
    this._openDialog = this._openDialog.bind(this)
    this._closeDialog = this._closeDialog.bind(this)

  }

  _openDialog (e) {
    let pageX = e
    let pageY = e

    this.setState({visible: true, pageX, pageY})
  }

  _closeDialog () {
    this.setState({visible: false})
  }

  componentWillUnmount () {
    chipset = []
    arr = []
    this.setState({
      openButton: false
    })
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
  }

  componentWillMount () {
    this.setState({
      coupList: this.props.CampaignList,
      pages: this.props.CampaignPage,

    })
  }

  _handleSearchChange (target) {

    let val = this.refs.search.value

    if (this.props.CouponPage !== 0) {
      if (target.charCode === 13 && val !== '') {
        this.setState({
          searchQuery: val
        })
        this.searchEnter(val)
      }
    }
  }

  searchEnter (val) {
    if (val !== '') {
      let query1 = val
      chipset.push(val)
      this.setState({
        chips: chipset
      })
      this.handelFilter()
    }
  }

  addCoupon () {

    this.setState({
      type: 'add'
    })
    this._openDialog()
  }

  _handleUpdateButton (val) {
    this.setState({
      type: 'update',
      id: val
    })
    this.props.getCouponUpdateForm(val, this.props.headers)
    this._openDialog()
  }

  _handleCheckButton (val) {
    //
    // if(val == 'empty' && arr.length != 0){
    //     arr = [];
    //     this.setState({
    //         openButton:false
    //     })
    // }else{
    //     if(arr.indexOf(val)==-1 && val != 'empty'){
    //         arr.push(val)
    //     }
    //     else{
    //         arr.splice(arr.indexOf(val),1)
    //     }
    //     if(arr.length === 0){
    //         this.setState({
    //             openButton:false
    //         })
    //     }else {
    //         this.setState({
    //             openButton:true
    //         })
    //     }
    // }
  }

  deleteCoupon () {
    this.props.getdeleteCoupData(arr)
  }

  _removeToast () {
    const [, ...toasts] = this.state.toasts
    this.setState({toasts})
  }

  _toastMultiple () {

    const toasts = this.state.toasts.slice()
    toasts.push({
      text: 'Are You Sure...You Wanna DELETE COUPONS ????',
      action: {
        label: 'Yes!!',
        onClick: () => {
          this.deleteCoupon()
        },
      },
    })

    this.setState({toasts})

  }

  search () {

  }

  removeChip (index) {

    this.refs.search.value = ''
    this.setState({
      current: 1,
    })
    chipset.splice(index, 1)
    this.setState({
      chips: chipset
    })

    this.handelFilter()
  }

  handelFilter () {

    this.setState({
      current: 1,
    })

    this.props.filters(chipset)
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

  render () {

    const nav = <Button icon onClick={this._closeDialog}>close</Button>
    const action = <Button flat label="Save" onClick={this._closeDialog}/>

    if (this.props.CouponPage === 0) {
      noCheck = true
    } else {
      noCheck = false
    }

    if (this.props.CouponList.length === 0 ) {
      noData = true
    } else {
      noData = false
    }

    const {rows, page, rowsPerPage} = this.state

    return (
      <div className="page">

        <div className="content-wrapper full_tag">

          <section className="content">

            <h1 className="main_heading_crm">Coupons</h1>

            <section className="search_top search_sec">

              <div className="md-grid ">

                <input style={{width:'42%'}} placeholder="search" className="md-cell--4 search" ref="search"
                       type="text" id="txtSearch" onKeyPress={this._handleSearchChange}/>


                <div style={{marginLeft:'18px'}}>

                  {this.state.openButton &&
                  <Button onClick={() => this._toastMultiple()} id="btnadd"
                          style={{backgroundColor: 'red'}} className="md-cell--1 addButton" raised
                          primary label="Delete"/>}
                  <Snackbar style={{width: ' 48%', height: '67px'}} toasts={this.state.toasts}
                            onDismiss={this._removeToast}/>
                  {noData ? <Button id="btnSearch" className="noDrop" disabled raised
                                    primary type="submit" label="Search"/> :
                    <Button id="btnSearch"  raised primary
                            type="submit" label="Search" onClick={() => {
                      this.searchEnter(this.refs.search.value)
                    }}/>}
                  <Button onClick={() => {
                    this.addCoupon()
                  }} style={{marginLeft:'3px'}} id="btnadd" className="addButton" raised primary label="Add Coupon"/>

                </div>

                <div className="md-cell--4 chip-list adjust_chip">
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


              </div>
            </section>

            <div className="shadow">
              {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
              <DataTable plain>
                <TableHeader >
                  <TableRow>
                    <TableColumn>Code</TableColumn>
                    <TableColumn>Campaign</TableColumn>
                    <TableColumn>User Limit</TableColumn>
                    <TableColumn>Valid Untill</TableColumn>
                    <TableColumn>Minimum Amount</TableColumn>
                    <TableColumn>Min. Buy Ticket</TableColumn>
                    <TableColumn>Get Free Ticket</TableColumn>
                    <TableColumn>Button</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.props.CouponList.map((coup, i) => (
                      <TableRow key={i}>
                        <TableColumn className="table_column adjust_column">{coup.code}</TableColumn>
                        <TableColumn className="adjust_column">{(coup.campaign !== null) ? coup.campaign.detail : null}</TableColumn>
                        <TableColumn>{coup.user_limit}</TableColumn>
                        <TableColumn>{(coup.valid_until !== null) ? <span>
                                            <span>Date : {getDate(coup.valid_until)}</span>
                                            <br/><span>Time : {getTime(coup.valid_until)}</span>
                                        </span> : null}</TableColumn>
                        <TableColumn className="table_column adjust_column">{coup.minimum_amount}</TableColumn>
                        <TableColumn className="table_column adjust_column">{coup.min_buy_ticket}</TableColumn>
                        <TableColumn className="table_column adjust_column">{coup.get_free_ticket}</TableColumn>
                        <TableColumn>
                          <Button style={{background:'#2077a5'}} onClick={() => {this._handleUpdateButton(coup.id)}} primary raised label="Update"/>
                        </TableColumn>
                      </TableRow>))
                  }

                </TableBody>

              </DataTable>

              {noCheck && <div className="NotFound"><p><span className="wdata">No data Found</span><span
                className="smile">:(</span></p></div>}
            </div>

            {noData ? <div className="pagenation"><Pagination
              defaultPageSize={30}
              defaultCurrent={1}
              current={this.state.current}
              onChange={this.onChange}
              total={this.props.CouponPage}
            /></div> : <div className="pagenation"><Pagination
              defaultPageSize={30}
              defaultCurrent={1}
              current={this.state.current}
              onChange={this.onChange}
              total={30}
            /></div>}
          </section>


          <Dialog
            id="fullPageExample"
            visible={this.state.visible}
            pageX={this.state.pageX}
            pageY={this.state.pageY}
            onHide={this._closeDialog}
            fullPage
            aria-label="Coupon Form"

          >
            <Toolbar
              colored
              nav={<Button icon onClick={this._closeDialog}>close</Button>}
              title="Coupon Form"
              style={{zIndex: '99999999'}}
              fixed
            />
            <CouponFormContainer headers={this.props.headers}
                                 Type={this.state.type}
                                 Id={this.state.id}
                                 updatecouplist={this.props.updatecouplist}
                                 _closeDialog={this._closeDialog}

            />
          </Dialog>

          {scrollup}

        </div>
        <style jsx>{``}</style>
      </div>
    )
  }
}

export  default  CouponList

