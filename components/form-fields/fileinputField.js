/**
 * Created by consultadd on 8/3/17.
 */
import React, { PureComponent } from 'react'
import FileInput from 'react-md/lib/FileInputs'
import Snackbar from 'react-md/lib/Snackbars'

export default class FileInputComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {toasts: []}
  }

  _dismiss = () => {
    const toasts = this.state.toasts.slice()
    toasts.shift()

    this.setState({toasts})
  }

  _handleFileSelect = (file) => {
    const toasts = this.state.toasts.slice()

    if (!file) {
      toasts.push({text: 'You did not select new file.'})
    } else {
      toasts.push({text: `${file.name} has been selected.`})
    }

    this.setState({toasts})
  }

  render () {
    const {toasts} = this.state

    return (
      <div className="md-grid file-input-grid">
        <FileInput
          id="imageInput2"
          onChange={this._handleFileSelect}
          accept="image/*"
          secondary
          flat
          iconBefore
          label={props.label}
          {...props}
        />
        <Snackbar toasts={toasts} onDismiss={this._dismiss}/>
      </div>
    )
  }
}