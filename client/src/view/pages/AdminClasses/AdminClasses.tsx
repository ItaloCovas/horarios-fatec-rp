import { Controller } from 'react-hook-form';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { useAdminClasses } from './useAdminClasses';
import { Input } from '../../components/Input';

export function AdminClasses() {
  const { control, errors, handleSubmit, filename, setFilename } =
    useAdminClasses();

  return (
    <main>
      <AdminHeader />
      <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box flex flex-col items-center">
        <div className="flex justify-center w-[80vw] sm:max-w-lg rounded-full">
          <div className="flex flex-col items-center justify-center w-full h-auto my-20 mb-8 bg-white pb-8 sm:w-3/4 rounded-lg sm:shadow-xl">
            <div className="mt-10 mb-10 text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Carregue a planilha
              </h2>
              <p className="text-sm text-gray-500">
                O arquivo deve ter o formato .xls ou .xlsx
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative w-4/5 h-32 max-w-xs mb-14  bg-gray-100 rounded-lg shadow-inner"
            >
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    error={errors.file?.message as string}
                    onChange={(event) => {
                      console.log(event, 'evnt');
                      if (
                        event.target &&
                        event.target.files &&
                        event.target.files.length > 0
                      ) {
                        setFilename(event.target.files[0].name);
                        field.onChange(event.target.files[0]);
                      }
                    }}
                  />
                )}
              />
              <label
                htmlFor="file-upload"
                className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
              >
                <p className="z-10 text-sm font-semibold text-center text-gray-500">
                  {filename ? '' : 'Se preferir, clique'}
                </p>
                <p className="z-10 text-sm font-semibold text-center text-gray-500">
                  {filename ? filename : 'Arraste e solte seus arquivos aqui'}
                </p>

                <svg
                  className="z-10 w-8 h-8 text-red-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                </svg>
              </label>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-red-primary text-white w-4/5 py-2 mt-3 px-10 rounded-2xl text-lg font-bold hover:bg-red-secondary ease-in-out  duration-200"
                  onClick={() => {}}
                >
                  CARREGAR
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center"></div>
      </div>
    </main>
  );
}
