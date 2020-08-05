import React from 'react';
import ReactDOM from 'react-dom';
import jsonData from './feiyan.json'
import './06style.css'
import Search from './component/Search'
import App from './App.jsx'

// console.log(jsonData)

let provincesObj = {
  // "广东省":{
  //     confirm:0,
  //     suspect:0,
  //     heal:0,
  //     deal:0,
  // }
}

jsonData.data.list.forEach((item, i) => {
  if (provincesObj[item.province] === undefined) {
    provincesObj[item.province] = {
      confirm: 0,
      heal: 0,
      dead: 0,
    }
  }

  item.confirm = item.confirm ? item.confirm : 0;
  item.heal = item.heal ? item.heal : 0;
  item.dead = item.dead ? item.dead : 0;

  provincesObj[item.province] = {
    confirm: provincesObj[item.province].confirm + item.confirm,
    heal: provincesObj[item.province].heal + item.heal,
    dead: provincesObj[item.province].dead + item.dead
  }
});

let provinceList = []
for (const key in provincesObj) {
  provincesObj[key].province = key;
  provinceList.push(provincesObj[key])
}


// console.log(provincesObj)
// console.log(provinceList)

//排序
let provinceListSort = provinceList.sort((a, b) => {
  if (a.confirm < b.confirm) {
    return 1;
  } else {
    return -1;
  }
})

class Bili extends React.Component {
  render() {
    return (
      <div>
        <h1>中国病例</h1>
        <div id="map"></div>
        <Search provincesObj={this.props.provincesObj}></Search>
        <ul>
          <li>
            <span>地区</span>
            <span>确诊</span>
            <span>死亡</span>
            <span>治愈</span>
          </li>
        </ul>
        {
          this.props.list.map((item, index) => {
            return (
              <li>
                <span>{item.province}</span>
                <span>{item.confirm}</span>
                <span>{item.dead}</span>
                <span>{item.heal}</span>
              </li>
            )
          }) 
        }
      </div>
    )
  }
  componentDidMount(){
    var dataList=[
      {name:"南海诸岛",value:0},
      {name: '北京', value: randomValue()},
      {name: '天津', value: randomValue()},
      {name: '上海', value: randomValue()},
      {name: '重庆', value: randomValue()},
      {name: '河北', value: randomValue()},
      {name: '河南', value: randomValue()},
      {name: '云南', value: randomValue()},
      {name: '辽宁', value: randomValue()},
      {name: '黑龙江', value: randomValue()},
      {name: '湖南', value: randomValue()},
      {name: '安徽', value: randomValue()},
      {name: '山东', value: randomValue()},
      {name: '新疆', value: randomValue()},
      {name: '江苏', value: randomValue()},
      {name: '浙江', value: randomValue()},
      {name: '江西', value: randomValue()},
      {name: '湖北', value: randomValue()},
      {name: '广西', value: randomValue()},
      {name: '甘肃', value: randomValue()},
      {name: '山西', value: randomValue()},
      {name: '内蒙古', value: randomValue()},
      {name: '陕西', value: randomValue()},
      {name: '吉林', value: randomValue()},
      {name: '福建', value: randomValue()},
      {name: '贵州', value: randomValue()},
      {name: '广东', value: randomValue()},
      {name: '青海', value: randomValue()},
      {name: '西藏', value: randomValue()},
      {name: '四川', value: randomValue()},
      {name: '宁夏', value: randomValue()},
      {name: '海南', value: randomValue()},
      {name: '台湾', value: randomValue()},
      {name: '香港', value: randomValue()},
      {name: '澳门', value: randomValue()}
  ]
  dataList.map((item,index)=>{
    if(provincesObj[item.name]){
      item.value = provincesObj[item.name].confirm
    }else{
      item.value=0;
    }
  })
  var myChart = window.echarts.init(document.getElementById('map'));
  function randomValue() {
      return Math.round(Math.random()*1000);
  }
  let option = {
      tooltip: {
              formatter:function(params,ticket, callback){
                  return params.seriesName+'<br />'+params.name+'：'+params.value
              }//数据格式化
          },
      visualMap: {
          min: 0,
          max: 2000,
          left: 'left',
          top: 'bottom',
          text: ['高','低'],//取值范围的文字
          inRange: {
              color: ['#F5DEB3', '#8B0000']//取值范围的颜色
          },
          show:true//图注
      },
      geo: {
          map: 'china',
          roam: false,//不开启缩放和平移
          zoom:1.23,//视角缩放比例
          label: {
              normal: {
                  show: true,
                  fontSize:'10',
                  color: 'rgba(0,0,0,0.7)'
              }
          },
          itemStyle: {
              normal:{
                  borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis:{
                  areaColor: '#F3B329',//鼠标选择区域颜色
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      },
      series : [
          {
              name: '确诊人数',
              type: 'map',
              geoIndex: 0,
              data:dataList
          }
      ]
  };
  myChart.setOption(option);
  myChart.on('click', function (params) {
      alert(params.name);
  });
  }
}

ReactDOM.render(
  // <Bili list={provinceListSort} provincesObj={provincesObj}></Bili>,
  <App></App>,
  document.querySelector('#root')
)