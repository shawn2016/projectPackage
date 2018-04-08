/* eslint-disable */
const config = {
  // dev: 'http://172.17.80.138:7046',
  dev:'https://www.easy-mock.com/mock/5a98ec9c7a528e391791c3be',
  mocks: 'http://10.200.16.11:7046/',
  online: 'https://wwa.rswallet.com',
  //test\: 'http://test-api.rswallet.com:7046',
  test: 'http://cswwa.rswallet.com',
  test2: 'http://test2wwa.rswallet.com',
  /*
   * 文件上传地址&参数
   */
  file: (path) => {
    let _environment = location.host.split('.')[0]
    let Url = path || '/generic/upload/singleFile'
    let file = ''
    if (_environment === 'business') {
      file = config.online + Url
    } else if (_environment === 'cswallet') {
      file = config.test + Url
    } else if (_environment === 'test2business') {
      file = config.test2 + Url
    } else {
      file = config.dev + Url
    }
    return file
  },
  fileParam: {
    deviceType: 'PC',
    sign: '6fb5183b9317fd3df556a9bb29422ebf',
    token: '',
    version: '1.0.0',
    body: {}
  },
  /*
   * download excel文件
   */
  downloadExcel: (type) => {
    let _environment = location.host.split('.')[0]
    let tempExcel = ''
    if (type === 'batch') {
      if (_environment === 'business') {
        tempExcel = 'https://pic.rswallet.com/mmmfile/5a5c6d86e4b059be0695e9d4/批量经办导入模板.xlsx'
      } else if (_environment === 'cswallet') {
        tempExcel = 'http://172.17.80.139:8899/mmmfile/5a5c9a3062aaba24184abb9c/批量经办导入模板.xlsx'
      } else if (_environment === 'test2business') {
        tempExcel = 'http://172.17.80.139:8899/mmmfile/5a5c686562aaba22ac26db09/批量经办导入模板.xlsx'
      } else {
        tempExcel = 'http://172.17.80.139:8899/mmmfile/5a5c686562aaba22ac26db09/批量经办导入模板.xlsx'
      }
    } else {
      if (_environment === 'business') {
        tempExcel = 'https://pic.rswallet.com/mmmfile/5a5c6da4e4b07b638904cfc1/代发经办导入模板.xlsx'
      } else if (_environment === 'cswallet') {
        tempExcel = 'http://172.17.80.139:8899/mmmfile/5a5c9a6b62aaba24184abb9e/代发经办导入模板.xlsx'
      } else if (_environment === 'test2business') {
        tempExcel = 'http://172.17.80.139:8899/mmmfile/5a5c68a162aaba22ac26db0b/代发经办导入模板.xlsx'
      } else {
        tempExcel = 'http://172.17.80.139:8899/mmmfile/5a5c68a162aaba22ac26db0b/代发经办导入模板.xlsx'
      }
    }
    return tempExcel
  }
}
export default config