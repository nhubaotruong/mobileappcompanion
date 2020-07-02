import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './src/App.jsx';
import { Provider } from 'react-redux';
import store from './src/redux';
import $ from 'jquery';

window.$ = $;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

