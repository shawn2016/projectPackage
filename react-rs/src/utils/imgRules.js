  // 校验图片规则
  const imgRules = (file) => {
    let fileSize = file.size
    if (!(/(?:jpg|png|jpeg)$/i.test(file.name))) {
      alert('只允许上传jpg|png|jpeg格式的图片')
      return false
    }
    if (fileSize > 5 * 1024 * 1024) {
      alert('图片大小不超过5MB')
      return false
    }
    return true
  }
  export default imgRules