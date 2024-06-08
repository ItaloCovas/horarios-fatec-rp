import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  type: z.enum([
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ]),
});

type FormData = z.infer<typeof schema>;

export function useClasses() {
  const daysOfWeek = useMemo(
    () =>
      [
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
        'Domingo',
      ] as const,
    [],
  );

  const currentDayIndex = useMemo(() => new Date().getDay(), []);
  const currentDay = daysOfWeek[currentDayIndex];

  const months: string[] = useMemo(
    () => [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    [],
  );

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: currentDay,
    },
  });

  function currentDate() {
    const date = new Date();

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${currentDay}, ${day}º de ${month} de ${year}.`;
  }

  return {
    currentDate,
    handleSubmit: hookFormSubmit,
    errors,
    control,
  };
}
