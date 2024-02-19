import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>

    <App />
  </Provider>
);


