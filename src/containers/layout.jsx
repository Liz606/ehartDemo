/**
 * 在文件头部引入页面需要的组件
 * 绝对引用的要放在想对引用的前面
 * 注意代码书写语法格式
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {Layout, Menu} from 'nanyu-ui-lib';

import 'nanyu-ui-lib/dist/style.css';
import './style.less';

const {Header, Content, Sider} = Layout;

const mapStateToProps = state => ({
  title: state.layout.title,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class LayoutPagae extends Component {
  componentWillMount() {
    console.log('life circle of will-mount');
  }

  render() {
    // 从store树里取值
    const {title} = this.props;

    return (
      <Layout className="demo-layout">
        {
          /*
           * 调用Layout组件，传递className属性，自定义组件样式
           */
        }
        <Sider className="demo-sider">
          {
            /*
             * 可以插入LOGO图片，比如：<img src="logo.png" />
             */
          }
          <div className="logo">NANYU UI DEMO</div>

          {
            /*
             * 左侧菜单布局，调用Menu组件
             */
          }
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <IndexLink
              to="/"
              className="ant-menu-item"
              activeClassName="ant-menu-item-selected"
            >
              异常
            </IndexLink>
            <Link
              to="/material"
              className="ant-menu-item"
              activeClassName="ant-menu-item-selected"
            >
              物料
            </Link>
          </Menu>
        </Sider>
        <Layout className="demo-layout2">
          <Header className="demo-header">{title}</Header>
          <Content className="demo-content">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
