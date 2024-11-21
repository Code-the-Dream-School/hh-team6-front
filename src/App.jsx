import React from 'react';
import Router from './routes/Router';
import { AuthProvider } from './context/AuthProvider';
import MainLayout from './layouts/MainLayout';
import Footer from "./layouts/Footer";

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <Router />
      </MainLayout>
    </AuthProvider>
  );
}

export default App;