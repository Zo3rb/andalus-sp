import React, { Suspense } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppHeader from './components/AppHeader';
import AppRouter from './appRouter';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading ...">
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            }
          }}
        />
        <AppHeader />
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
