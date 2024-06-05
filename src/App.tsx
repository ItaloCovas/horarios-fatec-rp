import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainContentWrapper } from './components/MainContentWrapper';
import { DialogProvider } from './context/DialogContext/DialogContext';

function App() {
  return (
    <DialogProvider>
      <Header />
      <MainContentWrapper />
      <Footer />
    </DialogProvider>
  );
}

export default App;
