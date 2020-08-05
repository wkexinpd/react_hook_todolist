import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      time:new Date().toLocaleTimeString()
    }
  }
  render(){
    return(
      <div>
        <h1>当前时间是：{this.state.time}</h1>  
      </div>
    )
  }
  //生命周期函数
  componentDidMount(){
    setInterval(()=>{
      this.setState({
        time:new Date().toLocaleTimeString()
      })
    },1000)
  }
}

ReactDOM.render(
  <Clock/>,
  document.querySelector('#root')
)

// setInterval(()=>{
//   ReactDOM.render(
//     <Clock/>,
//     document.querySelector('#root')
//   )
// },1000)