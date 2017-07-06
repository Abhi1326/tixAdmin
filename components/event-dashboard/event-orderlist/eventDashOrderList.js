/**
 * Created by consultadd on 3/4/17.
 */

import React, { Component } from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Loader from '../../common/pageLoader'
import Head from 'next/head'
import FontIcon from 'react-md/lib/FontIcons'
import Button from 'react-md/lib/Buttons'
import Avatar from 'react-md/lib/Avatars'
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer'
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer'
import Chip from 'react-md/lib/Chips'
import { Router } from '../../../routes'
import $ from 'jquery'

let tag = [];
let searchArray = [];
let chipset = [];
let totalPage=0;
let index_page=0;
let noData =false;
const today = new Date();
const twoMonthsAgo = new Date(new Date().setMonth(today.getMonth() - 2));
const oneYearFuture = new Date(new Date().setYear(today.getFullYear() + 1));
let todayAt1522 = null;
let disableFilter = false;
let closeBtn=false;



export  default class EventDashOrderList extends Component {


    constructor(props) {


        super(props);

        this.state={

            show_date_custom: null,
            show_time:null,
            chips:[],
            searchQuery: '',
            current:1,
            autohide: true,


        };

        this._handleShowdateChange = this._handleShowdateChange.bind(this);
        this._handleShowtimeChange = this._handleShowtimeChange.bind(this);
        // this.onChange = this.onChange.bind(this);
        this._handleSearchChange = this._handleSearchChange.bind(this);
        this.removeChip = this.removeChip.bind(this);

    }



    componentDidMount(){

        if (typeof window === 'undefined') {
            global.window = {}
        }else {
            $(window).scroll(function () {
                let $scroll_pos = 0;
                $scroll_pos = $(window).scrollTop();
                if ($scroll_pos >= 52) {
                    $('.search_top1').show().addClass('search_fixed1');
                } else {
                    $('.search_top1').hide()
                }
            });
        }
        // this.setState({
        //     pages:this.props.order_data.count,
        // })
    }



    _handleShowdateChange(val) {


        if(val === 'close'){
            this.setState({
                show_date_custom: null
            })
        }else{
            this.setState({ show_date_custom: val })
        }

    }

    _handleShowtimeChange(val) {


        if(val === 'close'){
            todayAt1522=null;
            this.setState({
                show_time: null
            })
        }else{
            let time=val.split(":");
            todayAt1522=new Date();
            todayAt1522.setHours(parseInt(time[0]));
            todayAt1522.setMinutes(parseInt(time[1]));
            this.setState({
                show_time: val
            })
        }

    }


    _handleSearchChange(target){

        let val=this.refs.search.value;
        this.setState({
            searchQuery: val
        });
            if(target.charCode===13 && val!==''){
                this.setState({
                    searchQuery: val
                });
                this.searchEnter(val)
            }
    }

    searchEnter(val){

        if(val!==''){
            let query1 = val;
            chipset.push(val);
            this.setState({
                chips: chipset
            });
            this.handelFilter()
        }
    }


    removeChip(index){

        this.refs.search.value = '';

        this.setState({
            current: 1,
        });

        let showDate;
        let showTime;
        if(this.state.show_date_custom===null){
            showDate = ''

        }
        else{
            showDate = this.state.show_date_custom;

        }
        if(this.state.show_time===null){

            showTime = ''
        }
        else{

            showTime = this.state.show_time;
        }


        let query = {
            show_date_custom: showDate,
            show_time: showTime
        };

        chipset.splice(index,1);
        console.log(chipset,"index");
        this.setState({
            chips: chipset,
        });
        this.props.filters(query,chipset)
    }



    handelFilter() {

        this.setState({
            current: 1,
        });

        let showDate;
        let showTime;
        if (this.state.show_date_custom === null) {
            showDate = ''
        }
        else {
            showDate = this.state.show_date_custom;
        }
        if (this.state.show_time === null) {
            showTime = ''
        }
        else {
            showTime = this.state.show_time;
        }


        let query = {
            show_date_custom: showDate,
            show_time: showTime
        };

        this.props.filters(query, chipset)
    }


    // onChange(current, pageSize) {
    //
    //     this.setState({
    //         current: current,
    //     });
    //     this.props.pageNumber(current);
    // }








