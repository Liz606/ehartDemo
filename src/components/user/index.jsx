import React from 'react';

import './style.scss';

export default function UserInformation(props) {
  const {username, gender, company} = props;

  return (
    <div className="app">
      <div className="app-header">
        <p>姓名：{username}</p>
        <p>性别：{gender}</p>
        <p>公司：{company}</p>
      </div>
    </div>
  );
}
