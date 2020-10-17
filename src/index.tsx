import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

// Ensure there is a div#root for React
if (!document.getElementById('root')) {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
