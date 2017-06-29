import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// 引入nanyu-ui-lib组件库
import {Row, Col, Table, Spin,
  ChartBar, ChartPie, Message} from 'nanyu-ui-lib';

// 引入actions中的方法
import {fetch, refactorChartData} from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.css';

/**
 * store树的元素绑定到组件的props属性中去
 */
const mapStateToProps = state => ({
  inTableFetching: state.exception.inTableFetching,
  table: state.exception.table,
  limit: state.exception.limit,
  histogram: state.exception.histogram,
  pie: state.exception.pie,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {fetch, setUIElement},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class ExceptionPage extends Component {
  // 组件即将渲染时触发的事件
  componentWillMount() {
    const {limit} = this.props;

    this.props.setUIElement('layout', 'title', '异常');

    this.props.fetch('exception-table', {
      limit,
      pageId: '',
      offset: 0,
    });
    this.props.fetch('exception-stack');
    this.props.fetch('exception-donut');
  }

  // 渲染
  render() {
    const {inTableFetching, table, histogram, pie} = this.props;

    const columns = [
      {title: '备注', dataIndex: 'fremark', key: 'fremark'},
      {title: '故障状态', dataIndex: 'ffaultstatus', key: 'ffaultstatus'},
      {title: '工序计划', dataIndex: 'foperationname', key: 'foperationname'},
      {title: '跟踪号', dataIndex: 'ftracknumber', key: 'ftracknumber'},
      {title: '车节码', dataIndex: 'fprojectjch', key: 'fprojectjch'},
      {title: '工位', dataIndex: 'fgongwei', key: 'fgongwei'},
      {title: '故障类型', dataIndex: 'ffaulttypename', key: 'ffaulttypename'},
      {title: '原因描述', dataIndex: 'ffolatnote', key: 'ffolatnote'},
      {title: '报故障人', dataIndex: 'faultcreatorname', key: 'faultcreatorname'},
      {title: '故障处理人', dataIndex: 'faultsolvername', key: 'faultsolvername'},
      {title: '故障暂停时间', dataIndex: 'faultcreatetime', key: 'faultcreatetime'},
      {title: '故障处理时间', dataIndex: 'faultsolvertime', key: 'faultsolvertime'},
    ];
    const {data} = refactorChartData(pie);

    const timeset = histogram.x || [];
    const dataSub = [];
    const data1Origin = histogram.y ? histogram.y['解决数'] : [];
    const dataTotal = histogram.y ? histogram.y['故障数'] : [];

    data1Origin.forEach((item, index) => {
      const fallCount = dataTotal[index];

      dataSub.push({
        value: item,
        itemStyle: {
          normal: {
            color: fallCount === item ? '#4cbc74' : '#fe9b35',
          },
        },
        label: {
          normal: {
            show: fallCount !== item,
          },
        }
      });
    });

    return (
      <div className="demo-exception">
        <Row gutter={15}>
          <Col md={24}>
            <div className="inner" style={{padding: 0, height: '300px', overflow: 'auto'}}>
              <Spin spinning={inTableFetching} />
              <Table
                className="custom-table"
                size="small"
                pagination={false}
                columns={columns}
                dataSource={table}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col md={12}>
            <div className="inner" style={{height: '240px'}}>
              <ChartBar
                width="100%"
                height="100%"
                timeset={timeset}
                dataset={[
                  dataSub,
                  dataTotal
                ]}
                onBarClicked={() => Message.info('chart bar clicked.')}
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="inner" style={{height: '240px'}}>
              <ChartPie
                width="100%"
                height="100%"
                dataset={data}
                onSelectChanged={legend => Message.info(`${legend} has been selected.`)}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
