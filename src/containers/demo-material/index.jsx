import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Row, Col} from 'nanyu-ui-lib';

import fetch from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.css';

const mapStateToProps = state => ({
  donut: state.material.donut,
  table: state.material.table,
  limit: state.material.limit,
  line: state.material.line,
  histogram: state.material.histogram,
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

    this.props.fetch('logistics-donut');
    this.props.fetch('logistics-line');
    this.props.fetch('logistics-histogram');
    this.props.fetch('logistics-table', {
      limit,
      pageId: '',
      offset: 0,
    });
  }

  render() {
    return (
      <div className="demo-material">
        <Row gutter={15}>
          <Col md={8}>
            <div className="inner" style={{height: '200px', overflow: 'auto'}}>
              aa
            </div>
          </Col>
          <Col md={8}>
            <div className="inner" style={{height: '200px', overflow: 'auto'}}>
              bb
            </div>
          </Col>
          <Col md={8}>
            <div className="inner" style={{height: '200px', overflow: 'auto'}}>
              cc
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <div className="inner" style={{height: '300px', overflow: 'auto'}}>
              aa
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
