import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UserInformation from '../components/user';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
  static defaultProps = {}

  render() {
    return (
      <div>
        <UserInformation
          username="李达康"
          gender="男"
          company="汉东省省委常委"
        />

        <hr />
        <h3>调用远程资源：</h3>

      </div>
    );
  }
}
