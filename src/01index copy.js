import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function Clock(props){
  return(
    <div>
      <h1>现在的时间是{props.date.toLocaleTimeString()}</h1>
      <h2>这是副标题</h2>    
    </div>
  )
}
function run(){
  ReactDOM.render(
    <Clock date={new Date()}/>,
    document.querySelector('#root')
  )
}

setInterval(run,1000)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
