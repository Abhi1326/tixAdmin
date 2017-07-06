/**
 * Created by consultadd on 8/3/17.
 */
import React from 'react'
import SelectField from 'react-md/lib/SelectFields'

const SelectFieldComponent = (props) => {

  return (


    <SelectField
      id="selectButtonStates"
      placeholder="State"
      itemLabel="label"
      itemValue="value"
      position={SelectField.Positions.BELOW}
      menuItems={props.menuItems}
      style={{
        backgroundColor: 'rgba(215, 221, 223, 0.39)',
        marginLeft: '-5px',
        width: '300px'
      }}
      value={props.value}
      {...props}
    />

  )

}

export default SelectFieldComponent