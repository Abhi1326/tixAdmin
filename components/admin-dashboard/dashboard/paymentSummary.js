/**
 * Created by consultadd on 8/2/17.
 */
import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CountTo from 'react-count-to';
import PropTypes from 'prop-types'


export class PaymentSummary extends React.Component {

  constructor (props) {
    super(props)

  }

  render () {

    return (
      <section className="main">

        <h2 className="main_heading">Tixdo Movie Overview(Till: {this.props.payment.till_date})</h2>
        <div className="md-grid">

          <Card className=" md-cell--12-phone md-cell--6-tablet custom_card custom_card1">
            <CardTitle
              className='card_title'

              title="Collection"
            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"> <CountTo digits={2} to={this.props.payment.collection} speed={1234}></CountTo></h3>



            </CardText>

          </Card>

          <Card className="md-cell--12-phone md-cell--6-tablet custom_card custom_card2">
            <CardTitle
              className='card_title'
              title="Sales"
            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override">  <CountTo digits={2} to={this.props.payment.sales} speed={1234}></CountTo></h3>
            </CardText>
          </Card>

          <Card className="md-cell--12-phone md-cell--6-tablet custom_card custom_card3">
            <CardTitle
              className='card_title'

              title="Income"

            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"><CountTo digits={2} to={this.props.payment.income} speed={1234}></CountTo></h3>
            </CardText>
          </Card>

          <Card className="md-cell--12-phone md-cell--6-tablet  custom_card custom_card4">
            <CardTitle
              className='card_title'

              title="Discount"

            />
            <CardText className="card_value">
              <h3 className="md-display-1 display-override"> <CountTo digits={2} to={this.props.payment.discount} speed={1234}></CountTo></h3>
            </CardText>
          </Card>

        </div>

        <style jsx>{`

                       `}
        </style>

      </section>
    )
  }
}

PaymentSummary.propTypes = {
    payment:PropTypes.object,
};

export  default  PaymentSummary