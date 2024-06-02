import { FcAlarmClock } from 'react-icons/fc';

export function Logo() {
  return (
    <div className="flex items-center">
      <FcAlarmClock className="w-10 h-10" />
      <div className="mx-2 h-8 w-[2px] bg-gray-700"></div>
      <span className="text-md font-bold text-gray-700">
        {' '}
        Horários FATEC RP
      </span>
    </div>
  );
}
