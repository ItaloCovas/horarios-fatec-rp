import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ACCEPTED_FILE_EXTENSIONS = ['xls', 'xlsx'];

const MAX_FILE_SIZE = 400000;

const schema = z.object({
  file: z
    .any()
    .refine((file) => file, 'O arquivo é obrigatório.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `O tamanho máximo é de 4MB.`)
    .refine((file) => {
      const fileExtension = file?.name?.split('.').pop();
      return ACCEPTED_FILE_EXTENSIONS.includes(fileExtension);
    }, 'Apenas .xls e .xlsx são suportados.'),
});

type FormData = z.infer<typeof schema>;

export function useAdminClasses() {
  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: '',
    },
  });

  console.log(errors, 'erros');

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    console.log(data, 'filee');
    // try {
    //   const authData = await authService.signInAdmin(data);
    //   signIn(authData!.token);
    //   reset();
    //   toast.success('Login efetuado com sucesso.');
    //   navigate('/admin/classes', { replace: true });
    // } catch {
    //   toast.error('Credenciais inválidas, tente novamente.');
    // }
  });

  return {
    errors,
    control,
    handleSubmit,
  };
}
