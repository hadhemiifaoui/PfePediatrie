import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LanguageConfig/i18n';
import { SocketProvider } from './Socket/socketContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <SocketProvider>
        <App />
    </SocketProvider>
  </React.StrictMode>
);

reportWebVitals();
