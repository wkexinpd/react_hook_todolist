import React from 'react';
import ReactDOM from 'react-dom';
import './tab.css'

class Tab extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      con1:"content active",
      con2:"content"
    }
    this.clickEvent = this.clickEvent.bind(this)
  }
  clickEvent(e){
    let index = e.target.dataset.index;
    if(index==1){
      this.setState({
        con1:"content active",
        con2:"content"
      })
    }else{
      this.setState({
        con2:"content active",
        con1:"content"
      })
    }
  }
  render(){
    return(
      <div>
        <button data-index="1" onClick={this.clickEvent}>按钮一</button>
        <button data-index="2" onClick={this.clickEvent}>按钮二</button>
        <h1 className={this.state.con1}>内容一</h1>
        <h1 className={this.state.con2}>内容二</h1>
      </div>
    )
  }
}
ReactDOM.render(
  <Tab/>,
  document.querySelector('#root')
)