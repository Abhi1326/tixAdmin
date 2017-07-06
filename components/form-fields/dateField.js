/**
 * Created by consultadd on 8/3/17.
 */
import React from 'react'
import Datetime from 'react-datetime/DateTime'
require('react-datetime')

const DateComponent = (props) => {

  return (

    <Datetime value={props.value}  {...props} utc={true} locale='en-In' defaultValue={new Date()} timeFormat={true}
              style={{width: '150%', backgroundColor: 'aliceblue'}}/>
  )
}

export default DateComponent