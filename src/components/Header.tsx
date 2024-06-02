import { IoIosMenu } from 'react-icons/io';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="flex items-center justify-between py-8 px-10 pr-4 md:pr-10 md:px-20 text-xl border-b-[1px] border-gray-300">
      <Logo />
      <nav className="flex items-center">
        <IoIosMenu className="md:hidden h-10 w-10 text-red-primary cursor-pointer" />

        <ul className="gap-x-6 hidden md:flex items-center">
          <a
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out"
            href="#about"
          >
            Por que usar?
          </a>
          <a
            className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out"
            href="https://github.com/ItaloCovas/horarios-fatec-rp"
          >
            Contribuir
          </a>
          <li>
            <button className="text-red-primary py-2 px-4 rounded-xl tracking-wider text-xl font-bold hover:text-red-secondary">
              ENTRAR
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
