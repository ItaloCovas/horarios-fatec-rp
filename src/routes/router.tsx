import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DialogProvider } from '../context/DialogContext/DialogContext';
import { Home } from '../view/pages/Home';
import { AdminSignIn } from '../view/pages/AdminSignIn/AdminSignIn';
import { Classes } from '../view/pages/Classes/Classes';
import { AdminDashboard } from '../view/pages/AdminDashboard/AdminDashboard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminSignIn />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/classes"
          element={
            <DialogProvider>
              <Classes />
            </DialogProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
