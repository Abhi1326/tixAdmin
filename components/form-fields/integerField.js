import React from 'react'
import TextField from 'react-md/lib/TextFields'

const IntegerComponent = (props) => {

  return (

    <TextField
      type="number"
      min={0}
      label={props.label}
      {...props}
      style={{width: '150%'}}
    />

  )

}

export default IntegerComponent