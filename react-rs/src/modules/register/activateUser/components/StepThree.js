import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-robotUI/Button'
import emptyFunc from 'utils/emptyFunc'

export default class StepThree extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    stepNum: PropTypes.number,
    history: PropTypes.object
  }
  static defaultProps = {
    handleClick: emptyFunc,
    stepNum: 0,
    history: {}
  }
  goToLogin = () => {
    this.props.history.push('/login')
  }
  render() {
    const { stepNum } = this.props
    return (
      <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g" style={{ display: stepNum === 3 ? 'block' : 'none' }}>
        <div className="text-center qb-r-success-g">
          <i className="bg_icon qb-icon-success" />
          <div className="qb-r-success-g--s_box">
            <br />
            <span className="font18">恭喜您已成功激活账号！</span>
          </div>
        </div>
        <div className="">
          <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
            <Button className="rob-btn rob-btn-danger rob-btn-circle" label="确定" onClick={this.goToLogin} />
          </div>
        </div>
      </form>
    )
  }
}