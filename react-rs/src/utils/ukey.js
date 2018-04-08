import { strToHexCharCode } from './utils'
const translateFunc = (msg, bool, data) => ({
  data,
  msg,
  isSuccess: bool // true
})

export class Ukey {
  // subjectDN = 'OU=Individual-1, OU=Rongcapital, O=CFCA OCA1, C=CN'
  subjectDN = 'OU=Individual-1, OU=Rongcapital, O=CFCA OCA1, C=CN'
  serialNumber = 'SerialNumber'

  constructor() {
    this.isBrowserSupport = true // 是否支持Ukey
    this.init()
  }

  /**
   * 创建Ukey能够识别的标签
   */
  init() {
    this.CryptoAgent = document.getElementById('CryptoAgent')
    if (this.CryptoAgent) {
      return this.CryptoAgent
    }
    let ua = navigator.userAgent.toLowerCase()
    this.isSafari = ua.match(/version\/([\d.]+)/)
    if (this.isSafari) {
      let div = document.createElement('div') // 创建div
      div.style.height = 0
      div.style.width = 0
      document.getElementsByTagName('body')[0].appendChild(div) // 追加到Body
      div.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npP11CertEnroll.MAC.Rongcapital-plugin\" style=\"height: 0px; width: 0px\">" // eslint-disable-line
    } else {
      if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) { // eslint-disable-line
        let div = document.createElement('div') // 创建div
        div.style.height = 0
        div.style.width = 0
        document.getElementsByTagName('body')[0].appendChild(div) // 追加到Body
        if (window.navigator.cpuClass === 'x86') {
          div.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.CertEnrollment.Rongcapital.cab\" classid=\"clsid:F36DC740-1538-4ECA-AAE3-E2893B5D3BD0\" ></object>" // eslint-disable-line
        } else {
          div.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.CertEnrollment.Rongcapital.cab\" classid=\"clsid:12DE4A34-74F5-4BA8-9E04-F65645207352\" ></object>" // eslint-disable-line
        }
      } else {
        this.isBrowserSupport = false // 是否支持 浏览器
      }
    }
    this.CryptoAgent = document.getElementById('CryptoAgent')
    return this
  }

  /**
   * 获取csp
   */
  getCSPInfo() {
    this.init()
    let CryptoAgent = this.CryptoAgent
    try {
      let cspNames = CryptoAgent.CFCA_GetCSPInfo()
      if (!cspNames) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
        return translateFunc(errorDesc, false)
      }
      return translateFunc(undefined, true, cspNames)
    } catch (e) {
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      return translateFunc(lastErrorDesc, false)
    }
  }

  /**
   * 是否插入了Ukey
   * @return {[type]} [description]
   */
  checkIsInsertUkey() {
    let data = this.generateP10()
    return data.isSuccess
  }

  /**
   * 获取CSP名称
   * @return {[type]} [description]
   */
  getCspName() {
    this.init()
    this.cspName = 'CFCA FOR UKEY CSP v1.1.0'
    return translateFunc('成功', true, 'CFCA FOR UKEY CSP v1.1.0')
  }

  /**
   * 生成P10
   */
  generateP10() {
    this.init()
    this.getCspName()
    let CryptoAgent = this.CryptoAgent
    let cspName = this.cspName

    let keyAlgorithm = 'RSA', // 加密算法
      keyLength = '2048', // 密码长度
      strSubjectDN = 'CN=certRequisition,O=CFCA TEST CA,C=CN' // 证书主题

    try {
      /* 设定 CSP 的名称及密钥长度信息 */
      let res1 = CryptoAgent.CFCA_SetCSPInfo(keyLength, cspName) //
      if (!res1) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc() // 获取错误信息
        return translateFunc(errorDesc, false)
      }

      /* 设置算法 */
      let res2 = CryptoAgent.CFCA_SetKeyAlgorithm(keyAlgorithm) // 生成算法
      if (!res2) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc() // 获取错误信息
        return translateFunc(errorDesc, false)
      }

      /* 生成P10 */
      let pkcs10Requisition = CryptoAgent.CFCA_PKCS10CertRequisition(strSubjectDN, 1, 0) // RSA单证 sha1
      if (!pkcs10Requisition) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
        return translateFunc(errorDesc, false)
      }
      /* 获取当前密匙, 对应的容器名称 */
      let contianerName = CryptoAgent.CFCA_GetContainer()
      this.contianerName = contianerName
      if (!contianerName) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
        return translateFunc(errorDesc, false)
      }
      pkcs10Requisition = strToHexCharCode(pkcs10Requisition.replace(/\s/g, ''))
      return translateFunc('成功', true, pkcs10Requisition)
    } catch (e) {
      console.log(e)
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      return translateFunc(lastErrorDesc, false)
    }
  }


  /**
   * 选择证书
   */
  selectSignCert() { // 选择证书
    this.init()
    let CryptoAgent = this.CryptoAgent
    console.log('CryptoAgent', CryptoAgent)
    try {
      // let subjectDN = this.isSafari ? '' : this.subjectDN
      let bstrCertDN = CryptoAgent.CFCA_SelectCertificate(this.subjectDN, '', '', '') // 选择证书
      if ('' !== bstrCertDN && 'undefined' !== bstrCertDN.value && bstrCertDN !== 0) { // eslint-disable-line
        return translateFunc('成功', true, bstrCertDN)
      }
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      return translateFunc(lastErrorDesc, false)
    } catch (e) {
      try {
        let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
        return translateFunc(lastErrorDesc, false)
      } catch (error) {
        return translateFunc(false, false) //第一个false代表msg表示是否安装了驱动；第二个false是是否有证书
        //alert('ukey初始化错误, 请检查ukey驱动是否正确安装')
      }
    }
  }


  /**
   * 检车Ukey中是否存在证书
   * @return {[type]} [description]
   */
  checkUkeyIsHaveCert() {
    return this.selectSignCert().isSuccess
  }


  /**
   * 获取证书信息(序列号)
   */
  getSelectCertInfo(info = this.serialNumber) {
    this.init()
    let CryptoAgent = this.CryptoAgent
    try {
      let bstrCertInfo = CryptoAgent.CFCA_GetSelectCertInfo(info) // 获取证书信息
      if (bstrCertInfo.value !== 'undefined' && bstrCertInfo) {
        return translateFunc('成功', true, bstrCertInfo)
      }
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc() // 获取整数信息失败
      return translateFunc(lastErrorDesc, false)
    } catch (e) {
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      return translateFunc(lastErrorDesc, false)
    }
  }

  /**
   * 根据原文获取密文
   */
  getCiphertextByOriginal(original) {
    this.init()
    this.selectSignCert()
    let digestAlg = 'SHA-1' // 加密方式
    let CryptoAgent = this.CryptoAgent
    try {
      let Signature = CryptoAgent.CFCA_SignMsgPKCS7(original, digestAlg, true) // 调用加密方法
      if (Signature.value !== 'undefined') {
        // return translateFunc('成功', true, strToHexCharCode(Signature))
        return translateFunc('成功', true, Signature)
      }
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      return translateFunc(lastErrorDesc, false)
    } catch (e) {
      let lastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      return translateFunc(lastErrorDesc, false)
    }
  }
   /**
   * 安装证书
   */
  InstallCert(signCertVal, certType = 1) {
    this.init()
    let CryptoAgent = this.CryptoAgent
    try {
      let csp = this.getCspName() // 获取csp
      let cspName = csp.data
      if (cspName === '') {
        return translateFunc('CSP名称为空', false)
      }
      let keyAlgorithm = 'RSA' //加密算法
      if (keyAlgorithm === '') {
        return translateFunc('密钥生成算法为空', false)
      }

      let keyLength = '2048' //秘钥长度

      let hResult = CryptoAgent.CFCA_SetKeyAlgorithm(keyAlgorithm)
      if (!hResult) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
        return translateFunc(errorDesc, false)
      }
      let bResult = CryptoAgent.CFCA_SetCSPInfo(keyLength, cspName)
      if (!bResult) {
        let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
        return translateFunc(errorDesc, false)
      }
      let signCert = signCertVal
      if (signCert === '') {
        return translateFunc('签名公钥证书内容为空', false)
      }
      let containerName = this.contianerName
      if (containerName === '') {
        return translateFunc('密钥容器名称内容为空', false)
      }

      if (certType === 1) {
        // sign cert
        let _bResult = CryptoAgent.CFCA_ImportSignCert(1, signCert, containerName)
        if (!_bResult) {
          let errorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
          alert(errorDesc)
          return false
        }
        // return translateFunc('成功', true)
        // alert('true', '单证书安装成功')
        return true
      }
    } catch (e) {
      let LastErrorDesc = CryptoAgent.CFCA_GetLastErrorDesc()
      LastErrorDesc
      if (certType === 1) {
        return translateFunc('单证书安装失败', false)
      }
      alert('双证书安装失败')
      return translateFunc('双证书安装失败', false)
    }
  }
}

export default Ukey