    render() {

        if(this.props.eventdashOrder.length===0){
            noData= true
        }
        else{
            noData=false
        }

        return (


            <div className="page">

                <Head>
                    <title>Event Dashboard</title>
                    <link rel='stylesheet' href='/static/css/eventdashOrderlist.css'/>
                    <link href="https://fonts.googleapis.com/css?family=Revalia|Source+Sans+Pro" rel="stylesheet" />
                    <link rel='stylesheet' href='/static/css/base.css'/>
                    <script src="/static/js/main.js"/>
                </Head>

                        <section className="md-grid card_container">
                            <Card className=" md-cell--12 card_title_heading">
                                <CardTitle
                                    className='card_title_heading1'
                                    title={this.props.eventData.title}
                                />
                            </Card>
                        </section>
                        <section className="md-grid card_container">

                                    <Card className=" md-cell custom_card11">
                                        <CardTitle
                                            avatar={<FontIcon className="font_icon">inbox</FontIcon>}
                                            className='card_title'
                                            title="Total Sale"
                                        />
                                        <CardText className="card_value ">
                                            <span
                                                className="md-display-1 display-override display_number">{this.props.total_price}</span>
                                        </CardText>
                                    </Card>
                                    <Card className=" md-cell custom_card11">
                                        <CardTitle
                                            avatar={<FontIcon className="font_icon">inbox</FontIcon>}
                                            className='card_title'
                                            title="Payable Amount"
                                        />
                                        <CardText className="card_value">
                                            <span
                                                className="md-display-1 display-override display_number">{this.props.total_discounted_price}</span>
                                        </CardText>
                                    </Card>
                                    <Card className=" md-cell custom_card11">
                                        <CardTitle
                                            avatar={<FontIcon className="font_icon">inbox</FontIcon>}
                                            className='card_title'
                                            title="No. Of Tickets"
                                        />
                                        <CardText className="card_value">
                                            <span
                                                className="md-display-1 display-override display_number">{this.props.eventData.number_of_tickets}</span>
                                        </CardText>
                                    </Card>
                        </section>

                <div className="content-wrapper full_tag">

                    <section className="content" style={{paddingTop:'50px'}}>

                        <div className="main">
                            {/*<div className="md-grid">*/}
                                {/*/!*<h1 className="md-cell--8 main_heading">Event Detail </h1>*!/*/}
                              {/**/}
                            {/*</div>*/}
                            <form>
                                <div className=" md-grid md-cell--right">


                                    <DatePicker
                                        id="appointmentLandscape"
                                        autoOk
                                        iconBefore={false}
                                        label="Select Date"
                                        defaultValue={today}
                                        locales="en-IN"
                                        className="md-cell--3"
                                        displayMode="landscape"
                                        value={this.state.show_date_custom}
                                        onChange={this._handleShowdateChange}
                                        style={{margin: '-25px 0 0 22px'}}
                                    />
                                    <span className="adjustIcon" onClick={()=>this._handleShowdateChange('close')}><i className="material-icons">cancel</i></span>


                                    <TimePicker
                                        id="locale2"
                                        label="Select Time"
                                        locales="en-GB"
                                        defaultValue={todayAt1522}
                                        className="md-cell--3"
                                        placeholder="Select time"
                                        value={todayAt1522}
                                        onChange={this._handleShowtimeChange}
                                        style={{margin: '-25px 0 0 22px'}}
                                    />
                                    <span className="adjustIcon" onClick={()=>this._handleShowtimeChange('close')}><i className="material-icons">cancel</i></span>

                                    <Button style={{marginLeft:'67px'}} className="md-cell--1 md-cell--right" onClick={this.handelFilter.bind(this)} raised primary label="Filter"  />
                                    {this.props.eventdashOrder.length === 0 ? <Button  disabled style={{cursor:'no-drop'}} onClick={()=>this.props._handleExportToExcelDetail(this.props.eventData.id)} className="btn_export1" raised  label="Export To XL'S Detail View" />:<Button  onClick={()=>this.props._handleExportToExcelDetail(this.props.eventData.id)} className="btn_export1" raised  label="Export To XL'S Detail View" />}
                                    {this.props.eventdashOrder.length === 0 ? <Button disabled style={{cursor:'no-drop'}} onClick={()=>this.props._handleExportToExcel(this.props.eventData.id)} className="md-cell--0-offset btn_export2" raised  label="Export To XL'S View" />: <Button onClick={()=>this.props._handleExportToExcel(this.props.eventData.id)} className="md-cell--0-offset btn_export2" raised  label="Export To XL'S View" />}

                                </div>

                            </form>

                           <section className="search_top1">

                                <div className="md-grid">

                                    <input placeholder="search.." className="md-cell--6 search" ref="search" type="text" id="txtSearch" onKeyPress={this._handleSearchChange} />

                                    <div className=" md-cell md-cell--5 chip_list">
                                        {
                                            this.state.chips.map((chip,i)=>(
                                                <Chip
                                                    key={i}
                                                    label={chip}
                                                    avatar={<Avatar random>{chip[0]}</Avatar>}
                                                    removable
                                                    onClick={()=>{this.removeChip(i)}}
                                                />
                                            ))
                                        }
                                    </div>

                                    <Button id="btnSearch" disabled={noData} className="md-cell--1 noDrop"
                                                    style={{margin: '0 0 0 12px'}} raised primary
                                                    type="submit" label="Search"/>
                                </div>
                            </section>
                            <div>
                                {(!this.props.isFetching)?<span></span>:<div className="loader"><Loader /></div>}
                                <DataTable plain>
                                    <TableHeader >
                                        <TableRow >
                                            <TableColumn className="table_column">Booking Id</TableColumn>
                                            <TableColumn className="table_column" >Email</TableColumn>
                                            <TableColumn className="table_column" >Contact Number</TableColumn>
                                            <TableColumn className="table_column">No Of Tickets</TableColumn>
                                            <TableColumn className="table_column" >Total Amount Paid</TableColumn>
                                            <TableColumn className="table_column" >Total Payment</TableColumn>
                                            <TableColumn className="table_column" >Total Discount</TableColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        { this.props.eventdashOrder.map((order, i) => (
                                            <TableRow key={i}>
                                                <TableColumn >{order.book_id}</TableColumn>
                                                <TableColumn >{order.user_email}</TableColumn>
                                                <TableColumn>{order.user_mobile}</TableColumn>
                                                <TableColumn className='md-text-center'>{order.number_of_tickets}</TableColumn>
                                                <TableColumn className='md-text-center'>{order.ticket_amount}</TableColumn>
                                                <TableColumn className='md-text-center'>{order.total_payment}</TableColumn>
                                                <TableColumn className='md-text-center'>{order.total_discount}</TableColumn>
                                            </TableRow>))

                                        }
                                    </TableBody>
                                </DataTable>
                            </div>

                            {/*<Pagination*/}
                                {/*defaultPageSize={30}*/}
                                {/*defaultCurrent={1}*/}
                                {/*current={this.state.current}*/}
                                {/*onChange={this.onChange}*/}
                                {/*total={this.props.OrderPage}*/}
                            {/*/>*/}
                        </div>



                    </section>
                </div>





                <style jsx>{`
                        .theatre_report {
                            width: 100%;
                            margin-bottom: 14px;
                            margin-top: 5px;
                            background-color: white;
                            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
                        }
                        .table_column {
                            padding-right: 7px;
                            padding-left: 7px !important;
                            }
                            .custom_card_local {
                                    max-width: 384px;

                                }
                          .table-head{
                font-size: 14px;
                font-weight: 600;
                letter-spacing: 0.5px;
                color: #444;
                }
                .custom_adjust{
                 margin: -25px 0 0 10px;

                }
                .NotFound{
                text-align:center;
                }
                .smile{
                    display: block;
                    color: #737272;
                    transform: rotate(90deg);
                    font-size: 116px;
                    }
                 .NotFound p{
                        margin-top: 50px;

                 }
                  .NotFound p span{
                         font-size: 50px;
                           font-family: 'Open Sans Condensed', sans-serif;
                 }
                 .search,.search:focus{
                    outline:none;
                    border: none;
                    border-bottom: 1px solid #ddd;
                 }
                 .btnChange{
                     margin: 0 0 0 42px;
                     }
                     .adjustIcon{

                         margin: 5px 0px 0px -24px;
                         display:block;
                             z-index: 9;
                            cursor: pointer;
                     }
                     .wdata{
                     text-shadow: 2px 3px 6px black;
                     }
                 .chip_list{
                 margin:0px;
                 }
                 .page_view{
                     float: right;
                     margin: -5px;
                 }
                 .shadow{
                     box-shadow: 2px -1px 1px #888888;
                 }

                     .search_fixed1{

                    position: fixed;
                    top: 64px;
                    left: 72px;
                    width: calc(100% - 72px);
                    height: auto;
                    background-color: #fff;
                    z-index: 13;
                    border: 1px solid #ddd;
                    box-shadow: 3px 2px 9px rgba(0, 0, 0, 0.33);
                    transition: all 0.3s ease;

                 }


                   .theatre_report {
                            width: 100%;
                            margin-bottom: 14px;
                            margin-top: 5px;
                            background-color: white;
                            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
                        }
                        .card_container{
                        width:100%
                        }


                       `}
                </style>
            </div>

        );
    }
}

