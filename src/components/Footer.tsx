import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="flex flex-col gap-y-8 md:flex-row items-center justify-between py-8 px-10 pr-4 md:pr-10 md:px-20 text-xl border-t-[1px] border-gray-300">
      <Logo />
      <nav className="flex items-center flex-col lg:flex-row">
        {/* <IoIosMenu className="md:hidden h-10 w-10 text-red-primary cursor-pointer" /> */}

        <ul className="flex gap-2 flex-col md:flex-row items-center text-center">
          <a
            className="p-2 cursor-pointer  hover:bg-gray-200 rounded-xl transition-all duration-150 ease-in-out"
            href="http://www.fatecrp.edu.br/"
            target="_blank"
          >
            FATEC
          </a>
          <li>
            <button className="text-red-primary py-2 px-4 rounded-xl tracking-wider text-xl font-bold hover:text-red-secondary">
              Contate-nos
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
