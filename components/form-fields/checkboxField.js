/**
 * Created by consultadd on 8/3/17.
 */
import React, { PureComponent } from 'react'
import Switch from 'react-md/lib/SelectionControls/Switch'

export default class CheckboxComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {checked: false}
  }

  _handleChange = (checked) => {
    this.setState({checked})
  }

  render () {
    const {checked} = this.state

    return (
      <div>
        <Switch id="switch3" name="controlledSwitch" label={props.label}   {...props} checked={checked}
                onChange={this._handleChange}/>
      </div>
    )
  }
}