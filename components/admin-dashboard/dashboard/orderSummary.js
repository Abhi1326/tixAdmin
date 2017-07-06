/**
 * Created by consultadd on 9/2/17.
 */

import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CountTo from 'react-count-to';
import PropTypes from 'prop-types'



export class OrderSummary extends React.Component {

  constructor (props) {
    super(props)

  }

  render () {

    return (
      <div className="main">

        <h1 className="main_heading">Movie Order Summary(Till: {this.props.order.till_date})</h1>
        <section className="md-grid">

          <Card className="md-cell--12-phone md-cell--6-tablet custom_card custom_card2">
            <CardTitle
              className='card_title'
              title="Total order"

            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override "> <CountTo digits={2} to={this.props.order.total_orders} speed={1234}></CountTo> </h3>
            </CardText>
          </Card>

          <Card className="md-cell--12-phone md-cell--6-tablet custom_card custom_card4">
            <CardTitle
              className='card_title'
              title="Total tickets"

            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override">  <CountTo digits={2} to={this.props.order.total_tickets} speed={1234}></CountTo></h3>
            </CardText>
          </Card>

          <Card className="md-cell--12-phone md-cell--6-tablet custom_card custom_card3">
            <CardTitle
              className='card_title'
              title="Total Ticket Amount"

            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"> <CountTo digits={2} to={this.props.order.total_ticket_amount} speed={1234}></CountTo></h3>
            </CardText>
          </Card>

          <Card className="md-cell--12-phone md-cell--6-tablet custom_card custom_card1">
            <CardTitle
              className='card_title'
              title="Total Commission"
            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"> <CountTo digits={2} to={this.props.order.commission_share} speed={1234}></CountTo> </h3>

            </CardText>
          </Card>

        </section>

        <style jsx>{`

                            `}
        </style>
      </div>
    )
  }
}

OrderSummary.propTypes = {
    order:PropTypes.object,

};

export  default  OrderSummary