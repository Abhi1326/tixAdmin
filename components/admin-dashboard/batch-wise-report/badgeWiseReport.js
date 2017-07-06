/**
 * Created by consultadd on 8/2/17.
 */
import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import { Router } from '../../../routes'
import { URLS } from '../../common/url-constants'
import Dialog from 'react-md/lib/Dialogs'
import SelectField from 'react-md/lib/SelectFields'
import Radio from 'react-md/lib/SelectionControls/Radio'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import MenuButton from 'react-md/lib/Menus/MenuButton'
import ListItem from 'react-md/lib/Lists/ListItem'
import PropTypes from 'prop-types'


import { scrollup } from '../../common/scrollup'


let Dropzone = require('react-dropzone')
let noData = false
let payment_status = ''
let noFile = true
const styles = {
  display: 'tableCell',
  alignItems: 'center',
  flexWrap: 'wrap',

}
let reset_btn_show=false;


export class BadgeWiseReport extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      parentId: null,
      visible: false,
      amountType: 'ticket',
      files: [],
      batch: '',
      inlineValue: '',
      paymentResponse: {...this.props.paymentresponse},
      payment_status: false,
      current_page: 1,
      bankName: '',
      paid_clicked:false

    }

    this.openDialog = this.openDialog.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this._handleAmountType = this._handleAmountType.bind(this)
    this.payment = this.payment.bind(this)
    this._handleInlineChange = this._handleInlineChange.bind(this)
    this._handlePageChange = this._handlePageChange.bind(this)
    this.filterByStatus = this.filterByStatus.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this._handleDownloadBankName = this._handleDownloadBankName.bind(this)
    this._handlePayBankName = this._handlePayBankName.bind(this)

  }

  componentWillMount () {

  }

  componentDidMount () {
    this.setState({
      parentId: this.props.parentId,
      counts: this.props.badgeWiseReport.count

    })

  }

  _handleInlineChange (e) {

    this.setState({inlineValue: e.target.value, paid_clicked:true})
    this.filterByStatus(e.target.value)
  }

  _handlePageChange (current, pageSize) {
    this.setState({
      current_page: current
    })
    this.pageChange(current)

  }

  _handleDownloadBankName (bankName, batchName) {
    this.setState({
      bankName: bankName
    }, () => {
      this.download(batchName)
    })
  }

  _handlePayBankName (bankName, batchName) {
    this.setState({
      bankName: bankName
    }, () => {
      this.openPayDialog(batchName)
    })
  }

  pageChange (val) {
    let reportType = '&report_type=' + this.state.amountType
    let query = '?page=' + val + reportType + payment_status
    this.props.pagenate(query, this.props.headers)
  }

  filterByStatus (status) {
    reset_btn_show = true;
    payment_status = '&payment_status=' + status
    let params = {

      parent_id: this.props.parentId
    }
    status = '&payment_status=' + status
    this.props.filterByStatus(params, this.state.amountType, payment_status)
  }

  resetAllFilter () {
    reset_btn_show=false;
    payment_status = ''
    this.setState({
      inlineValue: '',
      amountType: 'ticket',
    },()=>{
      payment_status = ''
      this.props.resetAllFilter()
    })

  }

  download (batchName) {
    let token = '&token=' + localStorage.getItem('key')
    let batch_name = '?batch_name=' + batchName
    let parent_id = '&parent_id=' + this.state.parentId
    let report_type = '&report_type=' + this.state.amountType
    let bank = '&bank=' + this.state.bankName
    window.location = URLS.GETBADGEREPORTDOWNLOAD + batch_name + token + parent_id + report_type + bank

  }

  openPayDialog (batch_name) {
    this.setState({
      batch: batch_name
    })
    this.openDialog()

  }

  detailReport (batchName, type, status) {
    Router.pushRoute('batchreport', {batchName: batchName, parentId: this.props.parentId, type: type, status:status})

  }

  openDialog () {
    this.setState({visible: true})
  };

  closeDialog () {
    this.setState({
      visible: false,
      files: [],
      payment_status: true
    })

  };

  onDrop (file) {

    this.setState({
      files: file
    }, () => {
      if (this.state.files.length === 0) {
        this.toastrStyle()
        toastr.error('Please select excel file')

      }
      else {
        noFile = false
      }
    })

  }

  toastrStyle () {
    toastr.options = {
      closeButton: '<button><i class="icon-off"></i></button>',
      positionClass: 'toast-top-full-width',
      onclick: null,
      closeMethod: 'fadeOut',
      closeEasing: 'swing',
      timeOut: 3000,
      extendedTimeOut: 0,
    }
  }

  openToastr () {
    this.toastrStyle()

    if (this.props.paymentresponse.success === true) {

      toastr.success(this.props.paymentresponse.message)
    }
    else {

      toastr.error(this.props.paymentresponse.message)
    }
  }

  onOpenClick () {
    console.log('clicked drop')
    this.refs.dropzone.open()
  }

  changeStyle () {
    return {
      width: '600px',
      height: '200px',
      border: '1px dashed rgb(102, 102, 102)'
    }
  }

  payment () {
    if (this.state.files.length === 0) {
      this.toastrStyle()
      toastr.error('please select file')

    }
    else {
      let data = new FormData()
      data.append('file', this.state.files[0], this.state.files[0].name)
      data.append('batch_name', this.state.batch)
      data.append('report_type', this.state.amountType)
      console.log(data, 'file data')
      this.props.payment(data, this.props.headers).then((res) => {
        console.log(res, '============>')
        this.setState({
          paymentResponse: this.props.paymentresponse,
        })
        this.openToastr()
        this.closeDialog()

      })
    }

  }

  _handleAmountType (value) {
    console.log(value, 'at')
    this.setState({
      amountType: value
    })

  }

  filterByAmountType () {
    reset_btn_show=true;
    console.log(this.state.amountType, 'at')
    let params = {
      batch_name: this.props.batchName,
      parent_id: this.props.parentId
    }

    this.props.filter(params, this.state.amountType, payment_status)

  }
  componentWillUnmount () {
    payment_status = ''
    reset_btn_show = false

  }

  render () {
    let paid_style;
    if(this.state.paid_clicked===true){
        paid_style = {padding:'2px 28px 0 28px'}
    }
    else{
        paid_style={padding:'0 0 0 0 '}
    }
    let amount_type = ['ticket', 'commission']
    const {inlineValue} = this.state
    if (typeof this.props.badgeWiseReport.results !== 'undefined' && this.props.badgeWiseReport.results.length === 0) {
      noData = true
    }
    else {
      noData = false
    }
    const Style = {
      width: '600px',
      height: '200px',
      border: '1px dashed rgb(102, 102, 102)',
    }

    return (
      <div className="badge_report">

        <h1 className="main_heading">Batch Wise Report</h1>
        <section className="md-grid amount_type">
          <SelectField
            id="states"
            label="Select Amount Type"
            placeholder="Select Amount Type"
            menuItems={amount_type}
            itemLabel="name"
            itemValue="abbreviation"
            value={this.state.amountType}
            defaultValue={'ticket'}
            className="md-cell"
            helpOnFocus
            helpText="Select Amount Type"
            onChange={this._handleAmountType}
          />
          <Button className="filter_btn" raised primary type="submit" label="Filter" onClick={() => {
            this.filterByAmountType()
          }}/>
          {
            (reset_btn_show===false)?<span></span>:<Button className="filter_btn reset_filter" raised type="reset" label="Reset All" onClick={() => {
              this.resetAllFilter()
            }}/>
          }

        </section>
        <div className="md-grid status_filter">
          <fieldset className=" md-cell md-cell--2 fields" onChange={this._handleInlineChange}>

            <Radio
              id="inlineRadio1"
              inline
              name="inlineRadios"
              value="due"
              label="Due"
              checked={inlineValue === 'due'}
            />
            <Radio
              id="inlineRadio2"
              inline
              name="inlineRadios"
              value="paid"
              label="Paid"
              checked={inlineValue === 'paid'}
            />

          </fieldset>
        </div>
        <div id="batchWise_report_table">
          {(!this.props.isFetching) ? <DataTable plain>
            <TableHeader >
              <TableRow >
                <TableColumn className="prevent-grow ">Movie Partner Name</TableColumn>
                <TableColumn className="prevent-grow ">Batch Name</TableColumn>
                <TableColumn className="prevent-grow ">Payable Amount</TableColumn>
                <TableColumn className="prevent-grow ">Amount Type</TableColumn>
                <TableColumn className="prevent-grow ">Payment Status</TableColumn>
                <TableColumn className="prevent-grow ">Download</TableColumn>
                <TableColumn style={paid_style}>Pay</TableColumn>
              </TableRow>
            </TableHeader>


            {(typeof this.props.badgeWiseReport.results !== 'undefined') ? <TableBody>
              {
                this.props.badgeWiseReport.results.map((report, i) => (
                  <TableRow key={i}>
                    <TableColumn style={{cursor: 'pointer', color: '#0b66ad'}} onClick={() => {
                      this.detailReport(report.batch_name, report.amount_type, report.payment_status)
                    }}>{report.movie_partner_name}</TableColumn>
                    <TableColumn >{report.batch_name}</TableColumn>
                    <TableColumn>Rs.{report.payable_amount}</TableColumn>
                    <TableColumn>{report.amount_type}</TableColumn>
                    <TableColumn
                      style={{textTransform: 'capitalize'}}>{report.payment_status}</TableColumn>
                    <TableColumn style={styles}>
                      <MenuButton
                        id="button-menu"
                        label="Download"
                        raised
                        className="bank_menu"
                        style={{backgroundColor: '#03a9f4', color: 'white'}}
                      >

                        <ListItem onClick={() => this._handleDownloadBankName('icici', report.batch_name)}
                                  leftIcon={<img style={{width:'30px'}} src="/static/images/icici.png"/>}
                                  primaryText="ICICI Bank"
                        style={{overflow:'hidden'}}/>
                        <ListItem onClick={() => this._handleDownloadBankName('yes', report.batch_name)}
                                  leftIcon={<img style={{width:'42px', transform: 'scale(1.85)'}} src="/static/images/Yesbank.png"/>}
                                  primaryText="YES Bank"
                                  style={{overflow:'hidden'}}/>

                      </MenuButton>
                    </TableColumn>
                    {(report.payment_status === 'due') ? <TableColumn style={styles}>
                      <MenuButton
                        id="button-menu"
                        label="Pay"
                        raised
                        className="menu-example"
                        style={{backgroundColor: '#03a9f4', color: 'white'}}
                      >
                        <ListItem onClick={() => this._handlePayBankName('icici', report.batch_name)}
                                  leftIcon={<img style={{width:'30px'}} src="/static/images/icici.png"/>}
                                  primaryText="ICICI Bank"
                                  style={{overflow:'hidden'}}/>
                        <ListItem onClick={() => this._handlePayBankName('yes', report.batch_name)}
                                  leftIcon={<img style={{width:'42px', transform: 'scale(1.85)'}} src="/static/images/Yesbank.png"/>}
                                  primaryText="YES Bank"
                                  style={{overflow:'hidden'}}/>

                      </MenuButton>

                    </TableColumn> : <TableColumn style={styles}>

                    <p className="paid_text">Paid</p>
                    </TableColumn>}

                  </TableRow>))
              }
            </TableBody> : <TableBody></TableBody>
            }
          </DataTable> : <div className='loader'><Loader/></div>}
          {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
            className="smile">:(</span></p></div>}
          <Dialog
            id="speedBoost"
            visible={this.state.visible}
            title="Upload File"
            onHide={this.closeDialog}
            aria-labelledby="speedBoostDescription"
            dialogStyle={{width: '50%', overflowX: 'hidden'}}
            modal
            actions={[{
              onClick: this.payment,
              primary: true,
              label: 'Pay',
            }, {
              onClick: this.closeDialog,
              primary: true,
              label: 'Close',
            }]}>

            <div id="speedBoostDescription" className="md-color--secondary-text">
              <div >
                <Dropzone accept="application/vnd.ms-excel" ref="dropzone" onDrop={this.onDrop}
                          style={Style}>
                  <div className="drop_zone_text">Try dropping some files here, or click to select
                    files to upload.

                  </div>

                </Dropzone>

                {(( this.state.files.length !== 0)) ? <a className="file_link"><span>Selected File is:</span><span
                  className="file_name">{this.state.files[0].name}</span></a>
                  : <a></a>}

              </div>
            </div>
          </Dialog>
          <div className="pagenation">
            <Pagination
              selectComponentClass={Select}
              defaultPageSize={10}
              defaultCurrent={1}
              current={this.state.current_page}
              onChange={this._handlePageChange}
              total={this.props.badgeWiseReport.count}

            />
          </div>
        </div>

        <style jsx>{`

                        `}
        </style>
        {scrollup}
      </div>

    )
  }
}
BadgeWiseReport.propTypes = {
    badgeWiseReport:PropTypes.object,
    isFetching:PropTypes.boolean,
    paymentResponse:PropTypes.object,
    parentId:PropTypes.string,
    filter:PropTypes.func,
    filterByStatus:PropTypes.func,
    payment:PropTypes.func,
    resetAllFilter:PropTypes.func,
    pagenate:PropTypes.func,
    headers:PropTypes.object,
    current_page:PropTypes.number

};

export  default  BadgeWiseReport