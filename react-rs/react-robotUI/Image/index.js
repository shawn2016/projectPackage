import React, { PureComponent, PropTypes as PT } from 'react'
import PopUp from '../PopUp'

export default class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.thumbnailWidth = 56 // 缩略图的大小
    this.rotateLimit = 0
    this.state = {
      image: props.images[0],
      imageContainerWidth: this.thumbnailWidth * props.images.length,
      marginLeft: 0
    }
  }
  /**
   * 选中图片
   */
  handleSelectImage = (index) => () => {
    this.currentIndex = index
    this.setState({ image: this.props.images[index] })
    const maxHowMuch = this._handleCalcMaxHowMuch() - 1
    this.rotateLimit = 0
    this._handleChangeRotate(this.rotateLimit)
    if (index % maxHowMuch === 0) {
      // this.handleNextPage() // 功能暂时不启用
    }

    if (index % maxHowMuch === 1) {
      // this.handlePrevPage()
    }
  }
  /**
   * 计算可视区域放了多少个
   */
  _handleCalcMaxHowMuch = () => {
    const imageContainerParentWidth = this.imageContainerParent.offsetWidth
    return Math.floor(imageContainerParentWidth / this.thumbnailWidth)
  }

  /**
   * 上一组
   */
  handlePrevPage = () => {
    const maxHowMuch = this._handleCalcMaxHowMuch()
    let { marginLeft } = this.state
    marginLeft += (maxHowMuch * this.thumbnailWidth)

    if (marginLeft >= 0) {
      marginLeft = 0
    }
    this.setState({
      marginLeft
    })
    console.log(marginLeft)
  }
  /**
   * 下一组
   */
  handleNextPage = () => {
    const maxHowMuch = this._handleCalcMaxHowMuch()
    let { imageContainerWidth, marginLeft } = this.state
    const groupImageContainerWidth = maxHowMuch * this.thumbnailWidth
    const maxGroup = Math.ceil(imageContainerWidth / groupImageContainerWidth)
    const maxMarginLeft = (maxGroup - 1) * groupImageContainerWidth * -1
    marginLeft -= (maxHowMuch * this.thumbnailWidth)
    if (marginLeft <= maxMarginLeft) {
      marginLeft = maxMarginLeft
    }
    this.setState({
      marginLeft
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images !== this.props.images) {
      this.setState({
        image: nextProps.images[0],
        imageContainerWidth: nextProps.images.length * this.thumbnailWidth
      })
    }
  }

  handleRotate = (rotate) => () => {
    this.rotateLimit += rotate
    this._handleChangeRotate(this.rotateLimit)
  }

  _handleChangeRotate = (rotate) => {
    this.viewImage.style.msTransform = `rotate(${rotate}deg)`
    this.viewImage.style.transform = `rotate(${rotate}deg)`
  }

  handlePreview = () => {
    this.popUp = new PopUp(<Image images={this.props.images} />)
    this.popUp.renderComponent()
  }

  render() {
    return this._packRender('viewImage')
  }

  _packRender(prop) {
    const { image } = this.state
    return (
      <div className="rob-images-box">
        <div className="rob-images-setting">
          <ul className="clearfix">
            <li className="rob-images-setting-item" onClick={this.props.handleClose}>
              <span>
                <a>
                  <i className="qb-icon-upload" />
                  收起
                </a>
              </span>
            </li>
            <li className="rob-images-setting-item" onClick={this.handlePreview}>
              <span>
                <a>
                  <i className="qb-icon-details1" />
                  查看大图
                </a>
              </span>
            </li>
            <li className="rob-images-setting-item" onClick={this.handleRotate(-90)}>
              <span>
                <a>
                  <i className="qb-icon-home" />
                  向左旋转
                </a>
              </span>
            </li>
            <li className="rob-images-setting-item" onClick={this.handleRotate(90)}>
              <span>
                <a>
                  <i className="qb-icon-home" />
                  向右旋转
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className="rob-images-view leftcursor">
          <img src={image} alt="" ref={r => this[prop] = r} />
        </div>
        {this.handleRenderGroup()}
      </div>
    )
  }
  handleRenderGroup() {
    const { images } = this.props
    const { image } = this.state
    if (images.length < 2) {
      return null
    }
    return (
      <div className="rob-images-choose">
        <div className="rob-images-prev" onClick={this.handlePrevPage}>
          <a>
            <i className="qb-icon-angle-down" />
          </a>
        </div>
        <div className="rob-images-next" onClick={this.handleNextPage}>
          <a>
            <i className="qb-icon-angle-down" />
          </a>
        </div>
        <div className="rob-images-mini-list" ref={r => this.imageContainerParent = r}>
          <ul className="clearfix" style={{ width: this.state.imageContainerWidth, marginLeft: this.state.marginLeft }}>
            {images.map((item, index) => (
              <li className={(item === image) && 'current'} key={index} onClick={this.handleSelectImage(index)}>
                <a>
                  <img src={item} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

}
Image.propTypes = {
  images: PT.array,
  handleClose: PT.func
}
Image.defaultProps = {
  images: [],
  handleClose: () => {}
}