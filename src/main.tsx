import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Tooltip
      id="tooltip"
      style={{ backgroundColor: '#163c4d', color: 'white' }}
      offset={6}
    />
  </React.StrictMode>
);
