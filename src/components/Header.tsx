import { IoIosMenu } from 'react-icons/io';
import { FcAlarmClock } from 'react-icons/fc';

export function Header() {
  return (
    <header className="flex items-center justify-between py-10 px-10 pr-4 md:pr-10 md:px-20 text-xl border-b-[1px] border-gray-300">
      <div className="flex items-center">
        <FcAlarmClock className="w-10 h-10" />
        <div className="mx-2 h-8 w-[2px] bg-gray-700"></div>
        <span className="text-md font-bold text-gray-700">
          {' '}
          Horários FATEC RP
        </span>
      </div>
      <nav className="flex items-center">
        <IoIosMenu className="md:hidden h-10 w-10 text-red-primary" />

        <ul className="gap-x-6 hidden md:flex items-center">
          <li className="p-2 cursor-pointer  bg-white hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out">
            Por que usar?
          </li>
          <li className="p-2 cursor-pointer  bg-white hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out">
            Contribuir
          </li>
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
