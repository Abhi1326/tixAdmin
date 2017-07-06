/**
 * Created by consultadd on 30/1/17.
 */
import React from 'react'
import Button from 'react-md/lib/Buttons/Button'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import { Router } from '../../../routes'
import cookie from 'react-cookie'
import CountTo from 'react-count-to';
import PropTypes from 'prop-types'



let noData = false
export class MovieOrderList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}

  }

  viewMore () {
    Router.pushRoute('perordertransaction')
  }

  render () {

    let back_date = cookie.load('back_date')
    let current_date = cookie.load('current_date')
    // if (this.props.Summary == 'undefined' || this.props.Summary == {}) {
    //     noData = true;
    // }
    // else {
    //     noData = false;
    // }

    return (
      <div className="main">
        <h2 className="main_heading">Summary(Till: {this.props.Summary.till_date})</h2>
        <section className="md-grid ">

          <Card className=" md-cell--12-phone md-cell--6-tablet custom_card custom_card2">
            <CardTitle
              className='card_title'
              title="Total orders"

            />
            <CardText className='card_text'>

            </CardText>
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"><CountTo digits={2} to={this.props.Summary.total_orders} speed={1234}></CountTo> </h3>
            </CardText>
          </Card>

          <Card className="  md-cell--12-phone md-cell--6-tablet  custom_card custom_card4">
            <CardTitle
              className='card_title'
              title="Total tickets"

            />
            <CardText className='card_text'>

            </CardText>
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"><CountTo digits={2} to={this.props.Summary.total_tickets} speed={1234}></CountTo> </h3>
            </CardText>
          </Card>

          <Card className="  md-cell--12-phone md-cell--6-tablet  custom_card custom_card3">
            <CardTitle
              className='card_title'
              title="Total Ticket Amount"

            />
            <CardText className='card_text'>

            </CardText>
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"><CountTo digits={2} to={this.props.Summary.total_ticket_amount} speed={1234}></CountTo></h3>
            </CardText>
          </Card>

          <Card className="  md-cell--12-phone md-cell--6-tablet  custom_card custom_card1">
            <CardTitle
              className='card_title'
              title="Total Commission"
            />
            <CardText className='card_text'>

            </CardText>
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"> <CountTo digits={2} to={this.props.Summary.commission_share} speed={1234}></CountTo></h3>

            </CardText>
          </Card>

          <br/>
          <div className="order_detail_btn">
            <Button className="btn_disabled" disabled={noData} raised primary type="submit" label="Order Detail Report"
                    onClick={() => {
                      this.viewMore()
                    }}/>
          </div>
        </section>

        <style jsx>{`

                    `}
        </style>
      </div>
    )
  }
}

MovieOrderList.propTypes = {
    Summary:PropTypes.object,
};


export  default  MovieOrderList