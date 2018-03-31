import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import echarts from 'echarts';
import { Row, Col, Input, Button, Form } from 'antd';
// 引入actions中的方法
import {fetch} from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const mapStateToProps = state => ({
  dataStr: state.line.gradientData,
  title: state.layout.title
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {fetch, setUIElement, echarts},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
class LineGardientPage extends Component {
  constructor(props) {
    super(props);
    this.initChart = this.initChart.bind(this);
  }
  // 组件即将渲染时触发的事件
  componentWillMount() {
    this.props.setUIElement('layout', 'title', 'Line Gradient');
    this.initChart();
  }
  componentDidMount() {
    this.initChart();
  }
  componentDidUpdate() {
    this.initChart();
  }
  initChart() {
    const {dataStr} = this.props;
    const data = dataStr;
    const valueList = _.map(data, item => item[1]);
    const dateList = _.map(data, item => item[0]);
    const option = {
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }, {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1
      }],
      title: [{
        left: 'center',
        text: 'Gradient along the y axis'
      }, {
        top: '55%',
        left: 'center',
        text: 'Gradient along the x axis'
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [{
        data: dateList
      }, {
        data: dateList,
        gridIndex: 1
      }],
      yAxis: [{
        splitLine: {show: false}
      }, {
        splitLine: {show: true},
        gridIndex: 1
      }],
      grid: [{
        bottom: '60%'
      }, {
        top: '60%'
      }],
      series: [{
        type: 'line',
        name: '流量',
        showSymbol: false,
        data: valueList
      }, {
        type: 'line',
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
    };
    if(this.eChartBox) {
      const eChart = echarts.init(this.eChartBox);
      eChart.setOption(option);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        this.props.setUIElement('line', 'gradientData', values);
      }
    });
  }
  // 渲染
  render() {
    const {title} = this.props;
    const {getFieldDecorator, isFetching} = this.props.form;
    return (
      <div>
        <h3>{title}</h3>
        <div className="Liz-contentWarp">
          <Row>
            <Col span={6}>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col span={24}>
                    <span className="s-text">Please enter your parameters.</span>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      {getFieldDecorator('data', {
                        rules: [{ required: true, message: 'Please input your data!' }],
                      })(
                        <TextArea />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isFetching}
                        className="submit-button"
                      >Submit</Button>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={18}>
              <div
                ref={(eChartBox) => { this.eChartBox = eChartBox; }}
                style={{
                  height: '500px',
                  width: '800px'
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WrappedPage = Form.create()(LineGardientPage);

export default WrappedPage;
