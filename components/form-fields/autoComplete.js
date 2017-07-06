/**
 * Created by consultadd on 8/3/17.
 */

import React from 'react'
import Autocomplete from 'react-md/lib/Autocompletes'

const AutoComponent = (props) => {

  return (

    <Autocomplete
      id="search"
      label={props.label}
      data={props.data}
      value={props.value}
      style={{
        width: '300px',
        marginTop: '-22px'
      }}
      dataLabel={props.dataLabel}
      {...props}
    />

  )

}

export default AutoComponent