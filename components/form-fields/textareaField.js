/**
 * Created by consultadd on 8/3/17.
 */
import React from 'react'
import TextField from 'react-md/lib/TextFields'

const TextAreaComponent = (props) => {

  return (

    <TextField
      id="floatingMultiline"
      lineDirection="right"
      rows={4}
      className="md-cell--2 md-cell--bottom"
      style={{
        height: '120px',
        width: '300px',
        backgroundColor: 'rgba(132, 136, 138, 0.12)'
      }}
      label={props.label}
      {...props}
    />

  )

}

export default TextAreaComponent