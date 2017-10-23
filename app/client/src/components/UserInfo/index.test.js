import React from 'react';
import ReactDOM from 'react-dom';
import UserInfo from './';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

it('renders without crashing', () => {
  const div = document.createElement('div');
  
  const props = {
    user:{
      rol: 'TEST',
      email: 'test@test.com'
    },
    handlerLogout: function(){
      console.log('logout')
      return 
    }
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <UserInfo {...props} />
    </MuiThemeProvider>, div);
});