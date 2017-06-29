import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col, Spin, Table,
  ChartPie, ChartLine, CRRCProgress} from 'nanyu-ui-lib';

import {fetch} from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.css';

const mapStateToProps = state => ({
  donut: state.material.donut,
  line: state.material.line,
  histogram: state.material.histogram,
  inTableFetching: state.material.inTableFetching,
  table: state.material.table,
  limit: state.material.limit,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {fetch, setUIElement},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class MaterialPage extends Component {
  componentWillMount() {
    const {limit} = this.props;

    this.props.setUIElement('layout', 'title', '物料');

    this.props.fetch('material-donut');
    this.props.fetch('material-stack', {
      upper: '2017-04-01',
      lower: '2017-03-15',
      fbasestatus: '[5,11,13,14,15,20,21,22,23,26,24]',
      fissuemode: '11010',
    }, 'material-line');
    this.props.fetch('material-list', {}, 'material-histogram');
    this.props.fetch('material-table', {
      limit,
      pageId: '',
      offset: 0,
    });
  }

  render() {
    const {donut, line, histogram, inTableFetching, table} = this.props;

    const timeset1 = line.x || [];
    const dataset = line.y ? line.y['物料配送即时率'] : [];
    const timeset = timeset1.map(item => {
      const time = new Date(item.replace(/-/gi, '/'));
      const date = new Date(time);

      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const columns = [
      {title: '备注', dataIndex: 'fremark', key: 'fremark'},
      {title: '工序名称', dataIndex: 'foperationname', key: 'foperationname'},
      {title: '跟踪号', dataIndex: 'ftracknumber', key: 'ftracknumber'},
      {title: '车节码', dataIndex: 'fprojectjch', key: 'fprojectjch'},
      {title: '关键物流名称', dataIndex: 'fmaterialname', key: 'fmaterialname'},
      {title: '流程', dataIndex: 'fflow', key: 'fflow'},
      {title: '库房', dataIndex: 'fwarehousename', key: 'fwarehousename'},
      {title: '需求数量', dataIndex: 'fqty', key: 'fqty'},
      {title: '库存数量', dataIndex: 'finvQty', key: 'finvQty'},
      {title: '单位', dataIndex: 'funitname', key: 'funitname'},
      {title: '开工时间', dataIndex: 'fopendate', key: 'fopendate'},
      {title: '工位', dataIndex: 'fgongwei', key: 'fgongwei'},
    ];

    return (
      <div className="demo-material">
        <Row gutter={15}>
          <Col md={8}>
            <div className="inner s1" style={{height: '200px'}}>
              <div className="chart">
                <ChartPie
                  dataset={[
                    {name: '关键物料缺料数量', value: donut['关键物料缺料数量']},
                    {name: '紧固件缺料数量', value: donut['紧固件缺料数量']}
                  ]}
                  showLabel={false}
                />
                <div className="center-show">
                  <p>{donut['关键物料缺料数量'] + donut['紧固件缺料数量']}</p>
                </div>
              </div>
              <div className="legend">
                <p><b className="c1" />关键物料<span className="pt">{Math.round((100 * donut['关键物料缺料数量']) / (donut['关键物料缺料数量'] + donut['紧固件缺料数量']))}%</span><span>{donut['关键物料缺料数量']}</span></p>
                <p><b className="c2" />紧固缺料<span className="pt">{Math.round((100 * donut['紧固件缺料数量']) / (donut['关键物料缺料数量'] + donut['紧固件缺料数量']))}%</span><span>{donut['紧固件缺料数量']}</span></p>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="inner" style={{height: '200px'}}>
              <ChartLine
                width="100%"
                height="100%"
                timeset={timeset}
                dataset={dataset}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="inner" style={{height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <div style={{marginBottom: '30px'}}>
                <CRRCProgress
                  backgroundColor="#51bb76"
                  finishedWords="已领料出库"
                  finished={histogram['已领料出库数量']}
                  totalWords="今日全车用料"
                  total={histogram['全车用料数量']}
                  unit="件"
                />
              </div>
              <div>
                <CRRCProgress
                  backgroundColor="#4883f3"
                  finishedWords="今日已领到JIT"
                  finished={histogram['JIT已到数量']}
                  totalWords="今日需"
                  total={histogram['JIT件数量']}
                  unit="件"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <div className="inner" style={{padding: 0, height: '360px', overflow: 'auto'}}>
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
      </div>
    );
  }
}
