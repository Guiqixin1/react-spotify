import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'reset-css';
import './style/global.scss';

// 引入仓库
import { Provider } from 'react-redux';
import store from '@/store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
