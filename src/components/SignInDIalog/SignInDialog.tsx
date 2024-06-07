import * as Dialog from '@radix-ui/react-dialog';
import { Logo } from '../Logo';
import { Input } from '../Input';
import { useSignInDialog } from './useSignInDialog';

interface SignInDialogProps {
  open: boolean;
  openDialog(): void;
  closeDialog(): void;
}

export function SignInDialog({ open, closeDialog }: SignInDialogProps) {
  const { register, errors, reset, handleSubmit } = useSignInDialog();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        !isOpen && closeDialog();
        reset();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-[90vw] md:w-[50vw] h-[400px] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col justify-between">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium text-center flex justify-center">
            <Logo loginText=" - LOGIN" />
          </Dialog.Title>

          <form className="flex flex-col py-10 gap-y-4 pb-0">
            <Input
              error={errors.ra?.message}
              placeholder="RA"
              type="text"
              {...register('ra')}
            />

            <Input
              error={errors.password?.message}
              type="password"
              placeholder="Senha"
              {...register('password')}
            />
          </form>
          <a
            className="text-right font-semibold"
            href="https://siga.cps.sp.gov.br/aluno/login_auxproblemas.aspx"
            target="_blank"
          >
            Problemas no acesso?
          </a>

          <div className="w-full">
            <button
              type="submit"
              className="bg-red-primary text-white w-full py-2 px-10 rounded-2xl text-lg font-bold hover:bg-red-secondary ease-in-out  duration-200"
              onClick={handleSubmit}
            >
              ENTRAR
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => {
                closeDialog();
                reset();
              }}
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
