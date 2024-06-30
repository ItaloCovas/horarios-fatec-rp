import { FaFileDownload } from 'react-icons/fa';
import { useSpreadsheetButton } from './useSpreadsheetButton';

export function SpreadsheetButton() {
  const { loadSpreedsheet } = useSpreadsheetButton();

  return (
    <button
      className="bg-red-primary h-[50px] w-[50px] rounded-full absolute bottom-2 right-2 flex justify-center items-center hover:bg-red-700 transition-all ease-in-out duration-150"
      onClick={loadSpreedsheet}
    >
      <FaFileDownload className="text-white h-5" />
    </button>
  );
}
