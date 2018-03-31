import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Title from 'react-title-component';
import {IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {Layout, Menu, Icon} from 'antd';
import 'font-awesome/css/font-awesome.min.css';
import setUIElement from '../actions/base';

import './style.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const mapStateToProps = state => ({
  title: state.layout.title
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {setUIElement},
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class LayoutPagae extends Component {
  state = {
    collapsed: false,
    openKeys: ['line'],
  };

  componentWillMount() {
    console.log('init');
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if(this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  rootSubmenuKeys = ['line', 'bar', 'scatter'];
  render() {
    return (
      <Layout className="Liz-layout" style={{ minHeight: '100vh' }}>
        <Title render={this.props.title} />
        <Header className="header">
          Echarts
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu key="line" title={<span><Icon type="line-chart" /><span>Line</span></span>}>
                <Menu.Item key="1"><IndexLink to="/gradient">Line Gradient</IndexLink></Menu.Item>
                <Menu.Item key="2"><IndexLink to="/towvalueaxes">Tow Value-Axes</IndexLink></Menu.Item>
              </SubMenu>
              <SubMenu key="bar" title={<span><Icon type="bar-chart" /><span>Bar</span></span>}>
                <Menu.Item key="5"> <IndexLink to="/delay-animation">Delay Animation</IndexLink></Menu.Item>
                <Menu.Item key="6"> <IndexLink to="/stacked-histogram">Stacked Histogram</IndexLink></Menu.Item>
              </SubMenu>
              {/* <SubMenu key="scatter" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9"> <IndexLink to="/bar">Option 1</IndexLink></Menu.Item>
                <Menu.Item key="10"> <IndexLink to="/bar">Option 1</IndexLink></Menu.Item>
                <Menu.Item key="11"> <IndexLink to="/bar">Option 1</IndexLink></Menu.Item>
                <Menu.Item key="12"> <IndexLink to="/bar">Option 1</IndexLink></Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Layout className="Liz-content">
            <Content style={{ margin: '0 16px' }}>
              <Content>
                {this.props.children}
              </Content>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
