import { FaFileDownload } from 'react-icons/fa';
import { ButtonHTMLAttributes } from 'react';
import { Spinner } from '../Spinner';

interface SpreadsheetButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export function SpreadsheetButton(props: SpreadsheetButtonProps) {
  return (
    <button
      className="bg-red-primary h-[50px] w-[50px] rounded-full absolute bottom-2 right-2 flex justify-center items-center hover:bg-red-700 transition-all ease-in-out duration-150"
      {...props}
    >
      {props.loading ? (
        <Spinner className="w-6 h-6" />
      ) : (
        <FaFileDownload className="text-white h-5" />
      )}
    </button>
  );
}
