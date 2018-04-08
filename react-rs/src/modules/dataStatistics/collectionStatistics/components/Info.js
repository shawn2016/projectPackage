/**
 * 列表部分
 * （批量经办查询）
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../redux/action'
import '../redux/reducer'
class Info extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataCount: 0,
      data: ['交易金额(元)', '结算金额(元)', '手续费(元)'],
      chartData: [10000000000, 10, 10]
    }
  }
  static propTypes = {
    history: PropTypes.object,
    getOrderList: PropTypes.func,
    dataObj: PropTypes.array,
    queryInfo: PropTypes.object,
  }
  static defaultProps = {
    history: {},
    getOrderList: () => { },
    dataObj: [],
    queryInfo: {},
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.dataObj) {
      this.setState({
        chartData: nextProps.dataObj
      })
    }
    setTimeout(() => {
      const myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: { text: '' },
        tooltip: {},

        legend: {
          show: true,
          orient: 'horizontal',
          //borderColor:'#df3434',
          //borderWidth:2,
          data: [],

          itemWidth: 16,
          itemHeight: 16,
          itemBorderRadius: 0,
          textStyle: {
            fontSize: 15,
            color: '#fff',
            borderRadius: 0,

          },
          top: 'bottom',
          bottom: '50%',
        },
        grid: {
          top: '70',
          //left: '10%',
          //right: '10%',
          //bottom: '3%',
          //containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },

        xAxis: [
          {
            type: 'category',
            data: this.state.data,
            splitLine: { show: false },
            splitArea: { show: false },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#d4d4d4',
                width: '1'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#585858',
                fontSize: 14,

              }
            }
          }
        ],

        color: ['#006fd9'],
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            max: Math.ceil(Math.max.apply(0, this.state.chartData)) || 0,
            label: {
              show: true,
              position: 'top',
              formatter: '{b}\n{c}'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#d4d4d4'], type: 'shadow', height: '6'
              }
            },
            splitArea: { show: false },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#d4d4d4',
                width: '1'
              }
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: '#585858',
                fontSize: 14,

              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.state.chartData,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            },
            itemStyle: { normal: { label: { show: true, position: 'top' } } },
            barWidth: 30,
            color: ['#006fd9'],
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            }

          }
        ]
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }, 0)
    console.log(this.state.chartData)
  }
  render() {
    /*let mapArray = []
    if (this.props.dataObj && this.props.dataObj.values) {
      mapArray = this.props.dataObj.values
    }*/
    return (
      <div className="clearfix qb-chart-g rob-row" >
        <div className="rob-col-lg-12 rob-col-md-24 rob-col-xs-24 rob-col-sm-24">
          <div className="qb-column-header-g qb-column-header-g--button" style={{ borderBottom: '0px' }}>
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li className="active"><a>扫码收款统计图</a></li>
            </ol>
          </div>
          <div className="qb-panel-g  qb-chart-g__element clearfix" style={{ padding: '10px', marginTop: '0px' }}>
            <div id="main" style={{ width: '100%', height: 480 }} />
          </div>
        </div>
      </div>
    )
  }
  _goToDetailsPage = item => {
    this.props.history.push({
      pathname: '/financeManage/batchHandleDetails',
      state: { data: item, from: 'searchBatchHandle' }
    })
  }
}


export default connect(state => ({
  dataObj: state.DSCS_singleHandleSearchInfo && state.DSCS_singleHandleSearchInfo.DSCS_orderList,
  queryInfo: state.DSCS_singleHandleSearchInfo && state.DSCS_singleHandleSearchInfo.DSCS_queryInfo,
}), dispatch => ({
  getOrderList: bindActionCreators(actions.DSCS_getOrderList, dispatch),
}))(Info)