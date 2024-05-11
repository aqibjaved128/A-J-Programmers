import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import {Provider as AlertProvider, transitions , positions} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
    transition: transitions.FADE,
    position: positions.BOTTOM_CENTER,
    timeout:5000

}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
         <Provider store={store}>
        <AlertProvider {...options} template={AlertTemplate} >
        <App />
        </AlertProvider>
        </Provider>


);