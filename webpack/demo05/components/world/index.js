import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class World extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      liked: true,
      props1:'初始化state'
      
    };
  }
     //组件将要被渲染到真实的dom节点中
  componentWillMount(){
      console.log('componentWillMount');
  }
  //组件已经插入到真实的dom节点中
  componentDidMount(){
      console.log('componentDidMount');
  }
  //组件是否要被重新渲染
  shouldComponentUpdate(){
      console.log('shouldComponentUpdate');
      return true;
  }
  //组件将要被重新渲染
  componentWillUpdate(){
      console.log('componentWillUpdate');
  }
   //组件已经被重新渲染
   componentDidUpdate(){
       console.log('componentDidUpdate');
   }
  //组件将要接收到新属性
  componnentWillReceiveProps(){
      console.log('componnentWillReceiveProps');
  }
  handleClick = () => {
    this.setState({
      liked: !this.state.liked,
    })
  }
   click1=()=>{
      console.log('点击了单击事件');
      this.setState({
          props1:'改变了state的值'
      })
      console.log('点击了单击事件结束');
  }
  render() {
    var text = this.state.liked ? '喜欢' : '不喜欢';
    return <div>
      <WorldProp text={text} handleClick={this.handleClick} />
      <WorldProp2 text={this.state.props1} click1={this.click1} />
    </div>
  }
}

class WorldProp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <p onClick={this.props.handleClick}>
        你<b>{this.props.text}</b>我。
      </p>
  }
}
class WorldProp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <p onClick={this.props.click1}>
        你<b>{this.props.text}</b>我。
      </p>
  }
}



ReactDOM.render(<World />, document.getElementById('world'));
