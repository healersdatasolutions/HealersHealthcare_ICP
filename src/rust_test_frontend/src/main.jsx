import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import HomePage from './Homepage';
import EHR from '../app/ehr/page';
import Patient from '../app/patient/[id]/page';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <HomePage /> */}
    {/* <EHR/> */}
    <App/>
    {/* <Patient /> */}
  </React.StrictMode>,
);
