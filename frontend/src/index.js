import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {positions, transitions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import App from './App';
import store from './store';

const options = {
  timeout:6000,
  positions: positions.MIDDLE,
  transition: transitions.FADE
}


ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} >
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

