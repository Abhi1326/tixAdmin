import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../../common/layout'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import Head from 'next/head'
import FontIcon from 'react-md/lib/FontIcons'
import { Router } from '../../../routes'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import TextField from 'react-md/lib/TextFields'
import _ from 'underscore'
import Button from 'react-md/lib/Buttons/Button'
import { getAllOrdersInExcel } from '../../../actions/eventDashboardActions'

let noData = false
class EventDashboardContainer extends Component {

  constructor (props) {
    super(props)
    this._getEventList = this._getEventList.bind(this)
    this.handleClickDetailEventPage = this.handleClickDetailEventPage.bind(this)
    this._handleSorting = this._handleSorting.bind(this)
    this.organizerName = this.organizerName.bind(this)
    this._handleFilter = this._handleFilter.bind(this)
    this._handleAllOrdersToExcel = this._handleAllOrdersToExcel.bind(this)

    this.state = {
      sortTitle: false,
      sortTickets: false,
      eventData: []
    }

  }

  _handleAllOrdersToExcel () {
    this.props.getAllOrdersInExcel()
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

  _handleFilter (val) {
    val = val.toLowerCase()

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

  handleClickDetailEventPage (id) {
    Router.pushRoute('eventdashorderlist', {id: id})
  }

  _handleSorting (val) {
    console.log(val)

    if (this.state.sortTitle == false && val === 'title') {
      const arr = _.sortBy(this.state.eventData, val)
      this.setState({
        sortTickets: false,
        sortTitle: true,
        eventData: arr
      })
    }
    else if (this.state.sortTitle == true && val === 'title') {
      var arr = []
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
    else if (this.state.sortTickets == true && val === 'number_of_tickets') {
      var arr = []
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

  _getEventList (id) {
    Router.pushRoute('organisereventlist', {id: id})
  }

  organizerName (val) {
    return val.title

  }

  render () {
    if (this.state.eventData.length===0){
      noData=true
    }
    else{
      noData=false
    }
    return (

      <Layout >

        <Head>
          <title>Event Dashboard</title>
          <link rel='stylesheet' href='/static/css/eventMember.css'/>
          <link href="https://fonts.googleapis.com/css?family=Revalia|Source+Sans+Pro" rel="stylesheet"/>

        </Head>

        <div>
          <div className="main">
            <div className="md-grid">
              <h2 className="main_heading md-cell--6">Event Partners</h2>
              <div className="md-cell--6 md-text-right">
                <Button onClick={this._handleAllOrdersToExcel}
                        className="btn_export1"
                        style={{marginTop: '24px'}}
                        raised primary label="Export All Orders To Excel"/>
              </div>
            </div>

            <section className="md-grid card_container">

              {(this.props.eventPartner.length!==0)?
                this.props.eventPartner.map((partner, i) => (
                <Card key={i} className=" md-cell custom_card1"
                      onClick={() => this._getEventList(partner.event_partner.oragnization)}>
                  <CardTitle
                    avatar={<FontIcon className="font_icon">inbox</FontIcon>}
                    className='card_title'
                    title={partner.event_partner.title}
                  />
                  <CardText className="card_value">
                    <span className="md-display-5 display-override display_text">Total No Of Tickets Sold: </span>
                    <span className="md-display-1 display-override display_number">{partner.count}</span>
                  </CardText>
                </Card>
              )):<div>No Data Found</div>
              }

            </section>
          </div>
          {/*<section className="md-grid main">*/}
          {/*<BootstrapTable data={ this.props.eventData }*/}
          {/*bordered={ false }*/}
          {/*hover={ true }>*/}
          {/*<TableHeaderColumn ref='nameCol'  filter={ { type: 'TextFilter', delay: 200 }} dataField='title'  isKey={true} dataSort={true}>Title</TableHeaderColumn>*/}
          {/*<TableHeaderColumn dataField='event_partner' dataFormat={ this.organizerName } dataAlign="center" dataSort={true}>Organizer</TableHeaderColumn>*/}
          {/*<TableHeaderColumn dataField='number_of_tickets'  dataAlign="center" dataSort={true}>No Of Tickets Available</TableHeaderColumn>*/}
          {/*</BootstrapTable>*/}
          {/*</section>*/}
          <section className="md-grid main">
            <h2 className="main_heading">Events</h2>
            <div className="md-cell--right shift_text">
              <TextField
                id="floatingCenterTitle"
                lineDirection="center"
                placeholder="Search"
                className="md-cell-2 "
                leftIcon={<FontIcon>search</FontIcon>}
                onChange={this._handleFilter}
              />
            </div>
            <div id="theatre_table">
              <DataTable plain>
                <TableHeader >
                  <TableRow >
                    <TableColumn sorted={this.state.sortTitle} onClick={() => this._handleSorting('title')}
                                 className="table_column">Title</TableColumn>
                    <TableColumn className="table_column">Organizer</TableColumn>
                    <TableColumn sorted={this.state.sortTickets}
                                 onClick={() => this._handleSorting('number_of_tickets')}
                                 className="table_column prevent-grow">No Of Tickets Available</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { this.state.eventData.map((event, i) => (
                    <TableRow className="row_hover" key={i}>
                      <TableColumn style={{color: 'rgb(11, 102, 173)'}}
                                   onClick={() => {this.handleClickDetailEventPage(event.id)}}>{event.title}</TableColumn>
                      <TableColumn >{event.event_partner.title}</TableColumn>
                      <TableColumn className='md-text-center'>
                        {event.number_of_tickets}</TableColumn>
                    </TableRow>))

                  }
                </TableBody>
              </DataTable>
              {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
                  className="smile">:(</span></p></div>}
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
                        .card_container{
                        width:100%
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
    eventPartner: state.event_dash.eventPartner,
    eventData: state.event_dash.eventData
  }

  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrdersInExcel: () => {
      dispatch(getAllOrdersInExcel())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboardContainer)
