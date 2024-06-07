import { Input } from '../Input';
import { Logo } from '../Logo';
import { useAdminSignIn } from './useAdminSignIn';

export function AdminSignIn() {
  const { errors, register, handleSubmit } = useAdminSignIn();

  return (
    <div className="bg-[#F9F9F9] h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-[90vw] md:w-[50vw] h-[350px] max-w-[450px] rounded-[6px] p-[25px] flex flex-col justify-between shadow-2xl">
        <div className="flex justify-center">
          <Logo loginText=" - ADMIN" />
        </div>
        <form className="flex flex-col gap-y-4 pb-0">
          <Input
            error={errors.user?.message}
            placeholder="Usuário"
            type="text"
            {...register('user')}
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
            className="bg-red-primary text-white w-full py-2 px-10 rounded-2xl text-lg font-bold hover:bg-red-secondary ease-in-out  duration-200"
            onClick={handleSubmit}
          >
            ENTRAR
          </button>
        </div>
      </div>
    </div>
  );
}
