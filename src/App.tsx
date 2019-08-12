import { Layout, Menu } from "antd";
import 'antd/dist/antd.css';
import React from "react";
import "./App.scss";
import Breadcrumbs, { IBreadcrumb } from "./components/Breadcrumbs/Breadcrumbs";
import Issues from "./components/Issues/Issues";
import styled from "styled-components";
const { Header, Content } = Layout;

const StyledAppLayout = styled(Layout)`
  height: 100%;
`;

const StyledLogo = styled.div`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
`;

export default class App extends React.Component<any, any> {

  constructor(props: {}) {
    super(props);
    this.state = {
      breadcrumbs: breadcrumbs 
    }
  }

  render() {
    return (
      <StyledAppLayout id="testApp">
        <Header>
        <StyledLogo />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
            >
            <Menu.Item key="1">Oh Git!</Menu.Item>
            <Menu.Item key="2">Cheat Sheet</Menu.Item>
            <Menu.Item key="3">Playground</Menu.Item>
            <Menu.Item key="4">References</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumbs 
            breadcrumbs={this.state.breadcrumbs}
          />
          <Issues />
        </Content>
      </StyledAppLayout>
    );
  }
}

const breadcrumbs: IBreadcrumb[] = [
  {
    title: "Issues"
  },
  {
    title: "References"
  }
]
