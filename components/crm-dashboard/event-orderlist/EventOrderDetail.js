import React from 'react'
import Head from 'next/head'
import _ from 'underscore'
import Button from 'react-md/lib/Buttons/Button'
import Snackbar from 'react-md/lib/Snackbars'
import $ from 'jquery'
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import FontIcon from 'react-md/lib/FontIcons'





export class EventOrderDetail extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      toasts: [],
      autohide: true,
      collapsePayment:false,
      collapseShowDetail:false,
    }

    this.handleRefundButton = this.handleRefundButton.bind(this)
    this.handleCancelButton = this.handleCancelButton.bind(this)
    this.handleResendButton = this.handleResendButton.bind(this)
    this._removeToast = this._removeToast.bind(this)
    this._toastMultiple = this._toastMultiple.bind(this)
    this.openBox = this.openBox.bind(this)
    this.object_iterator = this.object_iterator.bind(this)
    this.openPaymentDetail = this.openPaymentDetail.bind(this)
    this.openShowDetail = this.openShowDetail.bind(this)




  }

  componentDidMount () {

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
  componentWillUpdate (nextProps, nextState) {

  }

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
    openPaymentDetail(){
    if(this.state.collapsePayment===false){
        this.setState({
            collapsePayment:true
        })
    }
    else {
        this.setState({
            collapsePayment:false
        })
    }

    }
    openShowDetail(){
        if(this.state.collapseShowDetail===false){
            this.setState({
                collapseShowDetail:true
            })
        }
        else {
            this.setState({
                collapseShowDetail:false
            })
        }

    }

  //end snackbar

  object_iterator (val, k) {
    let keys = _.keys(val)
    let values = _.values(val)
    return (<div key={k} style={{backgroundColor: 'white'}}>
      {
        keys.map((key, i) => (
          (typeof values[i] === 'object') ? null : (values[i] instanceof Array) ? null :
            <div className="md-grid padding-bottom-0px" key={i}>
              <div className="md-cell--4">
                <strong className="md-text-right" style={{whiteSpace: 'nowrap'}}>{key}  </strong>
              </div>
              <div className="md-cell--8">
                <p>{values[i]}</p>
                {/*<input style={{border: 'none', backgroundColor: 'white'}} placeholder={values[i]} disabled/>*/}
              </div>
            </div>

        ))
      }
    </div>)
  }

  render () {

    const event = this.props.OrderDetail

    return (
      <div className="md-grid custom_grid page">
        <Head>
          <title>Event Order Detail</title>
          <link rel='stylesheet' href='/static/css/order.css'/>
          <link rel='stylesheet' href='/static/css/pagination.css'/>
          <link rel='stylesheet' href='/static/css/customScroll.css'/>
          <link rel='stylesheet' href='/static/css/eventorderDetail.css'/>
          <link rel='stylesheet' href='/static/css/toastr.css'/>
          <script src="/static/js/main.js"/>
        </Head>
        <div>
          <div className="md-grid">
          <h1 className=" md-cell--4 main_heading_crm">Event Order Detail</h1>
          <div className="md-text-right md-cell--8 search_top" style={{paddingTop: '20px'}}>
              {(event.order.order_state !== 'complete' && event.order.payment_gateway === 'justpay' && event.order.payment_state == 'captured') ?
                  <Button raised onClick={() => this._toastMultiple(event.order.id, 'refund')}
                          style={{marginRight: '12px', backgroundColor: '#1582ce', color:'white'}} label="Refund"/> :
                  <Button raised disabled
                          style={{marginRight: '12px', color:'white', backgroundColor: '#1582ce', cursor: 'no-drop', opacity: '0.5'}}
                          label="Refund"/>}
            <Button raised onClick={() => this._toastMultiple(event.order.id, 'cancel')}
                    style={{marginRight: '12px', backgroundColor: 'rgba(235, 0, 0, 0.56)' ,color:'white'}}
                    label="Cancel"/><Snackbar ref="snack" style={{width: ' 48%', height: '67px'}}
                                              toasts={this.state.toasts} onDismiss={this._removeToast}/>
            <Button raised onClick={() => this._toastMultiple(event.order.id, 'resend')}
                    style={{marginRight: '12px', backgroundColor: '#1582ce', color:'white'}} label="Resend"/>
          </div>
          </div>
          <div >
            {(typeof  event.order.order_state !== 'undefined') ?
            <div >
              <div className="md-grid" style={{marginLeft:'10px'}}>

                <div className="md-cell--12">
                  <ExpansionList >
                    <ExpansionPanel secondaryLabel="General" defaultExpanded  label={<FontIcon>account_box</FontIcon>}>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Booking Id</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.order.book_id}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>User Email</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.order.user_email}</p>
                      </div>
                    </div>


                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>User Mobile</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.order.user_mobile}</p>
                      </div>
                    </div>


                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Order State</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.order.order_state}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Transaction Id</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.order.transaction_id}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Confirmation Code</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.confirmation_code}</p>
                      </div>
                    </div>


                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Number Of Tickets</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.number_of_tickets}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Event Name</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.event_name}</p>
                      </div>
                    </div>
                    </ExpansionPanel>
                  </ExpansionList>

                  <ExpansionList>
                    <ExpansionPanel secondaryLabel="Payment"  label={<FontIcon>payment</FontIcon>}>
                              <div className="md-cell--12">
                            {event.payment.map((val, i) => (
                                this.object_iterator(val, i)
                            ))}
                        </div>
                    </ExpansionPanel>
                  </ExpansionList>


                  <ExpansionList>
                    <ExpansionPanel secondaryLabel="Show"  label={<FontIcon>movie</FontIcon>}>
                              <div className="md-cell--12">
                              <div className="md-grid" >
                                <div className="md-cell--4">
                                  <strong>Show Time</strong>

                                </div>
                                <div className="md-cell--8" >
                                  <p>{event.show_time}</p>
                                </div>
                              </div>

                              <div className="md-grid">
                                <div className="md-cell--4">
                                  <strong>Show Date</strong>

                                </div>
                                <div className="md-cell--8">
                                  <p>{event.show_date}</p>
                                </div>
                              </div>
                                {event.show_detail.map((val, i) => (
                                    this.object_iterator(val, i)
                                ))}
                            </div>
                    </ExpansionPanel>
                  </ExpansionList>


                  <ExpansionList>
                    <ExpansionPanel secondaryLabel="Ticket"  label={<FontIcon>style</FontIcon>}>
                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Ticket Amount</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.ticket_amount}</p>
                      </div>
                    </div>


                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Booking Fee Amount</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.booking_fee_amount}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Discount Amount</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.discount_amount}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Total Payment</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.total_payment_by_user}</p>
                      </div>
                    </div>

                    <div className="md-grid padding-bottom-0px">
                      <div className="md-cell--4">
                        <strong>Total Sale</strong>

                      </div>
                      <div className="md-cell--8">
                        <p>{event.total_sale}</p>
                      </div>
                    </div>
                    </ExpansionPanel>
                  </ExpansionList>

                </div>



              </div>


            </div> : <div></div>

            }

          </div>

        </div>
        <style jsx>{` `}</style>
      </div>

    )
  }
}

export  default  EventOrderDetail
