import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface StudentInfo {
  nomeAluno: string;
  ra: string;
  semestre: string;
}

export function AvatarDropdown() {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('hrftcrp:udcls');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      if (parsedData && parsedData.estudante) {
        setStudentInfo(parsedData.estudante);
      }
    }
  }, []);

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <div className="bg-[#F9F9F9] rounded-full flex items-center justify-center cursor-pointer border-[2px] h-[45px] w-[45px]">
          <UserIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          sideOffset={5}
          side="bottom"
          align="end"
        >
          {studentInfo && (
            <>
              <DropdownMenu.Item className="group text-sm font-bold leading-none flex items-center pl-[5px] h-[25px] select-none outline-none data-[disabled]:pointer-events-none">
                {studentInfo.nomeAluno}
              </DropdownMenu.Item>

              <DropdownMenu.Item className="group text-sm font-bold leading-none flex items-center pl-[5px] h-[25px] select-none outline-none data-[disabled]:pointer-events-none">
                {studentInfo.semestre}
              </DropdownMenu.Item>

              <DropdownMenu.Item className="group text-sm font-bold leading-none flex items-center pl-[5px] h-[25px] select-none outline-none data-[disabled]:pointer-events-none">
                <strong className="mr-1">RA:</strong>
                {studentInfo.ra}
              </DropdownMenu.Item>
            </>
          )}

          <DropdownMenu.Separator className="h-[1px] bg-mauve11 m-[5px] md:hidden" />

          <DropdownMenu.Label className="flex justify-end p-2 md:hidden">
            <LogoutIcon
              className="cursor-pointer"
              onClick={() => {
                // TODO: lógica de Logout
                localStorage.clear(); // Clear the local storage on logout
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
