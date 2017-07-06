
import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import { Router } from '../../../routes'
import PropTypes from 'prop-types'


let noData = false;
export class TheatreWiseReport extends React.Component {

  constructor (props) {
    super(props)

  }

  viewMore () {
    Router.pushRoute('theatrereport')
  }

  render () {

    if (typeof this.props.theatreWiseReport === 'undefined' || this.props.theatreWiseReport.length === 0) {
      noData = true
    }
    else {
      noData = false
    }

    return (
      <div className="theatre_report">

        <h2 className="main_heading">Theatre Report (Date Range: {this.props.date1}
          - {this.props.date2})</h2>
        <div id="theatre_table">
          <DataTable plain>
            <TableHeader >
              <TableRow>
                <TableColumn className="prevent-grow ">Theatre Name</TableColumn>
                <TableColumn className="prevent-grow ">Ticket Amount</TableColumn>
                <TableColumn className="prevent-grow ">Tickets</TableColumn>
                <TableColumn className="prevent-grow ">Booking Fee</TableColumn>
                <TableColumn className="prevent-grow ">PG Charge</TableColumn>
                <TableColumn className="prevent-grow ">Commission Share</TableColumn>
                <TableColumn className="prevent-grow ">City</TableColumn>
                <TableColumn >Orders</TableColumn>
              </TableRow>
            </TableHeader>

            <TableBody>
              {
                this.props.theatreWiseReport.map((theatre, i) => (
                  <TableRow key={i}>
                    <TableColumn >{theatre.name}</TableColumn>
                    <TableColumn >{theatre.ticket_amount}</TableColumn>
                    <TableColumn>{theatre.tickets}</TableColumn>
                    <TableColumn >{theatre.booking_fee}</TableColumn>
                    <TableColumn>{theatre.pg_charges}</TableColumn>
                    <TableColumn>{theatre.commission_charges}</TableColumn>
                    <TableColumn>{theatre.city}</TableColumn>
                    <TableColumn>{theatre.orders}</TableColumn>
                  </TableRow>
                ))
              }

            </TableBody>
          </DataTable>
          {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
            className="smile">:(</span></p></div>}
        </div>

        <div className="detail_btn">
          <Button className="btn_disabled" raised primary type="submit" label="Theatre Detail Report" onClick={() => {
            this.viewMore()
          }}/>
        </div>

        <style jsx>{`

                    `}
        </style>
      </div>
    )
  }
}

TheatreWiseReport.propTypes = {
    theatreWiseReport:PropTypes.array,
    authData:PropTypes.object,
    date1:PropTypes.string,
    date2:PropTypes.string,

};

export  default  TheatreWiseReport