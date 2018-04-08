import React, { PureComponent } from 'react'
import cookieStorage from 'utils/cookieStorage'
import PropTypes from 'prop-types'
let firstMenu = []
export default class BusinessRules extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      containCheckbox: false,
      striped: true,
      hoverEffect: true,
      divide: true,
      pagination: false
    }
  }
  static propTypes = {
    dataList: PropTypes.array,
  }
  static defaultProps = {
    dataList: [],
  }
  componentWillReceiveProps = (next) => {
    firstMenu = [
      {
        menuName: '支付结算',
        childmenu: [
          {
            menuName: '单笔经办',
            bizType: 201000,
            childmenu: [
              {
                isNon: true
              }
            ],
          },
          {
            menuName: '批量经办',
            bizType: 201500,
            childmenu: [
              {
                isNon: true
              }
            ],
          },
        ],
      },
      {
        menuName: '代发',
        childmenu: [
          {
            menuName: '代发经办',
            bizType: 251000,
            childmenu: [
              {
                isNon: true
              }
            ],
          },
        ],
      }
    ]
    // 通过二级菜单的biztype 配对相同的二级菜单
    let receivedMenu = next.dataList
    if (firstMenu) {
      for (let i1 = 0; i1 < firstMenu.length; i1++) {
        for (let i2 = 0; i2 < firstMenu[i1].childmenu.length; i2++) {
          // 遍历自己写死的每个bizType
          let curBizType = firstMenu[i1].childmenu[i2].bizType
          if (receivedMenu) {
            for (let i3 = 0; i3 < receivedMenu.length; i3++) {
              if (Number(receivedMenu[i3].outBizType) === curBizType) {
                firstMenu[i1].childmenu[i2].childmenu = receivedMenu[i3].ruleList
              }
            }
          }
        }
      }
    }
    // 计算每个一级菜单与二级菜单分别对应多少个三级菜单
    for (let a = 0; a < firstMenu.length; a++) {
      let count1 = 0
      for (let b = 0; b < firstMenu[a].childmenu.length; b++) {
        let count2 = 0
        for (let c = 0; c < firstMenu[a].childmenu[b].childmenu.length; c++) {
          count2++
          count1++
        }
        firstMenu[a].childmenu[b].nummber = count2
      }
      firstMenu[a].nummber = count1
    }
  }
  render() {
    let userInfo = {}
    if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
      userInfo = cookieStorage.getCookie('userInfo')
    }
    return (
      <div style={{ display: userInfo.companyType === '200' ? 'none' : 'block' }}>
        <div className="qb-column-header-g">
          业务规则权限列表
        </div>
        <div className="rob-table-responsive qb-media-height">
          <table className="rob-table rob-table-striped rob-table-bordered-erect qb-table-g qb-table-label-g">
            <thead>
              <tr>
                <th> 业务模块</th>
                <th> 权限描述</th>
              </tr>
            </thead>
            {
              firstMenu.map((item1, j1) => (
                <tbody key={j1}>
                  {
                    item1.childmenu.map((item2, j2) => (
                      item2.childmenu.map((item3, j3) => (
                        <tr key={j3}>
                          {j2 === 0 && j3 === 0 ? <td rowSpan={item1.nummber}>{item1.menuName}</td> : null}
                          <td className="text-left" style={{ display: item3.isNon === true ? 'none' : 'block' }}>
                            {
                              (
                                <label>
                                  <span style={{ fontSize: '14px' }}>账户：</span>{item3.accountNo}({item3.accountName})
                                  {
                                    item3.ruleName ? (
                                      <span>
                                        <span style={{ fontSize: '14px' }}>&nbsp;&nbsp;&nbsp;&nbsp;规则名称：</span>{item3.ruleName}
                                      </span>
                                    ) : null
                                  }
                                  <span style={{ fontSize: '14px' }}>&nbsp;&nbsp;&nbsp;&nbsp;权限：</span>
                                  <span>{item3.authName}</span>
                                </label>
                              )
                            }
                          </td>
                        </tr>
                      ))
                    ))
                  }
                </tbody>
              ))
            }
          </table>
        </div>
      </div>
    )
  }
}

