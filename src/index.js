import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <div className="">
    <div className="row">
    <div className="col d-none d-md-block d-sm-none"></div>
    <div className="col border border-primary app-content">
<Auth0Provider
    domain="dev-3n1an7ikmu2td1ug.us.auth0.com"
    clientId="PYRKjBrDqPGz9DYyCuYj9h3ISNnrOnKS"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  > 
      <App />
</Auth0Provider>

    </div>
    <div className="col d-none d-md-block d-sm-none"></div>
    </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
