import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { AdminSignIn } from '../components/AdminSignIn/AdminSignIn';
import { Classes } from '../components/Classes/Classes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminSignIn />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </BrowserRouter>
  );
}
