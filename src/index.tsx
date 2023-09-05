import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);