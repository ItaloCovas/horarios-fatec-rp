import { IoIosMenu } from 'react-icons/io';
import { Logo } from './Logo';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SignInDialog } from './SignInDialog/SignInDialog';
import { useDialog } from '../context/DialogContext/useDialog';

export function Header() {
  const { closeDialog, open, openDialog } = useDialog();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  function handleOpen() {
    setSidebarOpen(true);
  }

  function handleClose() {
    setSidebarOpen(false);
  }
  return (
    <header className="flex items-center justify-between py-8 px-10 pr-4 md:pr-10 md:px-20 text-xl border-b-[1px] border-gray-300">
      <Sidebar isOpen={sidebarOpen} onClose={handleClose} />
      <Logo />
      <nav className="flex items-center">
        <IoIosMenu
          className="md:hidden h-10 w-10 text-red-primary cursor-pointer"
          onClick={handleOpen}
        />

        <ul className="gap-x-6 hidden md:flex items-center">
          <a
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out focus-visible:outline-none"
            href="#about"
          >
            Por que usar?
          </a>
          <a
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out focus-visible:outline-none"
            href="https://github.com/ItaloCovas/horarios-fatec-rp"
            target="_blank"
          >
            Contribuir
          </a>
          <li>
            <button
              onClick={openDialog}
              className="text-red-primary py-2 px-4 rounded-xl tracking-wider text-xl font-bold hover:text-red-secondary focus-visible:outline-none"
            >
              ENTRAR
            </button>
          </li>
        </ul>
      </nav>
      <SignInDialog
        open={open}
        openDialog={openDialog}
        closeDialog={closeDialog}
      />
    </header>
  );
}
