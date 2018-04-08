import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableCheckbox from './TableCheckbox'

class TableHeader extends Component {
  static robotUIName = 'TableHeader'
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    containCheckbox: PropTypes.bool,
    selectAllDisabled: PropTypes.bool,
    selectAllLable: PropTypes.string,
    defaultSelectAll: PropTypes.bool,
    checkboxType: PropTypes.string,
    modifySeletedIndexList: PropTypes.func
  }

  static defaultProps = {
    children: null,
    style: {},
    containCheckbox: false,
    selectAllDisabled: false,
    selectAllLable: '',
    defaultSelectAll: false,
    checkboxType: 'default',
    modifySeletedIndexList: null
  }
  state = {

  }
  componentWillMount = () => {

  }

  render() {
    return (
      <thead style={Object.assign({}, this.props.style)}>
        <tr>
          {this.props.containCheckbox ? <TableCheckbox
            checkboxIdName={'selectAll'}
            checkboxType={this.props.checkboxType}
            checkboxDisabled={this.props.selectAllDisabled}
            defaultSelected={this.props.defaultSelectAll}
            checkboxLabel={this.props.selectAllLable}
            handleSelect={this._handleSelectAll}
          /> : null}
          {this.props.children}
        </tr>
      </thead>
    )
  }

  _handleSelectAll = () => {
    console.log(2323)
    if (this.props.defaultSelectAll) {
      return this.props.modifySeletedIndexList('notSelectAll')
    }
    console.log(12312)
    this.props.modifySeletedIndexList('selectAll')
  }
}

export default TableHeader