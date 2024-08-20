import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from "./Firebase"
// import RouteMain from './Routes';
import { store } from './Store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <FirebaseProvider>
      <BrowserRouter>
        {/* <RouteMain /> */}
        <App/>
      </BrowserRouter>
    </FirebaseProvider></Provider>
  </React.StrictMode>
);

