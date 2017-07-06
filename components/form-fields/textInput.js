import React from 'react'
import TextField from 'react-md/lib/TextFields'

const TextFieldComponent = (props) => {

  return (

    <div className="md-cell--8">
      <TextField
        min="0"
        label={props.label}
        {...props}
        style={{width: '300px'}}
      />
    </div>
  )

}

export default TextFieldComponent