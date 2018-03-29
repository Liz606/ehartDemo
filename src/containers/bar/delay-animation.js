import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 引入actions中的方法
import {fetch} from '../../actions/api';
import setUIElement from '../../actions/base';

import './style.less';

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
    this.props.setUIElement('layout', 'title', 'Bar');
  }

  // 渲染
  render() {
    return (
      <div className="demo">
        bar-animation
      </div>
    );
  }
}
