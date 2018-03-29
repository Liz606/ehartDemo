import React, {Component} from 'react';
import ErrorImg from './assets/images/building.png';

import './style.less';

export default class NotFindPage extends Component {
  componentWillMount() {
    clearInterval();
  }
  handleToHome = () => {
    window.location.href = '/';
  }
  render() {
    return (
      <div className="no-page">
        <div className="img-box">
          <img alt="not found" src={ErrorImg} />
        </div>
      </div>
    );
  }
}
