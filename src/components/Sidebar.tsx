'use client';

import { useDialog } from '../context/DialogContext/useDialog';
import { cn } from '../utils/cn';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: MenuProps) {
  const menuClass = isOpen ? 'translate-x-0' : 'translate-x-full';
  const { openDialog } = useDialog();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-[98] flex h-[100%] w-full flex-col bg-white/[0.98] delay-150 duration-200 ease-out dark:bg-[#252525]/[0.98] lg:hidden',
        menuClass,
      )}
    >
      <div className="flex items-center justify-end px-4">
        <button className="text-4xl" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="h-full p-4 pr-5 pt-2">
        <div className="flex flex-col gap-y-4 text-lg font-semibold">
          <ul className="gap-y-2 flex flex-col items-start">
            <a
              className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out"
              href="#about"
            >
              Por que usar?
            </a>
            <a
              className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out"
              href="https://github.com/ItaloCovas/horarios-fatec-rp"
              target="_blank"
            >
              Contribuir
            </a>
            <li>
              <button
                className="text-red-primary py-2 px-4 pl-2 rounded-xl tracking-wider text-xl font-bold hover:text-red-secondary"
                onClick={() => {
                  onClose();
                  openDialog();
                }}
              >
                ENTRAR
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
