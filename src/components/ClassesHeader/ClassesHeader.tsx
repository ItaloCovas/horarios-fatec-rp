import { Logo } from '../Logo';
import { LogoutIcon } from '../icons/LogoutIcon';
import { AvatarDropdown } from '../AvatarDropdown';
import { useNavigate } from 'react-router-dom';

export function ClassesHeader() {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between py-8 px-10 pr-4 md:pr-10 md:px-20 text-xl border-b-[1px] border-gray-300">
      <Logo />
      <nav className="flex items-center">
        <ul className="gap-x-6 flex items-center">
          <AvatarDropdown />
          <LogoutIcon
            className="hidden md:block cursor-pointer"
            onClick={() => {
              // TODO: lógica de Logout
              navigate('/', { replace: true });
            }}
          />
        </ul>
      </nav>
    </header>
  );
}
