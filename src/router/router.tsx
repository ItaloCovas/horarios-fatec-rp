import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DialogProvider } from '../context/DialogContext/DialogContext';
import { Home } from '../view/pages/Home';
import { AdminSignIn } from '../view/pages/AdminSignIn/AdminSignIn';
import { Classes } from '../view/pages/Classes/Classes';
import { PrivateRoute } from './PrivateRoute';
import { AdminClasses } from '../view/pages/AdminClasses/AdminClasses';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute isPrivate={false} />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminSignIn />} />
        </Route>

        <Route element={<PrivateRoute isPrivate={false} />}>
          <Route path="/admin/classes" element={<AdminClasses />} />
        </Route>
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
