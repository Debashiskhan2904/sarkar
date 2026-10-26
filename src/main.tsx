import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/custom.css';

// Ensure zero data is ever stored in localStorage
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear();
  }
} catch {
  // Ignore storage access restrictions if any
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
