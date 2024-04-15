import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { SearchProvider } from './context/SearchContex';
import './index.module.css';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SearchProvider>
  </React.StrictMode>
);
