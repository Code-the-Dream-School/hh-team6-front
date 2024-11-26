import React from 'react';
import Router from './routes/Router';
import { AuthProvider } from './context/AuthProvider';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="flex min-h-screen min-w-[320px] flex-col">
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <MainLayout>
            <Router />
          </MainLayout>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
