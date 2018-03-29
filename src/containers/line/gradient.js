import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import echarts from 'echarts/lib/echarts';
// 引入actions中的方法
import {fetch} from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.less';

const mapStateToProps = state => ({
  massages: state.massages
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {fetch, setUIElement, echarts},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class ExceptionPage extends Component {
  state={
    option: {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }
  // 组件即将渲染时触发的事件
  componentWillMount() {
    this.props.setUIElement('layout', 'title', 'Map');
  }
  componentDidMount() {
    this.initChart();
  }
  componentDidUpdate() {
    this.initChart();
  }
  initChart() {
    const { option } = this.state;
    const eChart = echarts.init(this.refs.eChartBox);
    eChart.setOption(option);
  }
  // 渲染
  render() {
    return (
      <div className="echart-container" ref="eChartBox" />
    );
  }
}
