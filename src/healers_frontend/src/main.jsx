import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Overview from '../components/Overview';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Overview/> */}
  </React.StrictMode>,
);
