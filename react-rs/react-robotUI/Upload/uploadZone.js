import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from './Upload'

class UploadZone extends Component {
  constructor(props) {
    super(props)

    this.state = { files: [], imgUrlArray: [] }
  }
  static propTypes={
    options: PropTypes.object
  }
  static defaultProps = {
    multiple: true,
    btnValue: 'Upload Image',
    className: 'upload-button',
    height: '120px',
    width: '100px',
    config: {},
    options: {}
  }

  _uploadRender() {
    const { options = {} } = this.props
    const { paramAddToField } = this.state
    const { label, ...rest } = options
    let param = Object.assign({}, paramAddToField, options.paramAddToField)
    return (
      <Upload
        options={{
          ...rest,
          ...param,
          chooseFile: this.handleChooseFile,
          uploadError: this.handleUploadError,
          uploadSuccess: this.handleUploadSuccess
        }}
        ref={r => this.upload = r}
      >
        <div className="rob-upload" type="chooseBtn">
          <div className="rob-upload-card">
            <div className="rob-upload-card-type qb-icon-rob-icon-plus">
              <i className="qb-icon-add" />
            </div>
            <label>{label}</label>
          </div>
        </div>
      </Upload>
    )
  }
  render() {
    return (
      this._uploadRender()
    )
  }
}


export default UploadZone
