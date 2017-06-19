import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// 引入nanyu-ui-lib组件库
import {Row, Col, Table, ChartBar, ChartPie, Message} from 'nanyu-ui-lib';

import fetch from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.css';

const mapStateToProps = state => ({
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
  componentWillMount() {
    const {limit} = this.props;

    this.props.setUIElement('layout', 'title', '异常');
    this.props.fetch('exception-table', {
      limit,
      pageId: '',
      offset: 0,
    });
    this.props.fetch('exception-histogram');
    this.props.fetch('exception-pie');
  }

  render() {
    const {table} = this.props;
    const columns = [
      {title: '备注', dataIndex: 'fremark', key: 'fremark'},
      {title: '故障状态', dataIndex: 'ffault_status', key: 'ffault_status'},
      {title: '工序计划', dataIndex: 'foperatio_nname', key: 'foperatio_nname'},
      {title: '跟踪号', dataIndex: 'ftrack_number', key: 'ftrack_number'},
      {title: '车节码', dataIndex: 'fproject_ch', key: 'fproject_ch'},
      {title: '工位', dataIndex: 'fgongwei', key: 'fgongwei'},
      {title: '故障类型', dataIndex: 'ffault_type_name', key: 'ffault_type_name'},
      {title: '原因描述', dataIndex: 'ffolat_note', key: 'ffolat_note'},
      {title: '报故障人', dataIndex: 'fault_creator_name', key: 'fault_creator_name'},
      {title: '故障处理人', dataIndex: 'fault_solver_name', key: 'fault_solver_name'},
      {title: '故障暂停时间', dataIndex: 'fault_create_time', key: 'fault_create_time'},
      {title: '故障处理时间', dataIndex: 'fault_solver_time', key: 'fault_solver_time'},
    ];

    const timeset = ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06'];
    const dataTotal = [44, 65, 76, 44, 32, 89];
    const dataSub = [10, 23, 33, 44, 12, 88].map((item, index) => ({
      value: item,
      itemStyle: {
        normal: {
          color: item === dataTotal[index] ? '#4cbc74' : '#fe9b35',
        },
      },
      label: {
        normal: {
          show: item !== dataTotal[index],
        },
      }
    }));

    return (
      <div className="demo-exception">
        <Row gutter={15}>
          <Col md={24}>
            <div className="inner" style={{padding: 0, height: '300px', overflow: 'auto'}}>
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
                dataset={[
                  {name: '小学生', value: 50},
                  {name: '初中生', value: 150},
                  {name: '高中生', value: 330},
                  {name: '大学生', value: 10},
                  {name: '硕士生', value: 43},
                  {name: '博士生', value: 51},
                ]}
                onSelectChanged={legend => Message.info(`${legend} has been selected.`)}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
