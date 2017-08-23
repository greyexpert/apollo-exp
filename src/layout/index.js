import ThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserList from 'components/UserList';

export default () => (
  <ThemeProvider>
    <div className="layout">
      <UserList />
    </div>
  </ThemeProvider>
);