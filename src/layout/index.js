import { Component } from 'react';
import styled from 'styled-components';
import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import MessageList from 'components/MessageList';
import SubscriptionTest from 'components/SubscriptionTest';
import Sidebar from 'components/Sidebar';

const Container = styled.div`
  
`;

export default class Layout extends Component {
  state = {
    drawer: {
      opened: false,
    }
  };

  toggleDrawer(opened) {
    this.setState({
      drawer: {
        opened: opened === undefined ? !this.state.drawer.opened : opened,
      }
    });
  }

  render() {


    return (
      <ThemeProvider>
        <Container className="layout">
          <AppBar
            title="Users"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={() => this.toggleDrawer()}
          />

          <Drawer
            open={this.state.drawer.opened}
            docked={false}
            width="80%"
            onRequestChange={(open) => this.toggleDrawer(open)}
          >
            <Sidebar />
          </Drawer>

          <MessageList />
        </Container>
      </ThemeProvider>
    );
  }
}
