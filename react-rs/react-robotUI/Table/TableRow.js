import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableCheckbox from './TableCheckbox'
class TableRow extends Component {
  static robotUIName = 'TableRow'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    containCheckbox: PropTypes.bool,
    checkboxType: PropTypes.string,
    checkboxDisabled: PropTypes.bool,
    checkboxChecked: PropTypes.bool,
    checkboxLabel: PropTypes.string,
    index: PropTypes.number,
    selectedIndexList: PropTypes.array,
    modifySeletedIndexList: PropTypes.func,
    handleSelect: PropTypes.func,
    onClick: PropTypes.func
  }

  static defaultProps = {
    children: null,
    style: { whiteSpace: 'nowrap' },
    containCheckbox: false,
    checkboxType: 'default',
    checkboxDisabled: false,
    checkboxChecked: false,
    checkboxLabel: '',
    index: 0,
    selectedIndexList: [],
    modifySeletedIndexList: null,
    handleSelect: () => { },
    onClick: () => { }
  }
  constructor(props) {
    super(props)
    this.state = {
      checked: this._isInArray(this.props.index, this.props.selectedIndexList)
    }
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      checked: this._isInArray(nextProps.index, nextProps.selectedIndexList)
    })
  }
  componentWillMount = () => {

  }
  render() {
    return (
      <tr onClick={this.props.onClick}>
        {this.props.containCheckbox ? <TableCheckbox
          defaultSelected={this.state.checked}
          checkboxDisabled={this.props.checkboxDisabled}
          checkboxIdName={`checkbox${this.props.index}`}
          checkboxType={this.props.checkboxType}
          checkboxLabel={this.props.checkboxLabel}
          handleSelect={this._handleSelect}
        /> : null}
        {this.props.children}
      </tr>
    )
  }
  _handleSelect = () => {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.modifySeletedIndexList('select', this.props.index)
      } else {
        this.props.modifySeletedIndexList('notSelect', this.props.index)
      }
      this.props.handleSelect ? this.props.handleSelect(this.state.checked) : null
    })
  }
  _isInArray(value, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return true
      }
    }
    return false
  }
}

export default TableRow