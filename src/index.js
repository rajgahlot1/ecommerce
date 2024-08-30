import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from "./Firebase"
// import RouteMain from './Routes';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <FirebaseProvider>
      <BrowserRouter>
        {/* <RouteMain /> */}
        <App/>
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>
);

