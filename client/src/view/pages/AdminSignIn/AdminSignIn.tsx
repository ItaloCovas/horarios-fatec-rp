import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { Spinner } from '../../components/Spinner';
import { useAdminSignIn } from './useAdminSignIn';

export function AdminSignIn() {
  const { errors, register, handleSubmit, isLoading } = useAdminSignIn();

  return (
    <main className="bg-[#F9F9F9] h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-[90vw] md:w-[50vw] h-[350px] max-w-[450px] rounded-[6px] p-[25px] flex flex-col justify-between shadow-2xl">
        <div className="flex justify-center">
          <Logo loginText=" - ADMIN" />
        </div>
        <form className="flex flex-col gap-y-4 pb-0">
          <Input
            error={errors.email?.message}
            placeholder="Email"
            type="text"
            {...register('email')}
          />

          <Input
            error={errors.password?.message}
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
        </form>

        <div className="w-full">
          <button
            type="submit"
            className="bg-red-primary flex items-center justify-center gap-x-2 text-white w-full py-2 px-10 rounded-2xl text-lg font-bold hover:bg-red-secondary ease-in-out  duration-200"
            onClick={handleSubmit}
          >
            ENTRAR
            {isLoading && <Spinner className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </main>
  );
}
