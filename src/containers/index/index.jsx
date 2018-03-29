import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
export default class MaterialPage extends Component {
  componentWillMount() {
    this.props.setUIElement('layout', 'title', '物料');
  }

  render() {
    return (
      <div className="demo">
        首页留白~
      </div>
    );
  }
}
