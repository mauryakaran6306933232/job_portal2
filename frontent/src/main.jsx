
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store, { persistor } from './redux/Store.js'; // <-- import persistor
import { PersistGate } from 'redux-persist/integration/react'; // <-- import PersistGate

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
