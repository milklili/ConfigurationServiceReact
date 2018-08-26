import React, { Component } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts'


class LineChart extends Component {



  drawComment=(data)=>{
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('commentLine'))
    // 绘制图表
    myChart.setOption({
      xAxis: {
          type: 'category',
          data: data.time,
      },
      yAxis: {
          type: 'value',
      },
      series: [{
          data: data.prices,
          type: 'line',
      },
    ],
    })
  }

  componentDidUpdate () {
    this.drawComment(this.props.data)
  }
  componentDidMount (){

    this.drawComment(this.props.data)
  }

  render () {
    return(
      <div id="commentLine" style={{width:'100%',height:'200px',marginLeft:'20px'}}>

      </div>
    )
  }

}

export default LineChart
