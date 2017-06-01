import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UserInformation from '../../components/user';
import getComments from '../../actions/api';
import {commentSelector} from '../../selector/comment';

import './style.less';

const mapStateToProps = state => ({
  comments: commentSelector(state),
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {getComments},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
  static defaultProps = {}

  componentWillMount() {
    this.props.getComments();
  }

  render() {
    const {comments} = this.props;

    return (
      <div>
        <UserInformation
          username="李达康"
          gender="男"
          company="汉东省省委常委"
        />

        <hr />
        <div className="api-demo">
          <h3>调用远程资源：</h3>
          <ul>
            {
              comments.map(comment => (
                <li key={`CT-${comment.id}`}>
                  <p>{comment.nickName}</p>
                  <p>{comment.md}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
