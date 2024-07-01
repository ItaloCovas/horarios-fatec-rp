import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { usersService } from '../../../services/usersService';
import { useAuth } from '../../../context/AuthContext/useAuth';

const schema = z.object({
  ra: z.string().min(1, 'RA é obrigatório'),
  password: z.string().min(8, 'Senha é obrigatória.'),
});

type FormData = z.infer<typeof schema>;

export function useSignInDialog() {
  const { signInUser } = useAuth();

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    try {
      console.log(data, 'formData');
      setIsLoading(true);
      const userData = await usersService.signInUser(data);
      setIsLoading(false);
      signInUser(userData!);
      reset();
      toast.success('Login efetuado com sucesso.');
    } catch {
      setIsLoading(false);
      toast.error('Credenciais inválidas, tente novamente.');
    }
  });

  return {
    register,
    hookFormSubmit,
    errors,
    handleSubmit,
    reset,
    isLoading,
  };
}
