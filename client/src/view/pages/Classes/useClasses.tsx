import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Class,
  SignInUserData,
} from '../../../services/usersService/signInUser';

const schema = z.object({
  type: z.enum([
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
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
      ] as const,
    [],
  );

  const currentDayIndex = useMemo(() => new Date().getDay() - 1, []);

  const currentDay = useMemo(
    () => daysOfWeek[currentDayIndex],
    [currentDayIndex, daysOfWeek],
  );

  const dayMapping: { [key: string]: string } = useMemo(() => {
    return {
      'Segunda-feira': 'Segunda-Feira',
      'Terça-feira': 'Terça-Feira',
      'Quarta-feira': 'Quarta-Feira',
      'Quinta-feira': 'Quinta-Feira',
      'Sexta-feira': 'Sexta-Feira',
      Sábado: 'Sábado',
    };
  }, []);

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
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: currentDay,
    },
  });

  const selectedDay = watch('type');
  const [data, setData] = useState<Class[]>([]);
  const [locationTitle, setLocationTitle] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');

  useEffect(() => {
    const storedData = localStorage.getItem('hrftcrp:udcls');
    if (storedData) {
      const parsedData: SignInUserData = JSON.parse(storedData);
      if (selectedDay && parsedData?.dias) {
        setData(parsedData.dias[dayMapping[selectedDay]]);
      }
    }
  }, [selectedDay, dayMapping]);

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
    data,
    setLocationTitle,
    locationTitle,
    setImageURL,
    imageURL,
  };
}
