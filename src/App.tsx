import { AuthProvider } from './context/AuthContext/AuthContext';
import { Router } from './router/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
