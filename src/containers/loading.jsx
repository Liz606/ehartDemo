import React from 'react';
import {Spin, Icon} from 'antd';

export default function LoadingBar(props) {
  const antIcon = <Icon type="loading" style={{ fontSize: 34 }} />;
  return (
    <Spin indicator={antIcon} spinning={props.loading} size="large" />
  );
}
