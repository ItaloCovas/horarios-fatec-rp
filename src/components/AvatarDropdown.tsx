import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { useNavigate } from 'react-router-dom';

export function AvatarDropdown() {
  const navigate = useNavigate();

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className="bg-[#F9F9F9] rounded-full flex items-center justify-center cursor-pointer border-[2px]  h-[45px] w-[45px]">
          <UserIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] "
          sideOffset={5}
          side="bottom"
          align="end"
        >
          <DropdownMenu.Item className="group text-sm font-bold leading-none flex items-center pl-[5px] h-[25px] select-none outline-none data-[disabled]:pointer-events-none1">
            Ítalo Garcia Covas
          </DropdownMenu.Item>

          <DropdownMenu.Item className="group text-sm font-bold leading-none flex items-center pl-[5px] h-[25px] select-none outline-none data-[disabled]:pointer-events-none1">
            5º Semestre
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-sm font-bold leading-none flex items-center pl-[5px] h-[25px] select-none outline-none data-[disabled]:pointer-events-none1">
            <strong className="mr-1">RA:</strong>2840482123016
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-[1px] bg-mauve11 m-[5px] md:hidden" />

          <DropdownMenu.Label className="flex justify-end p-2 md:hidden">
            <LogoutIcon
              className="cursor-pointer"
              onClick={() => {
                // TODO: lógica de Logout
                navigate('/', { replace: true });
              }}
            />
          </DropdownMenu.Label>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
