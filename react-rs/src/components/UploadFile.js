import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from 'rc-upload'
export default class UploadFile extends Component {
  static propTypes = {
    uploadConfig: PropTypes.object,
    finished: PropTypes.bool
  }
  static defaultProps = {
    uploadConfig: {},
    finished: false
  }
  constructor(prop) {
    super(prop)
    this.state = {
    }
  }
  componentWillReceiveProps() {
    // const { finished } = nextProps
    // this.setState({
    //   finished
    // })
  }
  render() {
    return (
      <div>
        {
          !this.props.finished
            ? <Upload {...this.props.uploadConfig}>
              <div className="rob-upload-card ">
                <i className="qb-icon-delete2 rob-upload-close" />
                <div className="rob-upload-card-type qb-icon-rob-icon-plus">
                  <i className="qb-icon-add" />
                  <img src="" className="fileimg" alt="" />
                </div>
              </div>
            </Upload> : null
        }
      </div>
    )
  }
}