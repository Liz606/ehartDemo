import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 引入actions中的方法
import {fetch} from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.css';

const mapStateToProps = state => ({
  massages: state.massages
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {fetch, setUIElement},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class ExceptionPage extends Component {
  // 组件即将渲染时触发的事件
  componentWillMount() {
    this.props.setUIElement('layout', 'title', 'Charts');
  }

  // 渲染
  render() {
    return (
      <div className="demo">
        xxxxxxxxxx
      </div>
    );
  }
}
