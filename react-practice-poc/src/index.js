import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = "182571820195-74n7nc81s803261nnb5gd6kkiojfpmnh.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId={clientId}>  
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
