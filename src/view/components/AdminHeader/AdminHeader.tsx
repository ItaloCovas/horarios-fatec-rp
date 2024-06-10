import { useAuth } from '../../../context/AuthContext/useAuth';
import { Logo } from '../Logo';
import { LogoutIcon } from '../icons/LogoutIcon';

export function AdminHeader() {
  const { signOut } = useAuth();

  return (
    <header className="flex items-center justify-between py-8 px-10 pr-4 md:pr-10 md:px-20 text-xl border-b-[1px] border-gray-300">
      <Logo />
      <nav className="flex items-center">
        <ul className="gap-x-6 flex items-center">
          <LogoutIcon className="cursor-pointer" onClick={signOut} />
        </ul>
      </nav>
    </header>
  );
}
