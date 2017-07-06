import React, { Component } from 'react'
import { connect } from 'react-redux'
import DataTable from 'react-md/lib/DataTables/DataTable'
import Head from 'next/head'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import Layout from '../../common/layout'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Pagination from 'rc-pagination'
import Select from 'react-select'
import Button from 'react-md/lib/Buttons/Button'
import Dialog from 'react-md/lib/Dialogs'
import { getPagedBatchReport, mark_individual_as_paid } from '../../../actions/dashboardActions'
import SelectField from 'react-md/lib/SelectFields'
import Loader from '../../common/pageLoader'
import TextField from 'react-md/lib/TextFields'
import { scrollup } from '../../common/scrollup'
import PropTypes from 'prop-types'


class BatchReportContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      amountType: '',
      current_page: 1,
      visible: false,
      paymentMethod: 'Net Banking',
      reference_no: '',
      additional_info: '',
      visible_date: false,
      date: null,
      custom_date:''


    }

    this._handlePageChange = this._handlePageChange.bind(this)
    this.openPayDialog = this.openPayDialog.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this._handlePaymentMethod = this._handlePaymentMethod.bind(this)
    this._handleAdditionalInfo = this._handleAdditionalInfo.bind(this)
    this._handleReferenceNo = this._handleReferenceNo.bind(this)
    this.payment = this.payment.bind(this)
    this._handleDate1VisibilityChange = this._handleDate1VisibilityChange.bind(this)
    this._handleDateChange = this._handleDateChange.bind(this)
    this._resetDate = this._resetDate.bind(this)

  }

  payment () {
    let obj = {
      report_id: this.state.report_id,
      reference_no: this.state.reference_no,
      payment_method: this.state.paymentMethod,
      additional_info: this.state.additional_info,
      amount_paid: this.state.payable,
      payment_date:this.state.custom_date
    }
    this.props.mark_individual_as_paid(obj, this.props.headers).then((res) => {
      this.setState({
        paymentResponse: this.props.paymentResponse,
      })
      this.openToastr()
      this.closeDialog()

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

    if (this.props.paymentResponse.success === true) {

      toastr.success(this.props.paymentResponse.message)
    }
    else {

      toastr.error(this.props.paymentResponse.message)
    }
  }

  _handleReferenceNo (val) {
    this.setState({
      reference_no: val
    })

  }

  _handleAdditionalInfo (val) {
    this.setState({
      additional_info: val
    })

  }

  _handlePaymentMethod (val) {

    this.setState({
      paymentMethod: val
    })
  }

  _handleDate1VisibilityChange (visible) {
    this.setState({visible_date: visible})
  }

  _handleDateChange (value) {
    let x = value.split(' ');
    let newDate = x[0]+'-'+x[1].toUpperCase()+'-'+x[2]

    this.setState({
      date: value,
      custom_date:newDate
    })
  }

  _resetDate () {
    this.setState({date: null})

  }


  _handlePageChange (current, pageSize) {
    this.setState({
      current_page: current
    })
    this.pageChange(current)
  }

  pageChange (val) {
    let params = {
      parent_id: this.props.parentId,
      batch_name: this.props.batchName,
    }
    let reportType = '&report_type=' + this.state.amountType
    let payment_status = '&payment_status='+this.props.payment_status
    let query = '?page=' + val + reportType+payment_status
    this.props.pagenate(query, params, this.props.headers)
  }

  openPayDialog (report) {
    this.setState({
      report_id: report.id,
      payable: report.payable_amount
    }, () => {
      console.log(this.state.batch, '======>')
      this.openDialog()
    })

  }

  openDialog () {
    this.setState({visible: true})
  };

  closeDialog () {
    this.setState({
      visible: false,
    })

  };

  render () {
    let current_date = new Date()
    let amount_type = ['ticket', 'commission']

    return (
      <Layout >
        <div className="page batch_report">
          <Head>
            <title>Batch Report</title>
            <link rel='stylesheet' href='/static/css/batchreport.css'/>
            <link rel="stylesheet" href="/static/css/toastr.css"/>
          </Head>
          <h1 className="main_heading">Batch Report({this.props.batchName})</h1>

          <div id="batch_report_table">
            {(!this.props.isFetching) ? <span></span> : <div className="loader"><Loader /></div>}
            <DataTable plain>
              <TableHeader >
                <TableRow>
                  <TableColumn className="prevent-grow ">Movie Partner Name</TableColumn>
                  <TableColumn className="prevent-grow ">Payable Amount</TableColumn>
                  <TableColumn className="prevent-grow ">Amount Type</TableColumn>
                  <TableColumn className="prevent-grow ">Payment Status</TableColumn>
                  <TableColumn >Pay</TableColumn>


                </TableRow>
              </TableHeader>

              {((typeof this.props.batchReport.results !== 'undefined') && ( this.props.batchReport.results.length !== 0)) ?
                <TableBody>
                  {
                    this.props.batchReport.results.map((report, i) => (
                      <TableRow key={i}>
                        <TableColumn >{report.movie_partner_title}</TableColumn>
                        <TableColumn>Rs.{report.payable_amount}</TableColumn>
                        <TableColumn>{report.amount_type}</TableColumn>
                        <TableColumn
                          style={{textTransform: 'capitalize'}}>{report.payment_status}</TableColumn>
                        {(report.payment_status === 'due') ? <TableColumn>
                          <Button raised primary type="submit" label="Pay" onClick={() => {
                            this.openPayDialog(report)
                          }}/>

                        </TableColumn> : <TableColumn>
                          <p className="paid_text">Paid</p>
                        </TableColumn>}


                      </TableRow>))
                  }
                </TableBody>
                : <TableBody></TableBody>
              }
            </DataTable>

            <div className="pagenation">
              <Pagination
                selectComponentClass={Select}
                defaultPageSize={10}
                defaultCurrent={1}
                current={this.state.current_page}
                onChange={this._handlePageChange}
                total={this.props.batchReport.count}
              />
            </div>
            <Dialog

              id="speedBoost"
              visible={this.state.visible}
              title="Pay"
              onHide={this.closeDialog}
              aria-labelledby="speedBoostDescription"
              dialogStyle={{width: '50%', overflowX: 'hidden',zIndex:'1'}}
              modal
              actions={[{
                onClick: this.payment,
                primary: true,
                label: 'Pay',
                disabled: ((this.state.reference_no === '') || (this.state.paymentMethod === ''))
              }, {
                onClick: this.closeDialog,
                primary: true,
                label: 'Close',
              }]}>

              <div id="speedBoostDescription" className="md-color--secondary-text">
                <div >
                  <div className="md-grid">
                    <div className="md-cell--6 md-text-right"><p className="label_title subheading">Reference
                      No :</p></div>
                    <div className="md-cell--6"><TextField
                      id="helpMultiline"
                      placeholder="reference No"
                      className="md-cell-2"
                      onChange={this._handleReferenceNo}
                    /></div>
                  </div>
                  <div className="md-grid">
                    <div className="md-cell--6 md-text-right"><p className=" label_title subheading">Payment
                      Method :</p></div>
                    <div className="md-cell--6"><SelectField
                      id="states"
                      label="Select Payment Method"
                      placeholder="Select Amount Type"
                      menuItems={['Net Banking', 'Cheque', 'Cash']}
                      itemLabel="name"
                      itemValue="abbreviation"
                      value={this.state.paymentMethod}
                      defaultValue={'ticket'}
                      helpOnFocus
                      className="md-cell--12"
                      onChange={this._handlePaymentMethod}
                    /></div>
                  </div>
                  <div className="md-grid">
                    <div className="md-cell--6 md-text-right"><p className=" label_title subheading">Amount Payable
                      :</p></div>
                    <div className="md-cell--6" style={{paddingTop: '10px'}}>{this.state.payable}</div>
                  </div>
                  <div className="md-grid">
                    <div className="md-cell--6 md-text-right"><p className=" label_title subheading">Date of Payment
                      :</p></div>
                    <div className="md-cell--6">
                      <DatePicker
                        id="fully-controlled2"
                        label="Select date"
                        locales="en-IN"
                        autoOk
                        lastChild
                        maxDate={current_date}
                        visible={this.state.visible_date}
                        value={this.state.date}
                        onChange={this._handleDateChange}
                        onVisibilityChange={this._handleDate1VisibilityChange}
                        displayMode="portrait"
                        formatOptions={{
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }}

                      />
                      {/*<Button icon onClick={this._resetDate} className="md-cell--2">close</Button>*/}
                    </div>
                  </div>

                  <div className="md-grid">
                    <div className="md-cell--6 md-text-right"><p className=" label_title subheading">Additional
                      Info :</p></div>
                    <div className="md-cell--6"><TextField
                      id="helpMultiline"
                      placeholder="additional info"
                      rows={2}
                      maxRows={4}
                      onChange={this._handleAdditionalInfo}
                      className="md-cell-2"
                    /></div>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
          <style jsx>{`

                    p.label_title{
                        padding: 12px 15px 0 0;
                        margin:0;
                    }
                    .md-text-left {
                            text-align: center;
                        }


                            `}



          </style>
          {scrollup}
        </div>
      </Layout>

    )
  }

}

const mapStateToProps = (state) => {

  return {

    batchReport: state.dash.batchReport,
    isFetching: state.data.isFetching,
    paymentResponse: {...state.dash.paymentResponse}

  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {

    pagenate: (query, params, headers) => {
      return dispatch(getPagedBatchReport(query, params, headers))
    },
    mark_individual_as_paid: (obj, headers) => {
      return dispatch(mark_individual_as_paid(obj, headers))
    }

  }
}
BatchReportContainer.propTypes = {
    batchReport:PropTypes.object,
    batchName:PropTypes.string,
    headers:PropTypes.object,
    parentId:PropTypes.string,
    payment_status:PropTypes.string,
    pagenate:PropTypes.func,
    filterByPaymentStatus:PropTypes.func,
    mark_individual_as_paid:PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchReportContainer)