import React, { PureComponent, PropTypes as PT } from 'react'
import 'whatwg-fetch'
import Upload from './Upload'
import PopUp from '../PopUp'
import CuttingBoard from '../CuttingBoard'
import CardImage from './helper/CardImage'
import Image from '../Image'

class UploadButton extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      images: [],
      paramAddToField: {},
      isView: false
    }
  }
  _uploadRender() {
    const { options = {}, type } = this.props
    const { paramAddToField } = this.state
    const { label, ...rest } = options
    let param = Object.assign({}, paramAddToField, options.paramAddToField)
    const content = type === 'button' ? (
      <div className="rob-upload rob-col-lg-24" type="chooseBtn">
        <div className="rob-upload-btn">
          {label}
        </div>
      </div>
    ) : (
      <div className="rob-upload" type="chooseBtn">
        <div className="rob-upload-card">
          <div className="rob-upload-card-type qb-icon-rob-icon-plus">
            <i className="qb-icon-add" />
          </div>
          <label>{label}</label>
        </div>
      </div>
    )
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
        {content}
      </Upload>
    )
  }
  render() {
    const { images, isView } = this.state
    return (
      <div>
        {this._uploadRender()}
        {!isView ? images.map((item, i) =>
          (<CardImage
            handleView={this.handleView}
            handleRemoveIamge={this.handleRemoveIamge}
            input={this.uplaod_file_input}
            src={item}
            alt=""
            key={i}
          />)) : <Image images={images} handleClose={() => this.setState({ isView: false })} />}
      </div>
    )
  }
  handleView = (src) => () => {
    src
    this.setState({ isView: true })
  }
  handleUploadSuccess = (res) => {
    console.log(res, 'success')
  }
  handleUploadError = (error) => {
    console.log('上传出错...', error)
  }
  handleRemoveIamge = (src) => (e) => {
    e.stopPropagation()
    this.state.images.splice(this.state.images.indexOf(src), 1)
    this.setState({
      images: [...this.state.images]
    })
  }
  isIE() { // ie?
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true
    }
    return false
  }
  getFileUrl(file) {
    let url
    let agent = navigator.userAgent
    if (this.isIE()) {
      return file.value
    }
    if (agent.indexOf('MSIE') >= 1) {
      url = file.value
    } else if (agent.indexOf('Firefox') > 0) {
      url = window.URL.createObjectURL(file.files.item(0))
    } else if (agent.indexOf('Chrome') > 0) {
      url = window.URL.createObjectURL(file.files.item(0))
    }
    return url
  }

  getFileName(file) {
    const url = this.getFileUrl(file)
    return url.substr(url.lastIndexOf('/') + 1)
  }
  handleReloadImage = () => {
    this.popUp.removeContainer()
    this.upload.commonChooseFile()
  }
  handleCutting = async () => {
    const baseImage = this.cuttingBoard.handleGetCuttingBase64()
    const { options } = this.props

    if (!window.FileReader) {
      this.popUp.removeContainer()
      this.upload.publicIEUpload(baseImage)
      return
    }

    const params = JSON.stringify(Object.assign({}, options.paramAddToField, {
      [options.fileFieldName]: baseImage
    }))

    const promise = fetch(options.baseUrl, {
      method: 'post',
      body: params
    })
    return promise.then((res) => {
      this.baseImage = baseImage
      this.popUp.removeContainer()
      this.setState({
        images: [...this.state.images, baseImage]
      })
      return res
    }, (error) => {
      console.log(error)
    })
  }

  handleChooseFile = (files) => {
    if (!files.length) return
    this.uplaod_file_input = this.upload.ajax_upload_file_input || this.upload.ajax_upload_hidden_input_0
    this.filesUrl = this.getFileUrl(this.uplaod_file_input)
    this.fileName = this.getFileName(this.uplaod_file_input)
    if (!window.FileReader) {
      // return alert('您的浏览器不支持裁剪功能')
    }
    if (!this.props.options.isCutting || this.props.options.multiple) {
      return
    }
    const props = {
      width: '200',
      height: '300',
      imgUrl: this.filesUrl
    }
    const popUp = this.popUp = new PopUp(<CuttingBoard {...props} ref={r => this.cuttingBoard = r} file={this.uplaod_file_input} />, { handleCutting: this.handleCutting, handleReloadImage: this.handleReloadImage }) // eslint-disable-line
    popUp.renderComponent()
  }
}


UploadButton.propTypes = {
  options: PT.shape({
    /* basics*/
    baseUrl: PT.string.isRequired, //  服务器地址
    label: PT.strign,
    param: PT.oneOfType([PT.object, PT.func]), //  作为get参数配置在域名之后
    dataType: PT.string, //  回应的格式
    chooseAndUpload: PT.bool, //  是否在用户选择了文件之后立刻上传,如果为true则只需在children传入ref="chooseAndUpload"的DOM就可触发。默认false
    paramAddToField: PT.oneOfType([PT.object, PT.func]), //  添加到formData上的参数键值对。func时取返回值。
    wrapperDisplay: PT.string, //  包裹chooseBtn或uploadBtn的div的display默认'inline-block'
    timeout: PT.number, //  请求的超时时间，暂不兼容IE9-，超时调用uploadError,返回{type:'TIMEOUTERROR',message:'timeout'}。默认为0没有超时限制
    accept: PT.string, //  限制选择文件的类型（后缀）
    multiple: PT.bool, //  是否允许同时选择多文件）不支持IE9-
    numberLimit: PT.oneOfType([PT.number, PT.func]), //  多文件上传时限制用户选择的数量（用户仍可以选择，但是会在选择后进行过滤）
    fileFieldName: PT.oneOfType([PT.string, PT.func]), //  文件添加到formData时，默认用file.name作为key。传入string会直接使用此string作为key，若为func则取返回值，func的参数为对应的file对象
    withCredentials: PT.bool, //  与 xhr.withCredentials 一致。
    requestHeaders: PT.object, //  requestHeaders
    /* specials*/
    tag: PT.string, //  IE上传需要多个form组，如需在一个页面引入多个，用tag区分form组。
    userAgent: PT.string,
    disabledIEChoose: PT.oneOfType([PT.bool, PT.func]), //  IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
    _withoutFileUpload: PT.bool, //  不带文件上传(不构造FormData对象)，为了给秒传功能使用，不影响IE
    filesToUpload: PT.arrayOf(PT.object), //  如有要立即上传的文件(File对象),调用此方法上传。调用后会接着触发beforeUpload方法。
    textBeforeFiles: PT.bool,
    /* funcs*/
    beforeChoose: PT.func,
    chooseFile: PT.func,
    beforeUpload: PT.func,
    doUpload: PT.func,
    uploading: PT.func,
    uploadSuccess: PT.func,
    uploadError: PT.func,
    uploadFail: PT.func,
    isCutting: PT.bool, // 是否需要裁剪
    onabort: PT.func //  在你主动取消一个xhr后触发。
  }).isRequired,
  type: PT.string
}
UploadButton.defaultProps = {
  options: {},
  type: ''
}
export default UploadButton
