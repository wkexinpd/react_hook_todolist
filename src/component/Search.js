import React from 'react';

class Search extends React.Component{
    constructor(props) {    
        super(props)
        // console.log(props)
        this.state = {
            searchValue:'',
            result:null
        }
    }
    render(){
        return(
            <div>
                <input type="text" value={this.state.searchValue} placeholder="请输入想要查询的城市" onChange={this.changeEvent} onKeyDown={this.keyEvent}></input>
                <div>查询结果：{this.state.result}</div>
            </div>
        )
    }
    keyEvent=(e)=>{
        // console.log(this.props.provincesObj)
        // console.log(e.keyCode)
        if(e.keyCode===13){
            if(this.props.provincesObj[this.state.searchValue]==undefined){
               this.setState({
                   result:<h2>无查询结果</h2>
               })
            }else{
                this.setState({
                    result:<div>
                    <p>确诊人数：{this.props.provincesObj[this.state.searchValue].confirm}</p>
                    <p>死亡人数：{this.props.provincesObj[this.state.searchValue].dead}</p>
                    <p>治愈人数：{this.props.provincesObj[this.state.searchValue].heal}</p>
                </div>
                })
            }
        }
    }
    changeEvent=(e)=>{
        // console.log(e.target.value)
        this.setState({
            searchValue:e.target.value
        })
    }
    
}
export default Search