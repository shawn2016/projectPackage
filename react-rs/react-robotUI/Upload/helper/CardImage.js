import React, { PureComponent, PropTypes as PT } from 'react'

class CardImage extends PureComponent {
  componentDidMount() {
    if (!window.FileReader) {
      const { input } = this.props
      const isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null
      input.select()
      input.blur()
      const reallocalpath = document.selection.createRange().text
      if (isIE6) {
        this.image.src = reallocalpath
      } else {
        this.image.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")" // eslint-disable-line
        this.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
      }
    }
  }
  render() {
    const { handleRemoveIamge, src, handleView } = this.props
    return (
      <div className="rob-upload">
        <div className="rob-upload-card" onClick={handleView(src)}>
          <i className="qb-icon-delete2 rob-upload-close" onClick={handleRemoveIamge(src)} />
          <div className="rob-upload-card-type">
            <img src={src} alt="" ref={r => this.image = r} />
          </div>
        </div>
      </div>
    )
  }
}


CardImage.propTypes = {
  handleRemoveIamge: PT.func,
  src: PT.string,
  input: PT.object,
  handleView: PT.func
}
CardImage.defaultProps = {
  handleRemoveIamge: () => {},
  src: '',
  input: {},
  handleView: () => {}
}

export default CardImage