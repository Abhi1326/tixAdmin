import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../common/layout'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Head from 'next/head'
import { Router } from '../../../routes'
import TextField from 'react-md/lib/TextFields'
import _ from 'underscore'
import FontIcon from 'react-md/lib/FontIcons'
import { getSingleOrgOrdersToExcel } from '../../../actions/eventDashboardActions'
import Button from 'react-md/lib/Buttons'

class OrganiserEventListContainer extends Component {

  constructor (props) {
    super(props)
    this._getOrderlist = this._getOrderlist.bind(this)
    this._handleSorting = this._handleSorting.bind(this)
    this._handleFilter = this._handleFilter.bind(this)
    this._handleSingleOrgOrdersToExcel = this._handleSingleOrgOrdersToExcel.bind(this)

    this.state = {
      sortTitle: false,
      sortTickets: false,
      eventData: []
    }

  }

  _handleSingleOrgOrdersToExcel (id) {

    this.props.getSingleOrgOrdersToExcel(id)
  }

  componentWillReceiveProps (props) {
    this.setState({
      eventData: props.eventData
    })
  }

  componentDidMount () {
    this.setState({
      eventData: this.props.eventData
    })
  }

  _getOrderlist (id) {
    Router.pushRoute('eventdashorderlist', {id: id})
  }

  _handleFilter (val) {

    val = val.toLowerCase()

    console.log(val, 'val.toLowerCase()')

    const arr = _.filter(this.props.eventData, (event) => {
      const condition = (event.title.toLowerCase().includes(val)) || (event.event_partner.title.toLowerCase().includes(val)) || ((event.number_of_tickets.toString()).includes(val))
      if (condition) {
        return event
      }

    })
    this.setState({
      eventData: arr
    })

  }

  _handleSorting (val) {
    if (this.state.sortTitle === false && val === 'title') {
      const arr = _.sortBy(this.state.eventData, val)
      this.setState({
        sortTickets: false,
        sortTitle: true,
        eventData: arr
      })
    }
    else if (this.state.sortTitle === true && val === 'title') {
      let arr = []
      const length = this.state.eventData.length
      for (let i = length - 1; i >= 0; i--) {
        arr.push(this.state.eventData[i])
      }
      this.setState({
        sortTickets: false,
        sortTitle: false,
        eventData: arr
      })
    }
    else if (this.state.sortTickets === true && val === 'number_of_tickets') {
      let arr = []
      const length = this.state.eventData.length
      for (let i = length - 1; i >= 0; i--) {
        arr.push(this.state.eventData[i])
      }
      this.setState({
        sortTitle: false,
        sortTickets: false,
        eventData: arr
      })
    }
    else {
      const arr = _.sortBy(this.state.eventData, val)
      this.setState({
        sortTitle: false,
        sortTickets: true,
        eventData: arr
      })
    }

  }

  render () {

    return (

      <Layout >

        <Head>
          <title>Event Dashboard</title>
          <link rel='stylesheet' href='/static/css/organiserEventlist.css'/>
        </Head>

        <div className="main">
          <section className="md-grid">
            <h2 className="main_heading md-cell--6">{this.props.orgData.title} Events </h2>
            <div className="md-cell--4 md-text-right">
              <Button onClick={() => this._handleSingleOrgOrdersToExcel(this.props.orgData.id)}
                      className="btn_export1"
                      style={{marginTop: '24px'}}
                      raised primary label={'Export ' + this.props.orgData.title + ' orders To Xls'}/>
            </div>
            <div className="md-cell--right md-cell--2">

              <TextField
                id="floatingCenterTitle"
                lineDirection="center"
                placeholder="Search"
                className="md-cell-2"
                style={{marginTop: '18px'}}
                leftIcon={<FontIcon >search</FontIcon>}
                onChange={this._handleFilter}
              />
            </div>
            <div id="theatre_table">
              <DataTable plain>
                <TableHeader >
                  <TableRow >
                    <TableColumn sorted={this.state.sortTitle} onClick={() => this._handleSorting('title')}
                                 className="table_column ">Title</TableColumn>
                    <TableColumn className="table_column md-text-center">Organizer</TableColumn>
                    <TableColumn sorted={this.state.sortTickets}
                                 onClick={() => this._handleSorting('number_of_tickets')}
                                 className="table_column md-text-center prevent-grow">No Of Tickets
                      Available</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { this.state.eventData.map((event, i) => (
                    <TableRow className="row_hover" key={i} onClick={() => this._getOrderlist(event.id)}>
                      <TableColumn
                        style={{color: 'rgb(11, 102, 173)'}}>{event.title}</TableColumn>
                      <TableColumn className='md-text-center'>{event.event_partner.title}</TableColumn>
                      <TableColumn className='md-text-center'>
                        {event.number_of_tickets}</TableColumn>
                    </TableRow>))

                  }
                </TableBody>
              </DataTable>
            </div>
          </section>

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

                       `}
          </style>

        </div>

      </Layout>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    eventData: state.event_dash.eventData,
    // organizerTitle:state.event_dash.organizer,
    orgData: state.event_dash.orgData
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleOrgOrdersToExcel: (id) => {
      dispatch(getSingleOrgOrdersToExcel(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganiserEventListContainer)