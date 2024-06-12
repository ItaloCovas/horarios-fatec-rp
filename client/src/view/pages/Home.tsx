import { DialogProvider } from '../../context/DialogContext/DialogContext';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MainContentWrapper } from '../components/MainContentWrapper';

export function Home() {
  return (
    <DialogProvider>
      <Header />
      <MainContentWrapper />
      <Footer />
    </DialogProvider>
  );
}
