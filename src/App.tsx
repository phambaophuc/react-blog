import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AuthModal from './components/auth';
import { AuthModalProvider } from './libs/context';
import { AuthProvider } from './libs/providers';
import AppRoutes from './routes/AppRoutes';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthModalProvider>
          <BrowserRouter>
            <AppRoutes />
            <AuthModal />
          </BrowserRouter>
        </AuthModalProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
