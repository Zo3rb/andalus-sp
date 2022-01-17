import React, { Suspense } from "react";
import { BrowserRouter } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import AppRouter from './appRouter';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading ...">
        <AppHeader />
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
