/**
 * Created by consultadd on 10/3/17.
 */
import React from 'react'
import Button from 'react-md/lib/Buttons/Button'

const ButtonComponent = (props) => {

  return (

    <Button raised label="Select All" value={props.label}
            {...props} />
  )

}

export default ButtonComponent