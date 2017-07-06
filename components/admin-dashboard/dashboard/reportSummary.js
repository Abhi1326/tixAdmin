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
import PropTypes from 'prop-types'


let noData = false

export class ReportSummary extends React.Component {

  constructor (props) {
    super(props)

  }

  detailReport (id) {

    Router.pushRoute('batchwisereport', {id: id})
  }

  render () {

    if ((typeof  this.props.report !== 'undefined') && ( this.props.report === 0)) {
      noData = true
    }
    else {
      noData = false
    }

    return (
      <div className="report_summary">

        <h1 className="main_heading">Report Summary</h1>
        <div id="report_table">
          <DataTable plain>
            <TableHeader >
              <TableRow>
                <TableColumn className="prevent-grow ">Movie Partner Name</TableColumn>
                <TableColumn className="prevent-grow ">Payable Amount</TableColumn>
                <TableColumn className="prevent-grow ">Payment Status</TableColumn>
                <TableColumn >View more</TableColumn>

              </TableRow>
            </TableHeader>

            <TableBody>
              {
                this.props.report.map((report, i) => (
                  <TableRow key={i}>
                    <TableColumn >{report.movie_partner_name}</TableColumn>
                    <TableColumn>Rs.{report.payable_amount__sum}</TableColumn>
                    <TableColumn
                      style={{textTransform: 'capitalize'}}>{report.payment_status}</TableColumn>
                    <TableColumn>
                      <Button raised primary type="submit" label="View more" onClick={() => {
                        this.detailReport(report.movie_partner__parent)
                      }}/>
                    </TableColumn>
                  </TableRow>
                ))
              }

            </TableBody>
          </DataTable>

          {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
            className="smile">:(</span></p></div>}

        </div>

        <style jsx>{`

                     `}
        </style>

      </div>
    )
  }
}
ReportSummary.propTypes = {
    report:PropTypes.array,

};
export  default  ReportSummary