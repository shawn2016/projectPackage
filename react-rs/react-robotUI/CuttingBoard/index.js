import React, { PropTypes as PT } from 'react'
const emptyFunc = () => {}
const maxWidth = 1000
const maxHeight = 700
class CuttingBoar extends React.PureComponent {
  constructor({ width, height }) {
    super()
    this.startX = 0
    this.startY = 0
    this.endX = 0
    this.endY = 0
    this.isParseIn = false
    this.canvasWidth = width
    this.canvasHeight = height
    this.isFileReader = window.FileReader ? true : false // eslint-disable-line
  }

  drawImage(ctx, img, options) {
    ctx.drawImage(img, 0, 0, options.canvasWidth, options.canvasHeight, 0, 0, options.canvasWidth, options.canvasHeight)
  }
  handleMouseMove = (ev) => {
    const { startX, startY, canvas, ctx, endX, endY } = this
    ctx.beginPath()
    ctx.rect(startX, startY, endX, endY)
    let currentX = ev.clientX - canvas.getBoundingClientRect().left
    let currentY = ev.clientY - canvas.getBoundingClientRect().top
    if (ctx.isPointInPath(currentX, currentY)) {
      canvas.style.cursor = 'move'
      this.isParseIn = true
    } else {
      canvas.style.cursor = 'auto'
      this.isParseIn = false
    }
  }
  getOffsetTop(obj) {
    let tmp = obj.offsetTop
    let val = obj.offsetParent
    while (val != null) {
      tmp += val.offsetTop
      val = val.offsetParent
    }
    return tmp
  }
  getOffsetLeft(obj) {
    let tmp = obj.offsetLeft
    let val = obj.offsetParent
    while (val != null) {
      tmp += val.offsetLeft
      val = val.offsetParent
    }
    return tmp
  }
  handleMouseDown = (ev) => {
    const { isParseIn, canvas, drawImage, canvasWidth, canvasHeight, ctx, img } = this
    const { selectAreaColor } = this.props
    if (!isParseIn) {
      canvas.width = canvas.width
      drawImage(ctx, img, {
        canvasWidth,
        canvasHeight
      })
      let startX = ev.clientX - canvas.getBoundingClientRect().left
      let startY = ev.clientY - canvas.getBoundingClientRect().top
      this.startX = startX
      this.startY = startY
      ctx.moveTo(startX, startY)
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
      document.onmousemove = (event) => {
        event = event || window.event // eslint-disable-line
        let { x, y } = this.returnPosition(event)
        let endX = x - canvas.getBoundingClientRect().left - startX
        let endY = y - canvas.getBoundingClientRect().top - startY
        this.endX = endX
        this.endY = endY
        canvas.width = canvas.width
        drawImage(ctx, img, {
          canvasWidth,
          canvasHeight
        })
        ctx.strokeStyle = selectAreaColor
        ctx.globalAlpha = 0.5 // 透明度
        ctx.rect(startX, startY, endX, endY)
        ctx.fillStyle = selectAreaColor
        ctx.fill()
        ctx.stroke()
      }
      return
    }
    let { x: _x, y: _y } = this.returnPosition(ev)
    let moveStartX = _x - canvas.getBoundingClientRect().left
    let moveStartY = _y - canvas.getBoundingClientRect().top
    let newStartX = 0
    let newStartY = 0
    document.onmousemove = (_event) => {
      _event = _event || window._event // eslint-disable-line
      ctx.beginPath()
      canvas.width = canvas.width
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      drawImage(ctx, img, {
        canvasWidth,
        canvasHeight
      })
      let { x: moveX, y: moveY } = this.returnPosition(_event)
      let moveDistanceX = moveX - canvas.getBoundingClientRect().left - moveStartX // 距离
      let moveDistanceY = moveY - canvas.getBoundingClientRect().top - moveStartY
      newStartX = this.startX + moveDistanceX // eslint-disable-line
      newStartY = this.startY + moveDistanceY // eslint-disable-line

      if (newStartY <= 0) newStartY = 0
      if (newStartX <= 0) newStartX = 0

      if (newStartX + this.endX >= canvasWidth) newStartX = canvasWidth - this.endX
      if (newStartY + this.endY >= canvasHeight) newStartY = canvasHeight - this.endY
      ctx.strokeStyle = selectAreaColor
      ctx.globalAlpha = 0.5
      ctx.rect(newStartX, newStartY, this.endX, this.endY)
      ctx.fillStyle = selectAreaColor
      ctx.fill()
    }
    document.onmouseup = () => {
      this.startX = newStartX
      this.startY = newStartY
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  render() {
    return (
      <div>{this.isFileReader ? this._picRender() : this._ieRender()}</div>
    )
  }
  _ieRender() {
    return (
      <img src="" alt="" ref={r => this.img = r} onMouseDown={this.handleImageMoudDown} />
    )
  }
  _picRender() {
    return (
      <canvas
        ref={r => this.canvas = r}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onDoubleClick={this.handleDoubleClick}
      >
        <span>您的浏览器版本, 暂时不支持此功能, 请使用更高浏览器版本查看此页面</span>
      </canvas>
    )
  }
  handleGetCuttingBase64 = () => {
    if (!this.isFileReader) {
      let { left, top } = this.img.getBoundingClientRect()
      let { left: divLeft, top: divTop } = this.div.getBoundingClientRect()
      let distanceX = divLeft - left
      let distanceY = divTop - top
      let selectAreaWidth = this.selectAreaWidth / this.scale
      let selectAreaHeight = this.selectAreaHeight / this.scale
      return {
        x: distanceX / this.scale,
        y: distanceY / this.scale,
        w: selectAreaWidth,
        h: selectAreaHeight
      }
    }
    let _c = document.createElement('canvas')
    if (!this.endX) {
      this.endX = this.img.offsetWidth
    }
    if (!this.endY) {
      this.endY = this.img.offsetHeight
    }
    _c.width = this.endX
    _c.height = this.endY
    _c.style.position = 'absolute'
    _c.style.left = '-10000px'
    _c.style.top = '-10000px'
    document.body.appendChild(_c)
    let _ct = _c.getContext('2d')
    _ct.drawImage(this.img, this.startX, this.startY, this.endX, this.endY, 0, 0, this.endX, this.endY)
    let data = _c.toDataURL('image/jpg')
    return data
  }

  componentDidMount() {
    const { file } = this.props
    if (this.isFileReader) {
      this.ctx = this.canvas.getContext('2d')
      const img = this.img = new Image() // eslint-disable-line
      const that = this
      document.body.appendChild(img)
      img.style.left = '-100000px'
      img.style.right = '-10000px'
      img.style.position = 'absolute'
      img.onload = () => {
        that.canvasWidth = img.offsetWidth
        that.canvasHeight = img.offsetHeight
        that.canvas.width = that.canvasWidth
        that.canvas.height = that.canvasHeight
        that.ctx.drawImage(img, 0, 0, that.canvasWidth, that.canvasHeight, 0, 0, that.canvasWidth, that.canvasHeight)
      }
      const reader = new FileReader()
      reader.addEventListener('load', function () {
        img.src = this.result
        that.canvasWidth = img.width
        that.canvasHeight = img.height
        that.canvas.width = that.canvasWidth
        that.canvas.height = that.canvasHeight
        that.ctx.drawImage(img, 0, 0, that.canvasWidth, that.canvasHeight, 0, 0, that.canvasWidth, that.canvasHeight)
      }, false)
      reader.readAsDataURL(file.files[0])
      return
    }
    // IE
    const isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null
    if (window.FileReader === undefined) { // ie
      file.select()
      file.blur()
      const reallocalpath = document.selection.createRange().text
      if (isIE6) {
        this.img.src = reallocalpath
      } else {
        this.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")" // eslint-disable-line
        this.img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
      }
      this.img.style.cursor = 'default'
      this.img.onload = () => {
        let width = this.img.offsetWidth
        let height = this.img.offsetHeight
        let proportion
        if (width > height && width > maxWidth) {
          width = maxWidth
          this.scale = width / this.img.offsetWidth
          proportion = this.proportion = (this.img.offsetWidth - width) / this.img.offsetWidth // eslint-disable-line
          height -= height * proportion
        }
        if (height > width && height > maxHeight) {
          height = maxHeight
          this.scale = height / this.img.offsetHeight
          proportion = this.proportion = (this.img.offsetHeight - height) / this.img.offsetHeight // eslint-disable-line
          width -= width * proportion
        }
        this.img.style.width = `${width}px`
        this.img.style.height = `${height}px`
        this.img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")" // eslint-disable-line
      }
    }
  }
  handleImageMoudDown = (eve) => {
    eve.preventDefault()
    if (this.div) {
      document.body.removeChild(this.div)
      this.div = null
    }
    let div = this.div = document.createElement('div') // eslint-disable-line
    document.body.appendChild(div)
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop
    this.startX = eve.pageX || eve.clientX + scrollX
    this.startY = eve.pageY || eve.clientY + scrollY
    div.style.zIndex = '100000'
    div.style.backgroundColor = 'rgba(255, 255, 0, .5)'
    div.style.position = 'absolute'
    div.style.left = `${this.startX}px`
    div.style.top = `${this.startY}px`
    div.style.cursor = 'move'
    document.onmousemove = (event) => {
      event = event || window.event // eslint-disable-line
      event.preventDefault()
      let endX = event.pageX || event.clientX + scrollX
      let endY = event.pageY || event.clientY + scrollY
      let distanceX = this.selectAreaWidth = endX - this.startX // eslint-disable-line
      let distanceY = this.selectAreaHeight = endY - this.startY // eslint-disable-line
      div.style.width = `${distanceX}px`
      div.style.height = `${distanceY}px`
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
    div.onmousedown = this.handleDownSelectArea
  }

  handleDownSelectArea = (eve) => {
    eve = eve || window.event // eslint-disable-line
    eve.stopPropagation()
    eve.preventDefault()
    let { x, y } = this.returnPosition(eve)
    let startX = this.div.offsetLeft
    let startY = this.div.offsetTop
    document.onmousemove = (event) => {
      event = event || window.event // eslint-disable-line
      event.preventDefault()
      let { x: moveX, y: moveY } = this.returnPosition(event)
      let distanceX = startX + (moveX - x)
      let distanceY = startY + (moveY - y)

      let { left, top, width, height } = this.img.getBoundingClientRect()
      if (distanceX < left) distanceX = left
      if (distanceY < top) distanceY = top

      if (distanceX + this.selectAreaWidth > left + width) {
        distanceX = left + width - this.selectAreaWidth // eslint-disable-line
      }
      if (distanceY + this.selectAreaHeight > top + height) {
        distanceY = top + height - this.selectAreaHeight // eslint-disable-line
      }
      this.div.style.left = `${distanceX}px`
      this.div.style.top = `${distanceY}px`
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  returnPosition = (eve) => {
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
    let scrollY = document.documentElement.scrollTop || document.body.scrollTop
    return {
      x: eve.pageX || eve.clientX + scrollX,
      y: eve.pageY || eve.clientY + scrollY
    }
  }
  componentWillUnmount() {
    this.isFileReader && document.body.removeChild(this.img)
    this.div && document.body.removeChild(this.div)
  }
}

CuttingBoar.propTypes = {
  width: PT.string, // 宽
  height: PT.string, // 高
  handleSelect: PT.func, // 选中后的方法
  imgUrl: PT.string,
  selectAreaColor: PT.string,
  file: PT.object
}

CuttingBoar.defaultProps = {
  width: 0,
  height: 0,
  handleSelect: emptyFunc,
  imgUrl: '',
  selectAreaColor: 'yellow',
  file: {}
}


export default CuttingBoar
