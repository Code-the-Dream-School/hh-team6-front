import { BrowserRouter } from 'react-router-dom';

import { AccountProvider } from './context/AccountProvider';
import { AuthProvider } from './context/AuthProvider';
import MainLayout from './layouts/MainLayout';
import Router from './routes/Router';

function App() {
  return (
    <div className="flex min-h-screen min-w-[320px] flex-col">
      <AccountProvider>
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
      </AccountProvider>
    </div>
  );
}

export default App;
