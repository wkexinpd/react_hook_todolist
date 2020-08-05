import React, { Children } from 'react';
import ReactDOM from 'react-dom';

//子传父
class ParentCom extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      childData:null
    }
  }
  render(){
    return (
      <div>
        <h1>{this.state.childData}</h1>
        <ChildCom setChildData={this.setChildData}></ChildCom>
      </div>
    )
  }
  setChildData=(data)=>{
    this.setState({
      childData:data
    })
  }
}

class ChildCom extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      msg:'helloworld'
    }
  }
  render(){
    return(
      <div>
        <button onClick={this.sendData}>子组件传来的数据</button>
      </div>
    )
  }
  sendData=()=>{
    this.props.setChildData(this.state.msg)
  }
}

ReactDOM.render(
  <ParentCom></ParentCom>,
  document.querySelector('#root')
)