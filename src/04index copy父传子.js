import React, { Children } from 'react';
import ReactDOM from 'react-dom';

//父传子
class ParentCom extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      giveChild:'我是父组件中的数据'
    }
  }
  render(){
    return(
      <div>
        <ChildCom data={this.state.giveChild}></ChildCom>
      </div>
    )
  }
}
class ChildCom extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div>
        <h1>{this.props.data}</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <ParentCom></ParentCom>,
  document.querySelector('#root')
)