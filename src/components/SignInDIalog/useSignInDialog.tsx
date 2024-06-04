import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  ra: z.string().min(1, 'RA é obrigatório'),
  password: z.string().min(8, 'Senha é obrigatória.'),
});

type FormData = z.infer<typeof schema>;

export function useSignInDialog() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },

    clearErrors,
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
    clearErrors,
  };
}
