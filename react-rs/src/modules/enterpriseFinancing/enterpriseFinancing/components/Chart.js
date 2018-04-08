/**
 * Created by Administrator on 2017-7-31.
 */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import '../redux/reducer'
// import { stringify } from 'zrender/lib/tool/color';

class Chart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      containCheckbox: false,
      striped: true,
      hoverEffect: true,
      divide: false,
    }
  }
  lineChart = (LoanIntentionData1) => {
    const myChart1 = echarts.init(document.getElementById('main1'))
    myChart1.setOption({
      tooltip: {
        //trigger: 'item',
        showDelay: 20,
        hideDelay: 100,
        transitionDuration: 0.4,
        //backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: '#333',
        borderRadius: 4,
        borderWidth: 0,
        padding: 5,
        axisPointer: {
          type: 'line',
          lineStyle: {
            /*color: '#48b',
             width: 2,
             type: 'solid',*/
            color: ['#d4d4d4'], type: 'shadow', height: '1', width: '1',
          },
          shadowStyle: {
            width: 'auto',
            color: 'rgba(150,150,150,0.3)'
          }
        },
        textStyle: {
          color: '#393939'
        },
        backgroundColor: '#fff',
        //borderColor: '#333',
        //borderWidth: 3,
        shadowStyle: {
          color: 'rgba(0,0,0,0.1)',
          type: 'default',
          width: '30',
        },
        extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.4)',
        //boxShadow: '0 0 9px rgba(0, 0, 0, 0.3)',

        trigger: 'axis',
        formatter: (params) => {
          const x = `<span style="color:#ff830a;">收益${params[0].value}元</span>`
          return x
        },
        position: (point, params, dom) => {
          const posDis = window.innerWidth - dom.offsetWidth
          return posDis < point[0] ? [posDis, '300%'] : [point[0], '14%']
        },
      },
      grid: {
        containLabel: true,
        top: '70',
        left: '0%',
        right: '0%',
        //bottom: '3%',
        //containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: LoanIntentionData1.profitTimeList || 0,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: '#d4d4d4',
            width: '1.2'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#585858',
            fontSize: 12,
            fontStyle: 'italic'
          }
        },
        // min: 1
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: Math.ceil(Math.max.apply(0, LoanIntentionData1.profitMoneyList)) || 0,
        //interval: 10/2,
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#d4d4d4'], type: 'shadow', height: '6'
          }
        },
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
      },
      series: [

        {
          symbol: 'circle',
          symbolSize: '2',
          name: '账户验证',
          type: 'line',
          itemStyle: {
            textStyle: {
              fontWeight: '700',
              fontSize: '12',
              color: '#ff830a'
            },
            normal: {
              color: '#ff830a',
              lineStyle: {
                color: '#ff830a'
              }
            }
          },
          data: LoanIntentionData1.profitMoneyList || []
        }
      ]
    })
    window.addEventListener('resize', () => {
      myChart1.resize()
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let LoanIntentionData1 = {}
    if (nextProps.data && nextProps.data.EFEF_dayTradingData && nextProps.data.EFEF_dayTradingData.sevenDaysProfit) {
      LoanIntentionData1 = nextProps.data.EFEF_dayTradingData.sevenDaysProfit
    }
    this.setState({
      LoanIntentionData1
    })
    setTimeout(() => {
      if (JSON.stringify(LoanIntentionData1) !== '{}' && LoanIntentionData1.profitMoneyList && LoanIntentionData1.profitTimeList && location.pathname === '/enterpriseFinancing/enterpriseFinancing') {
        this.lineChart(LoanIntentionData1)
      }
    }, 0)
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <div className="rob-col-lg-12 column">
          <div className="qb-panel-g  qb-chart-g__element clearfix">
            <div className="qb-column-header-g qb-column-header-g--button">
              <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                <li className="active"><a>近七日收益(元)</a></li>
              </ol>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ padding: '10px' }} className="clearfix">
                {
                  this.state.LoanIntentionData1 && (this.state.LoanIntentionData1.profitMoneyList || this.state.LoanIntentionData1.profitTimeList) ? <div id="main1" style={{ width: '100%', height: 480 }} /> : <div className="qb-nodate-g__box"><span className="qb-nodate-g bg_icon" /><p>暂无收易记录</p></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
Chart.propTypes = {
  data: PropTypes.object,
  //data1: PropTypes.object,
  getLoanIntention: PropTypes.func,
  getEnterpriseRegistration: PropTypes.func,
  getDigitalCertificate: PropTypes.func,
  getLoanIntention1: PropTypes.func
}
Chart.defaultProps = {
  data: {},
  //data1: {},
  getLoanIntention: () => { },
  getEnterpriseRegistration: () => { },
  getDigitalCertificate: () => { },
  getLoanIntention1: () => { }
}
export default connect(state => ({
  data: state.listQuery,
  //data1: state.listQuery
}))(Chart)