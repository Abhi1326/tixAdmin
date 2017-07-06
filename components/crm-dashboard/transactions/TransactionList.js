import React from 'react'
import Head from 'next/head'
import Avatar from 'react-md/lib/Avatars'
import DataTable from 'react-md/lib/DataTables/DataTable'
import TableHeader from 'react-md/lib/DataTables/TableHeader'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import Button from 'react-md/lib/Buttons/Button'
import Chip from 'react-md/lib/Chips'
import { Router } from '../../../routes'
import Loader from '../../common/pageLoader'
import $ from 'jquery'
import { scrollup } from '../../common/scrollup'

let noData = false
let chipset = []
export class TransactionList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      transactions: [],
      chips: [],
      searchQuery: '',
      loader: this.props.Loader
    }

    this._handleSearchChange = this._handleSearchChange.bind(this)

  }

  componentDidMount () {
    if (typeof window === 'undefined') {
      global.window = {}
    } else {
      $(window).scroll(function () {
        let $scroll_pos = 0
        $scroll_pos = $(window).scrollTop()
        if ($scroll_pos >= 52) {
          $('.search_top').addClass('search_fixed')
        } else {
          $('.search_top').removeClass('search_fixed')
        }
      })
    }
  }

  componentWillUnmount () {
    chipset = []
  }

  componentWillMount () {
    this.setState({
      transactions: this.props.Transaction
    })

  }

  _handleSearchChange (target) {

    let searchval = this.refs.search.value
    this.setState({
      searchQuery: searchval,
    })
    if (target.charCode === 13 && searchval !== '') {
      this.setState({
        searchQuery: searchval
      })
      this.searchEnter(searchval)
    }
  }

  // $("#search").keydown(function(event){
  //     if(event.keyCode == 13){
  //         console.log('click event');
  //
  //     }
  // });
  //
  // function searchEnter(val) {
  //     let query1 = val
  //     chipset.push(val)
  //     this.setState({
  //         chips: chipset
  //     });
  //     this.handelFilter()
  // }

  // }

  searchEnter (val) {
    if (val !== '') {
      let query1 = val
      chipset.push(val)
      this.setState({
        chips: chipset,
        Loader: true
      })
      this.handelFilter()
    }
  }

  search () {}

  removeChip (index) {

    this.refs.search.value = ''
    chipset.splice(index, 1)
    this.setState({
      chips: chipset
    })
    this.props.filters(chipset)

  }

  handelFilter () {
    this.props.filters(chipset)
  }

  selectOptions () {

  }

  handleRefundButton (id, amnt) {
    this.props.handleRefundButton(id, amnt, this.props.headers)
  }

  render () {

    if (this.props.Transaction !== '' && this.props.Transaction !== null && this.props.Transaction !== []) {
      noData = false
    } else {
      noData = true
    }

    return (
      <div className="page">
        <Head>
          <title>Transactions</title>
          <link rel='stylesheet' href='/static/css/customScroll.css'/>
          <link rel='stylesheet' href='/static/css/base.css'/>
          <script src="/static/js/main.js"/>
        </Head>
        <div className="content-wrapper full_tag">

          <section className="content">

            <h1 className="main_heading_crm">Transactions</h1>

            <section className="search_top">

              <div className="md-grid">

                <input placeholder="search....By (Order Id,User Email,User Number)" className="md-cell--5 search"
                       ref="search" type="text" id="txtSearch" onKeyPress={this._handleSearchChange}/>

                <Button id="btnSearch" className="md-cell--1" style={{margin: '0 0 0 42px'}} raised primary
                        type="submit" label="Search" onClick={() => {this.searchEnter(this.refs.search.value)}}/>

                <div className="md-cell--5 chip-list adjust_chip">
                  {
                    this.state.chips.map((chip, i) => (
                        <Chip
                            key={i}
                            label={chip}
                            avatar={<Avatar random>{chip[0]}</Avatar>}
                            removable
                            onClick={() => {this.removeChip(i)}}
                        />
                    ))
                  }
                </div>

              </div>
            </section>
            <div className="shadow ">
              {(!this.props.isFetching) ? <span></span> :
                <div className="loader"><Loader>Please Wait it will take few seconds to process the data</Loader >
                </div>}
              <DataTable plain>
                <TableHeader >
                  <TableRow>
                    <TableColumn>Order Id</TableColumn>
                    <TableColumn>Merchant Id</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Status Id</TableColumn>
                    <TableColumn>Amount Refunded</TableColumn>
                    <TableColumn>Refund</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    this.props.Transaction.map((trans, i) => (
                      <TableRow key={i}>
                        <TableColumn>{trans.order_id}</TableColumn>
                        <TableColumn>{trans.merchant_id}</TableColumn>
                        <TableColumn>{trans.amount}</TableColumn>
                        <TableColumn>{trans.status}</TableColumn>
                        <TableColumn>{trans.status_id}</TableColumn>
                        <TableColumn>{trans.amount_refunded}</TableColumn>
                        <TableColumn>{(trans.status_id === 21 && trans.refunded === 'False') &&
                        <Button onClick={() => {this.handleRefundButton(trans.order_id, trans.amount)}} primary raised
                                label="Refund"/>}</TableColumn>

                      </TableRow>))
                  }

                </TableBody>
                {noData && <div className="NotFound"><p><span className="wdata">No data Found</span><span
                  className="smile">:(</span></p></div>}

              </DataTable>

            </div>

          </section>

          {scrollup}

        </div>
        <style jsx>{`
        .search_top {
          margin-left:15px;
        }
        `}</style>
      </div>
    )
  }
}

export  default  TransactionList
