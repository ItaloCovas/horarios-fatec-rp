import { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Logo } from '../Logo';
import { LogoutIcon } from '../icons/LogoutIcon';
import { AvatarDropdown } from '../AvatarDropdown';

export function ClassesHeader() {
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
        <ul className="gap-x-6 flex items-center">
          <AvatarDropdown />
          <LogoutIcon className="hidden md:block cursor-pointer" />
        </ul>
      </nav>
    </header>
  );
}
