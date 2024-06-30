import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usersService } from '../../../services/usersService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext/useAuth';

const schema = z.object({
  email: z.string().min(1, 'Email é obrigatório.'),
  password: z.string().min(8, 'Senha é obrigatória.'),
});

type FormData = z.infer<typeof schema>;

export function useAdminSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
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
      email: '',
      password: '',
    },
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      const authData = await usersService.signInAdmin(data);
      signIn(authData!);
      reset();
      toast.success('Login efetuado com sucesso.');
      navigate('/admin/classes', { replace: true });
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
