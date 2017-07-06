/**
 * Created by consultadd on 6/2/17.
 */

import React from 'react'
import Head from 'next/head'
import _ from 'underscore'
import Button from 'react-md/lib/Buttons/Button'
import Snackbar from 'react-md/lib/Snackbars'
import $ from 'jquery'
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import FontIcon from 'react-md/lib/FontIcons'




export class OrderDetail extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            toasts: [],
            autohide: true,
            collapsePayment: false,
            collapseShowDetail: false

        };

        this.handleRefundButton = this.handleRefundButton.bind(this);
        this.handleCancelButton = this.handleCancelButton.bind(this);
        this.handleResendButton = this.handleResendButton.bind(this);
        this._removeToast = this._removeToast.bind(this);
        this._toastMultiple = this._toastMultiple.bind(this);
        this.openBox = this.openBox.bind(this);
        this.object_iterator = this.object_iterator.bind(this)
        this.openPaymentDetail = this.openPaymentDetail.bind(this)
        this.openShowDetail = this.openShowDetail.bind(this)


    }

    componentDidMount() {
        if (typeof window === 'undefined') {
            global.window = {}
        } else {
            $(window).scroll(function () {
                let $scroll_pos = 0;
                $scroll_pos = $(window).scrollTop();
                if ($scroll_pos >= 52) {
                    $('.search_top').addClass('search_fixed');
                } else {
                    $('.search_top').removeClass('search_fixed');
                }
            });
        }
    }


    handleResendButton(id) {

        this.props.getResendData(id, this.props.headers).then(res => {
            this.openBox(res);
        })
    }

    handleCancelButton(id) {

        this.props.getCancelData(id, this.props.headers).then(res => {
            this.openBox(res);

        })
    }


    handleRefundButton(id) {

        this.props.getRefundData(id, this.props.headers).then(res => {
            this.openBox(res);
        })
    }

    openBox(a) {
        this.openToastr(a)
    }


    openToastr(data) {

        toastr.options = {
            closeButton: '<button><i class="icon-off"></i></button>',
            positionClass: 'toast-top-full-width',
            onclick: null,
            closeMethod: 'fadeOut',
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "preventDuplicates": true,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        if (data.Message) {
            toastr.success(data.Message);
        } else if (data.error) {
            toastr.warning(data.error);
        } else if (data === "error") {
            toastr.error("Sryy...some error has been occured!!!!!!!!");
        } else {
            toastr.success(data.success);
        }
    }


    //start snackbar
    componentWillUpdate(nextProps, nextState) {

    }

    _removeToast() {
        const [, ...toasts] = this.state.toasts;
        this.setState({toasts});
    }

    _toastMultiple(id, val) {

        if (val === 'cancel') {
            const toasts = this.state.toasts.slice();
            toasts.push({
                text: 'Are You Sure...You Wanna Do This ????',
                action: {
                    label: 'Yes!!',
                    onClick: () => {
                        this.handleCancelButton(id)
                    },
                },
            });

            this.setState({toasts});
        } else if (val === 'resend') {
            const toasts = this.state.toasts.slice();
            toasts.push({
                text: 'Are You Sure...You Wanna Do This ????',
                action: {
                    label: 'Yes!!',
                    onClick: () => {
                        this.handleResendButton(id)
                    },
                },
            });

            this.setState({toasts});
        } else if (val === 'refund') {
            const toasts = this.state.toasts.slice();
            toasts.push({
                text: 'Are You Sure...You Wanna Do This ????',
                action: {
                    label: 'Yes!!',
                    onClick: () => {
                        this.handleRefundButton(id)
                    },
                },
            });

            this.setState({toasts});
        }

    }

    //end snackbar
    openPaymentDetail() {
        if (this.state.collapsePayment === false) {
            this.setState({
                collapsePayment: true
            })
        }
        else {
            this.setState({
                collapsePayment: false
            })
        }

    }

    openShowDetail() {
        if (this.state.collapseShowDetail === false) {
            this.setState({
                collapseShowDetail: true
            })
        }
        else {
            this.setState({
                collapseShowDetail: false
            })
        }

    }


    object_iterator(val, k) {
        let keys = _.keys(val);
        let values = _.values(val);
        return (<div key={k} style={{backgroundColor: "white"}}>
            {
                keys.map((key, i) => (
                    (typeof values[i] === 'object') ? null :
                        (values[i] instanceof Array) ? null :
                            <div className="md-grid padding-bottom-0px" key={i}>
                                <div className="md-cell--4">
                                    <strong className="md-text-right" style={{whiteSpace: "nowrap"}}>{key} : </strong>
                                </div>
                                <div className="md-cell--8">
                                    <p>{values[i]}</p>
                                </div>
                            </div>

                ))
            }
        </div>)
    }


    render() {
        const movie = this.props.OrderDetail;


        return (
            <div className="md-grid custom_grid page">
                <Head>
                    <title>Movie Order Detail</title>
                    <link rel='stylesheet' href='/static/css/order.css'/>
                    <link rel='stylesheet' href='/static/css/pagination.css'/>
                    <link rel='stylesheet' href='/static/css/customScroll.css'/>
                    <link rel='stylesheet' href='/static/css/eventorderDetail.css'/>
                    <link rel='stylesheet' href='/static/css/toastr.css'/>
                    <script src="/static/js/main.js"/>
                </Head>
                <div>
                    <div className="md-grid">
                    <h1 className=" md-cell--4 main_heading_crm">Movie Order Detail</h1>
                        <div className="md-text-right md-cell--8 search_top"
                             style={{paddingTop: '20px'}}>
                            {(movie.order.order_state !== 'complete' && movie.order.payment_gateway === "justpay" && movie.order.payment_state === "captured") ?
                                <Button raised onClick={() => this._toastMultiple(movie.order.id, 'refund')}
                                        style={{marginRight: '12px', backgroundColor: '#1582ce', color:'white'}}
                                        label="Refund"/> : <Button raised disabled style={{
                                    marginRight: '12px',
                                    backgroundColor: '#1582ce',
                                    cursor: 'no-drop',
                                    opacity: '0.5',
                                    color:'white'
                                }} label="Refund"/>}
                            <Button raised onClick={() => this._toastMultiple(movie.order.id, 'cancel')}
                                    style={{marginRight: '12px', backgroundColor: 'rgba(235, 0, 0, 0.56)',color:'white'}}
                                    label="Cancel"/><Snackbar style={{width: ' 48%', height: '67px' }}
                                                              toasts={this.state.toasts}
                                                              onDismiss={this._removeToast}/>
                            <Button raised onClick={() => this._toastMultiple(movie.order.id, 'resend')}
                                    style={{marginRight: '12px', backgroundColor: '#1582ce', color:'white'}}
                                    label="Resend"/>
                        </div>
                    </div>
                    <div >
                        {(typeof  movie.order.order_state !== 'undefined') ?

                            <div>
                                <div className="md-grid" style={{marginLeft: '10px'}}>

                                    <div className="md-cell--12 ">
                                        <ExpansionList >
                                            <ExpansionPanel secondaryLabel="General" defaultExpanded  label={<FontIcon>account_box</FontIcon>}>
                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Booking Id</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.order.book_id}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>User Email</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.order.user_email}</p>
                                            </div>
                                        </div>


                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>User Mobile</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.order.user_mobile}</p>
                                            </div>
                                        </div>


                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Order State</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.order.order_state}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Transaction Id</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.order.transaction_id}</p>
                                            </div>
                                        </div>


                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Confirmation Code</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.confirmation_code}</p>
                                            </div>
                                        </div>


                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Theatre</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.order.theatre}</p>
                                            </div>
                                        </div>
                                            </ExpansionPanel>
                                        </ExpansionList>

                                        <ExpansionList>
                                            <ExpansionPanel secondaryLabel="Payment"  label={<FontIcon>payment</FontIcon>}>
                                                <div className="md-cell--12">
                                                    {movie.payment.map((val, i) => (
                                                        this.object_iterator(val, i)
                                                    ))}
                                                </div>
                                            </ExpansionPanel>
                                        </ExpansionList>

                                        <ExpansionList>
                                            <ExpansionPanel  secondaryLabel="Show"  label={<FontIcon>movie</FontIcon>}>
                                                <div className="md-cell--12">
                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Show Time</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.show_time}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Show Date</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.show_date}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Movie Name</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.movie_name}</p>
                                            </div>
                                        </div>

                                                            {this.object_iterator(movie.show_detail)}


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
                                                <p>{movie.ticket_amount}</p>
                                            </div>
                                        </div>
                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Number Of Tickets</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.number_of_tickets}</p>
                                            </div>
                                        </div>


                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Booking Fee Amount</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.booking_fee_amount}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Discount Amount</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.discount_amount}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Total Payment</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.total_payment_by_user}</p>
                                            </div>
                                        </div>

                                        <div className="md-grid padding-bottom-0px">
                                            <div className="md-cell--4">
                                                <strong>Total Sale</strong>
                                            </div>
                                            <div className="md-cell--8">
                                                <p>{movie.total_sale}</p>
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
                <style jsx>{`

                  .search_fixed{
                    position: fixed;
                    top: 64px;
                    left: 72px;
                    width: calc(100% - 72px);
                    padding: 15px;
                    height: auto;
                    background-color: #fff;
                    z-index: 13;
                    border: 1px solid #ddd;
                    box-shadow: 3px 2px 9px rgba(0, 0, 0, 0.33);
                    transition: all 0.3s ease;

                 }
         `}</style>
            </div>

        )
    }
}

export  default  OrderDetail
