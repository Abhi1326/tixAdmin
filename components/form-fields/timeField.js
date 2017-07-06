/**
 * Created by consultadd on 8/3/17.
 */
import React from 'react'
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer'

const todayAt1522 = new Date()
todayAt1522.setHours(15)
todayAt1522.setMinutes(22)

const TimeComponent = (props) => {

  return (

    <TimePicker
      id="locale3"
      className="md-cell-2"
      placeholder="selectDate"
      style={{float: 'left', width: '200%'}}
      value={props.value}
      {...props}
    />

  )

}

export default TimeComponent