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
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }
  focus() {
    console.log(this.textInput);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
