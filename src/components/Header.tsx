import { IoIosMenu } from 'react-icons/io';

import logo from '../assets/img/logo.png';

export function Header() {
  return (
    <header className="flex items-center justify-between py-10 px-10 md:px-20 text-xl border-b-[1px] border-gray-300">
      <img src={logo} alt="Fatec Ribeirão Preto Logo" />
      <nav className="flex items-center">
        <IoIosMenu className="md:hidden h-10 w-10 text-red-primary" />

        <ul className="gap-x-2 hidden md:flex items-center">
          <li className="py-2 px-6 cursor-pointer border-gray-300 border bg-white hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out">
            Por que usar?
          </li>
          <li className="py-2 px-6 cursor-pointer border-gray-300 border bg-white hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out">
            Contribuir
          </li>
          <li>
            <button className="bg-red-primary text-white py-2 px-6 rounded-xl tracking-wider text-xl font-bold hover:bg-red-secondary">
              ENTRAR
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
