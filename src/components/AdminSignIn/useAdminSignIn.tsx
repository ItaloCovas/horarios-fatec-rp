import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  user: z.string().min(1, 'Usuário é obrigatório.'),
  password: z.string().min(8, 'Senha é obrigatória.'),
});

type FormData = z.infer<typeof schema>;

export function useAdminSignIn() {
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
      user: '',
      password: '',
    },
  });

  const handleSubmit = hookFormSubmit((data: FormData) => {
    try {
      console.log(data, 'formData');
      //   onClose();
      // reset();
    } catch {
      //   toast.error(t('toastMessages.categories.editCategoryError'));
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
