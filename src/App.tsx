import React from 'react';

import { store } from '@store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './providers/AuthProvider';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

export default App;
