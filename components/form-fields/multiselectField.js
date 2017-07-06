/**
 * Created by consultadd on 9/3/17.
 */

import React from 'react'
import Select from 'react-select'

const MultiSelectFieldComponent = (props) => {

  return (
    <div className="md-grid">
      <div className="md-cell--4" style={{width: '45%', marginLeft: '-14px'}}>
        <Select
          multi={true}
          placeholder="Select your User"
          valueKey='value'
          labelKey='label'
          {...props}

        />
      </div>
    </div>

  )

}

export default MultiSelectFieldComponent