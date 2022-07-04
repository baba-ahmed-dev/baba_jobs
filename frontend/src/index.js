import React from 'react';
import {transitions, positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './components/store';
import App from './components/App';


const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
 
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <BrowserRouter><App /></BrowserRouter>  
    </Provider> 
  </AlertProvider>
);