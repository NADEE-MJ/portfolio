import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Flip from './Flip';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Flip />
  </React.StrictMode>
);
