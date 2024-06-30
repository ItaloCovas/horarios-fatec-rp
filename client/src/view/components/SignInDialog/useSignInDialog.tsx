import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  ra: z.string().min(1, 'RA é obrigatório'),
  password: z.string().min(8, 'Senha é obrigatória.'),
});

type FormData = z.infer<typeof schema>;

export function useSignInDialog() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      ra: '',
      password: '',
    },
  });

  const handleSubmit = hookFormSubmit((data: FormData) => {
    try {
      console.log(data, 'formData');
      //   onClose();
      reset();
      toast.success('Login efetuado com sucesso.');
      navigate('/classes', { replace: true });
    } catch {
      toast.error('Credenciais inválidas, tente novamente.');
    }
  });

  return {
    register,
    hookFormSubmit,
    errors,
    handleSubmit,
    reset,
  };
}
