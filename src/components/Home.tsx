import { DialogProvider } from '../context/DialogContext/DialogContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { MainContentWrapper } from './MainContentWrapper';

export function Home() {
  return (
    <DialogProvider>
      <Header />
      <MainContentWrapper />
      <Footer />
    </DialogProvider>
  );
}
