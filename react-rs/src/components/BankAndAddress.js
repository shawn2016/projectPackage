/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionFactory, reducerFactory1 } from 'utils/utils'
const handleGetProvince = reducerFactory1('REGISTER_GETPROVINCE', {}) // 获得省
const handleGetCity = reducerFactory1('REGISTER_GETCITY', {}) // 获得市
const handleGetArea = reducerFactory1('REGISTER_GETAREA', {}) // 获得区
const handleGetBank = reducerFactory1('REGISTER_GETBANK', {}) // 获得总行数据
const handleGetSubbranch = reducerFactory1('REGISTER_GETSUBBRANCH', {}) // 获得支行数据
injectReducer(combineReducers({
  handleGetProvince,
  handleGetCity,
  handleGetArea,
  handleGetBank,
  handleGetSubbranch
}), 'registerAddress')
const getProvince = actionFactory('REGISTER_GETPROVINCE', 'POST', '/generic/getRegionList', true) // 省
const getCity = actionFactory('REGISTER_GETCITY', 'POST', '/generic/getRegionList', true) // 市
const getArea = actionFactory('REGISTER_GETAREA', 'POST', '/generic/getRegionList', true) // 区
const getBank = actionFactory('REGISTER_GETBANK', 'POST', '/generic/getBankList', true) // 总行
const getSubbranch = actionFactory('REGISTER_GETSUBBRANCH', 'POST', '/generic/getBankList', true) // 支行
class BankAndAddress extends Component {
  static robotUIName = 'FormInput'
  static propTypes = {
    type: PropTypes.string, /* bank or address or independent 默认bank*/
    required: PropTypes.bool,
    handleSelect: PropTypes.func,
    isTestRule: PropTypes.bool,
    labelClass: PropTypes.string,
    mainClass: PropTypes.string,
    emptyMsg: PropTypes.string,
    getProvince: PropTypes.func,
    getCity: PropTypes.func,
    getArea: PropTypes.func,
    registerAddress: PropTypes.object,
    getBank: PropTypes.func,
    getSubbranch: PropTypes.func,
    /* 以下为定制属性 */
    bankLabel: PropTypes.string,
    addressLabel: PropTypes.string,
    branchBankLabel: PropTypes.string,
    bankEmptyMsg: PropTypes.string,
    addressEmptyMsg: PropTypes.string,
    branchBankEmptyMsg: PropTypes.string,
    handleSelectProvince: PropTypes.func,
    handleSelectCity: PropTypes.func,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string,
    getCityData: PropTypes.object,
    getProvinceData: PropTypes.object,
    getAreaData: PropTypes.object,
    getBankData: PropTypes.object,
    getSubbranchData: PropTypes.object
  }
  static defaultProps = {
    type: 'bank',
    required: false,
    handleSelect: () => { },
    isTestRule: false,
    labelClass: 'rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left',
    mainClass: 'rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24',
    emptyMsg: '该选项不能为空',
    getProvince: () => { },
    getArea: () => { },
    getCity: () => { },
    /* 定制属性 */
    bankLabel: '开户银行',
    addressLabel: '所属地区',
    branchBankLabel: '开户支行',
    bankEmptyMsg: '请选择开户银行',
    addressEmptyMsg: '请选择地址信息',
    branchBankEmptyMsg: "请选择开户支行",
    handleSelectProvince: () => { },
    handleSelectCity: () => { },
    containErrorIcon: true,
    registerAddress: {},
    errorIconName: 'qb-icon-report1',
    getCityData: {},
    getProvinceData: {},
    getAreaData: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      bankList: [],
      filterBankList: [],
      provinceList: [],
      cityList: [],
      regionList: [],
      branchBankList: [],
      filterBranchBankList: [],
      showBankList: false,
      showProvinceList: false,
      showCityList: false,
      showRegionList: false,
      showBranchBankList: false,
      selectedBank: {},
      selectedProvince: {},
      selectedCity: {},
      selectedRegion: {},
      selectedBranchBank: {},
      isShowEmptyMsg: false
    }
  }
  componentWillMount() {
    this._getProvinceList()
    this.props.type === 'bank' ? setTimeout(() => {
      this._getBankList()
    }, 1000) : null    // TODU 不再使用settimeout获取
  }
  componentWillReceiveProps(nextProps) {
    const { getProvinceData = {}, getCityData = {}, getAreaData = {}, getBankData = {}, getSubbranchData = {} } = nextProps,
      { body: CityData = [] } = getCityData,
      { body: provinceData = [] } = getProvinceData,
      { body: areaData = [] } = getAreaData,
      { body: bankData = [] } = getBankData,
      { body: subbranchData = [] } = getSubbranchData
    this.setState({
      cityList: CityData,
      provinceList: provinceData,
      regionList: areaData,
      bankList: bankData,
      filterBankList: bankData,
      branchBankList: subbranchData,
      filterBranchBankList: subbranchData
    })
    if (nextProps.isTestRule) {
      this.getErrStatus() ? (
        this.setState({
          isShowEmptyMsg: true
        })) : (
          this.setState({
            isShowEmptyMsg: false
          })
        )
    }
  }
  render() {
    return (
      <div>
        <div className={this.state.isShowEmptyMsg ? 'rob-input-has-error' : ''}>
          {
            this.props.type === 'independent' ? this._getIndependentDom() : null
          }
        </div>
        {
          /**
           * （总）银行
           */
        }
        <div className={this.state.isShowEmptyMsg && !this.state.selectedBank.bankCode ? 'rob-input-has-error' : ''}>
          {
            this.props.type === 'bank' ? this._getBankDom() : null
          }
        </div>
        {
          /**
           * 省市区
           */
        }
        <div className={this.state.isShowEmptyMsg && ((this.props.type === 'bank' && !this.state.selectedCity.code) || (this.props.type !== 'bank' && !this.state.selectedRegion.code)) ? 'rob-input-has-error' : ''}>
          {
            this.props.type !== 'independent' ? this._getAddressDom() : null
          }
        </div>
        {
          /**
           * 分支行
           */
        }
        <div className={this.state.isShowEmptyMsg && !this.state.selectedBranchBank.bankCode ? 'rob-input-has-error' : ''}>
          {
            this.props.type === 'bank' ? this._getBranchBankDom() : null
          }
        </div>
        {
          /**
           * 错误提示
           */
        }
        {/**
         * 
         
          this.state.isShowEmptyMsg ? (
            <div className="rob-form-group" style={{ marginTop: '-20px' }}>
              <div className={this.props.labelClass} />
              <div className={this.props.mainClass}>
                <div className="rob-error-message">
                  {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}{this.props.emptyMsg}
                </div>
              </div>
            </div>
          ) : null
        */
        }
      </div>
    )
  }
  _getBankDom = () => (
    <div className="rob-form-group">
      {/* label */}
      <div className={this.props.labelClass}>
        <label htmlFor="inputEmail3" className="rob-input-label" title={this.props.bankLabel}>
          {`${this.props.bankLabel}:`}
        </label>
      </div>
      <div className={this.props.mainClass}>
        <div className={`rob-select ${this.state.showBankList ? 'open' : ''}`}>
          <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
            <div
              className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
              onClick={() => {
                this.setState({ showBankList: true }, () => {
                  document.addEventListener('click', this._handleClick)
                })
              }}
            >
              <i className="rob-is-icon-right qb-icon-angle-down" />
              {this.state.selectedBank.bankName || '请选择开户银行'}
            </div>
            {
              /* 下拉选项框 */
            }
            <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
              {this.state.filterBankList.length > 0 ? <div className="qb-c-search-g mlr10">
                <input
                  type="text"
                  className="search-inp"
                  onChange={(e) => {
                    this._filterBankName(e.target.value)
                  }}
                  onFocus={this._stopPropagation}
                  onBlur={() => {
                    document.addEventListener('click', this._handleClick)
                  }}
                  style={{ marginBottom: '3px' }}
                />
                <i className="qb-c-search-g__icon-search qb-icon-search" />
              </div> : null}
              {
                this.state.bankList ? this.state.bankList.map((item, index) => (
                  <div
                    className={`rob-select-item ${item.bankCode === this.state.selectedBank.bankCode ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                    key={`${item.name}${index}`}
                    onClick={() => {
                      if (item.disabled) {
                        return
                      }
                      this._handleSelectBank(item)
                    }}
                    title={item.bankName}
                  >
                    {item.bankName}
                  </div>)
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
      {
        this.state.isShowEmptyMsg && !this.state.selectedBank.bankCode ? (
          <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
            <div className="qb-red-g rob-input-label text-left " title={this.props.bankEmptyMsg}>
              <i className="qb-icon-report1"></i>{this.props.bankEmptyMsg}</div>
          </div>) : null
      }
    </div>
  )
  _getAddressDom = () => (
    <div className="rob-form-group">
      {/* label */}
      <div className={this.props.labelClass}>
        <label htmlFor="inputEmail3" className="rob-input-label" title={this.props.bankLabel}>
          {`${this.props.addressLabel}:`}
        </label>
      </div>
      <div className={`${this.props.mainClass}`}>
        <div className="rob-row rob-select-address">
          {
            /**
             * 省
             */
          }
          <div className={`${this.props.type !== 'bank' ? 'rob-col-md-8 rob-col-xs-8 rob-col-sm-8 rob-col-lg-8 ' : 'rob-col-md-12 rob-col-xs-12 rob-col-sm-12 rob-col-lg-12 '} rob-select-address-item`}>
            <div className={`rob-select ${this.state.showProvinceList ? 'open' : ''}`}>
              <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                <div
                  className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
                  onClick={() => {
                    this.setState({ showProvinceList: true }, () => {
                      document.addEventListener('click', this._handleClick)
                    })
                  }}
                  title={this.state.selectedProvince.name || '请选择省'}
                >
                  <i className="rob-is-icon-right qb-icon-angle-down" />
                  {this.state.selectedProvince.name || '请选择省'}
                </div>
                {
                  /* 下拉选项框 */
                }
                <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
                  {
                    this.state.provinceList.map((item, index) => (
                      <div
                        className={`rob-select-item ${item.code === this.state.selectedProvince.code ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                        key={`${item.name}${index}`}
                        onClick={() => {
                          if (item.disabled) {
                            return
                          }
                          this._handleSelectProvince(item)
                        }}
                        title={item.name}
                      >
                        {item.name}
                      </div>)
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          {
            /**
             * 市
             */
          }
          <div className={`${this.props.type !== 'bank' ? 'rob-col-md-8 rob-col-xs-8 rob-col-sm-8 rob-col-lg-8 ' : 'rob-col-md-12 rob-col-xs-12 rob-col-sm-12 rob-col-lg-12 '} rob-select-address-item`}>
            <div className={`rob-select ${this.state.showCityList ? 'open' : ''}`}>
              <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                <div
                  className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
                  onClick={() => {
                    this.setState({ showCityList: true }, () => {
                      document.addEventListener('click', this._handleClick)
                    })
                  }}
                  title={this.state.selectedCity.name || '请选择市'}
                >
                  <i className="rob-is-icon-right qb-icon-angle-down" />
                  {this.state.selectedCity.name || '请选择市'}
                </div>
                {
                  /* 下拉选项框 */
                }
                <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
                  {
                    this.state.cityList.map((item, index) => (
                      <div
                        className={`rob-select-item ${item.code === this.state.selectedCity.code ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                        key={`${item.name}${index}`}
                        onClick={() => {
                          if (item.disabled) {
                            return
                          }
                          this._handleSelectCity(item)
                        }}
                        title={item.name}
                      >
                        {item.name}
                      </div>)
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          {
            /**
             * 判断省市区还是银行
             * 银行没有区选项
             */
          }
          {
            this.props.type !== 'bank' ? (
              <div className="rob-col-md-8 rob-col-xs-8 rob-col-sm-8 rob-col-lg-8 rob-select-address-item">
                <div className={`rob-select ${this.state.showRegionList ? 'open' : ''}`}>
                  <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                    <div
                      className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
                      onClick={() => {
                        this.setState({ showRegionList: true }, () => {
                          document.addEventListener('click', this._handleClick)
                        })
                      }}
                      title={this.state.selectedRegion.name || '请选择区'}
                    >
                      <i className="rob-is-icon-right qb-icon-angle-down" />
                      {this.state.selectedRegion.name || '请选择区'}
                    </div>
                    {
                      /* 下拉选项框 */
                    }
                    <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
                      {
                        this.state.regionList.map((item, index) => (
                          <div
                            className={`rob-select-item ${item.code === this.state.selectedRegion.code ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                            key={`${item.name}${index}`}
                            onClick={() => {
                              if (item.disabled) {
                                return
                              }
                              this._handleSelectRegion(item)
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </div>)
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
      {this.state.isError && this.props.type !== 'bank' ?
        <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
          <div title={this.props.addressEmptyMsg} className="qb-red-g rob-input-label text-left ">{this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null} {this.props.addressEmptyMsg}</div>
        </div> : null}
      {this.state.isError && this.props.type === 'bank' && (!this.state.selectedProvince.code || !this.state.selectedCity.code) ?
        <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
          <div title={this.props.addressEmptyMsg} className="qb-red-g rob-input-label text-left ">{this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null} {this.props.addressEmptyMsg}</div>
        </div> : null}
    </div>
  )
  _getBranchBankDom = () => (
    <div className="rob-form-group">
      {/* label */}
      <div className={this.props.labelClass}>
        <label htmlFor="inputEmail3" className="rob-input-label" title={this.props.branchBankLabel}>
          {`${this.props.branchBankLabel}:`}
        </label>
      </div>
      <div className={this.props.mainClass}>
        <div className={`rob-select ${this.state.showBranchBankList ? 'open' : ''}`}>
          <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
            <div
              className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
              onClick={() => {
                this.setState({ showBranchBankList: true }, () => {
                  document.addEventListener('click', this._handleClick)
                })
              }}
            >
              <i className="rob-is-icon-right qb-icon-angle-down" />
              {this.state.selectedBranchBank.bankName || '请选择开户支行'}
            </div>
            {
              /* 下拉选项框 */
            }
            <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
              {this.state.filterBranchBankList.length > 0 ? <div className="qb-c-search-g mlr10">
                <input
                  type="text"
                  className="search-inp"
                  onChange={(e) => {
                    this._filterBranchBankName(e.target.value)
                  }}
                  onFocus={this._stopPropagation}
                  onBlur={() => {
                    document.addEventListener('click', this._handleClick)
                  }}
                  style={{ marginBottom: '3px' }}
                />
                <i className="qb-c-search-g__icon-search qb-icon-search" />
              </div> : null}
              {
                this.state.branchBankList ? this.state.branchBankList.map((item, index) => (
                  <div
                    className={`rob-select-item ${item.bankCode === this.state.selectedBranchBank.bankCode ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                    key={`${item.name}${index}`}
                    onClick={() => {
                      if (item.disabled) {
                        return
                      }
                      this._handleSelectBranchBank(item)
                    }}
                  >
                    {item.bankName}
                  </div>)
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
      {this.state.isError && !this.state.selectedBranchBank.code ?
        <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
          <div title={this.props.branchBankEmptyMsg} className="qb-red-g rob-input-label text-left ">{this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null} {this.props.branchBankEmptyMsg}</div>
        </div> : null}
    </div>
  )
  _getIndependentDom = () => (
    <div className="rob-form-group">
      {/* label */}
      <div className={this.props.labelClass}>
        <label htmlFor="inputEmail3" className="rob-input-label" title={this.props.bankLabel}>
          {`${this.props.addressLabel}:`}
        </label>
      </div>
      <div className={`${this.props.mainClass}`}>
        <div className="rob-row rob-select-address">
          {
            /**
             * 省
             */
          }
          <div className="rob-col-md-12 rob-col-xs-12 rob-col-sm-12 rob-col-lg-12 '} rob-select-address-item">
            <div className={`rob-select ${this.state.showProvinceList ? 'open' : ''}`}>
              <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                <div
                  className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
                  onClick={() => {
                    this.setState({ showProvinceList: true }, () => {
                      document.addEventListener('click', this._handleClick)
                    })
                  }}
                >
                  <i className="rob-is-icon-right qb-icon-angle-down" />
                  {this.state.selectedProvince.name || '请选择省'}
                </div>
                {
                  /* 下拉选项框 */
                }
                <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
                  {
                    this.state.provinceList.map((item, index) => (
                      <div
                        className={`rob-select-item ${item.code === this.state.selectedProvince.code ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                        key={`${item.name}${index}`}
                        onClick={() => {
                          if (item.disabled) {
                            return
                          }
                          this._handleSelectProvince(item)
                        }}
                      >
                        {item.name}
                      </div>)
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          {
            /**
             * 市
             */
          }
          <div className="rob-col-md-12 rob-col-xs-12 rob-col-sm-12 rob-col-lg-12 rob-select-address-item">
            <div className={`rob-select ${this.state.showCityList ? 'open' : ''}`}>
              <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                <div
                  className="qb-select-g  rob-select-box rob-input rob-has-icon-right"
                  onClick={() => {
                    this.setState({ showCityList: true }, () => {
                      document.addEventListener('click', this._handleClick)
                    })
                  }}
                >
                  <i className="rob-is-icon-right qb-icon-angle-down" />
                  {this.state.selectedCity.name || '请选择市'}
                </div>
                {
                  /* 下拉选项框 */
                }
                <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
                  {
                    this.state.cityList.map((item, index) => (
                      <div
                        className={`rob-select-item ${item.code === this.state.selectedCity.code ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                        key={`${item.name}${index}`}
                        onClick={() => {
                          if (item.disabled) {
                            return
                          }
                          this._handleSelectCity(item)
                        }}
                      >
                        {item.name}
                      </div>)
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  _getBankList = () => {
    this.props.getBank().then((res) => {
      const { data = {} } = res,
        { body = [] } = data
      this.setState({
        filterBankList: body,
        bankList: body
      })
    })
  }
  _getProvinceList = () => {
    this.props.getProvince().then((res) => {
      const { data = {} } = res,
        { body = [] } = data
      this.setState({
        provinceList: body
      })
    })
  }
  _getCityList = (item) => {
    if (!item) {
      this.setState({
        cityList: [],
        regionList: []
      })
      return
    }
    this.props.getCity({ provinceCode: item.code }).then((res) => {
      const { data = {} } = res,
        { body = [] } = data
      this.setState({
        cityList: body,
        regionList: []
      })
    })
  }
  _getRegionList = (item) => {
    this.props.getArea({ cityCode: item.code }).then((res) => {
      const { data = {} } = res,
        { body = [] } = data
      this.setState({
        regionList: body
      })


    })
  }
  _getBranchBankList = () => {
    this.props.getSubbranch({ cityCode: this.state.selectedCity.code, parentBankCode: this.state.selectedBank.bankCode })
  }
  _handleSelectBank = (item) => {
    this.setState({ selectedBank: item, selectedBranchBank: {} }, () => {
      if (this.state.selectedCity.code) this._getBranchBankList()
      this.props.handleSelect(this._formatResult())
      // this.getErrStatus()
    })
  }
  _handleSelectProvince = (item) => {
    this.setState({
      selectedProvince: item,
      selectedCity: {},
      selectedRegion: {},
      selectedBranchBank: {}
    }, () => {
      this.props.type === 'independent' ? this.props.handleSelectProvince(item) : null
      this._getCityList(item)
      this.props.handleSelect(this._formatResult())
      // this.getErrStatus()
    })
  }
  _handleSelectCity = (item) => {
    this.setState({
      selectedCity: item,
      selectedRegion: {},
      selectedBranchBank: {}
    }, () => {
      this.props.type === 'bank' ? this._getBranchBankList() : this._getRegionList(item)
      this.props.type === 'independent' ? this.props.handleSelectCity(item) : null
      this.props.handleSelect(this._formatResult())
      // this.getErrStatus()
    })
  }
  _handleSelectRegion = (item) => {
    this.setState({ selectedRegion: item, text: item.text }, () => {
      this.getErrStatus() ? (
        this.setState({
          isShowEmptyMsg: true
        })) : (
          this.setState({
            isShowEmptyMsg: false
          })
        )
      this.props.handleSelect(this._formatResult())
      // this.getErrStatus()
    })
  }
  _handleSelectBranchBank = (item) => {
    this.setState({ selectedBranchBank: item, text: item.text }, () => {
      this.getErrStatus() ? (
        this.setState({
          isShowEmptyMsg: true,
          branchBankEmptyMsg: this.props.branchBankEmptyMsg
        })) : (
          this.setState({
            isShowEmptyMsg: false
          })
        )
      this.props.handleSelect(this._formatResult())
      // this.getErrStatus()
    })
  }
  _handleClick = () => {
    this.setState({
      showBankList: false,
      showProvinceList: false,
      showCityList: false,
      showRegionList: false,
      showBranchBankList: false
    }, () => {
      document.removeEventListener('click', this._handleClick)
    })
  }
  _formatResult = () => {
    if (this.props.type === 'bank') {
      return {
        bank: this.state.selectedBank,
        province: this.state.selectedProvince,
        city: this.state.selectedCity,
        branchBank: this.state.selectedBranchBank
      }
    }
    return {
      province: this.state.selectedProvince,
      city: this.state.selectedCity,
      region: this.state.selectedRegion
    }
  }
  // 模糊匹配总行名称
  _filterBankName = (value) => {
    let getData = []
    this.state.filterBankList.forEach((item) => {
      if (item.bankName.indexOf(value) !== -1) {
        getData.push(item)
      }
    })
    this.setState({ bankList: getData })
  }
  // 模糊匹配支行名称
  _filterBranchBankName = (value) => {
    let getData = []
    this.state.filterBranchBankList.forEach((item) => {
      if (item.bankName.indexOf(value) !== -1) {
        getData.push(item)
      }
    })
    this.setState({ branchBankList: getData })
  }
  // 阻止冒泡事件
  _stopPropagation = () => {
    document.removeEventListener('click', this._handleClick)
  }
  setValue = (val) => {
    this.setState({
      selectedBank: val.bank || {},
      selectedBranchBank: val.branchBank || {},
      selectedProvince: val.province || {},
      selectedCity: val.city || {},
      selectedRegion: val.region || {}
    })
  }
  getValues = () => this._formatResult()

  getErrStatus = () => {
    if (!this.props.required) {
      return false
    }
    if (!(this.props.type === 'bank')) {
      if ((!this.state.selectedProvince.code || !this.state.selectedCity.code || !this.state.selectedRegion.code)) {
        this.setState({
          isError: true,
          errorInfo: this.props.emptyMsg
        })
        return true
      }
    } else {
      if (!this.state.selectedBranchBank.bankCode || !this.state.selectedBank.bankCode || !this.state.selectedProvince.code || !this.state.selectedCity.code) {
        this.setState({
          isError: true,
          errorInfo: this.props.emptyMsg
        })
        return true
      }
    }
    this.setState({
      isError: false,
      errorInfo: null
    })
    return false
  }
}
export default connect(({ registerAddress = {} }) => ({
  getProvinceData: registerAddress.handleGetProvince,
  getCityData: registerAddress.handleGetCity,
  getAreaData: registerAddress.handleGetArea,
  getBankData: registerAddress.handleGetBank,
  getSubbranchData: registerAddress.handleGetSubbranch,
}), dispatch => ({
  getProvince: bindActionCreators(getProvince, dispatch),
  getCity: bindActionCreators(getCity, dispatch),
  getArea: bindActionCreators(getArea, dispatch),
  getBank: bindActionCreators(getBank, dispatch),
  getSubbranch: bindActionCreators(getSubbranch, dispatch)
}), null, { withRef: true })(BankAndAddress)