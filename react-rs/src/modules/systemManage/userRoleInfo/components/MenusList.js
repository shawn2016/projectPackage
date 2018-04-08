import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
let firstMenu = [], secondMenu = []
export default class MenusList extends PureComponent {
  static propTypes = {
    dataList: PropTypes.array,
  }
  static defaultProps = {
    dataList: [],
  }
  constructor(props) {
    super(props)
    this.state = {
      firstMenu: []
    }
  }
  componentWillReceiveProps = (next) => {
    // 从路由中获取主键ID
    // 区分出一级菜单与二级菜单
    firstMenu = []
    secondMenu = []
    for (let i = 0; i < next.dataList.length; i++) {
      if (Number(next.dataList[i].menuLevel) === 1) {
        firstMenu.push(next.dataList[i])
      } else if (Number(next.dataList[i].menuLevel) === 2) {
        secondMenu.push(next.dataList[i])
      }
    }
    // 将二级菜单绑定到一级菜单
    for (let j = 0; j < firstMenu.length; j++) {
      firstMenu[j].childmenu = []
      for (let m = 0; m < secondMenu.length; m++) {
        if (Number(firstMenu[j].menuId) === Number(secondMenu[m].pmenuId)) {
          firstMenu[j].childmenu.push(secondMenu[m])
        }
      }
    }
    this.setState({
      firstMenu
    })
  }
  render() {
    return (
      <div>
        <div className="qb-column-header-g">
          菜单列表
        </div>
        <div className="rob-table-responsive">
          <table className="rob-table rob-table-striped rob-table-bordered-erect qb-table-g qb-table-label-g">
            <thead>
              <tr>
                <th> 一级菜单</th>
                <th> 二级菜单</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.firstMenu ? this.state.firstMenu.map((item, key) => (
                  <tr key={key}>
                    <td >{item.menuName}</td>
                    <td className="text-left">
                      {
                        item.childmenu.map((childitem, index) => (
                          <span key={index}>
                            <input type="checkbox" id={childitem.menuId} className="rob-checkbox-filled-in" defaultChecked={childitem.checked === '1'} disabled />
                            <label htmlFor={childitem.menuId}>{childitem.menuName}</label>
                          </span>
                        ))
                      }
                    </td>
                  </tr>
                )) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

