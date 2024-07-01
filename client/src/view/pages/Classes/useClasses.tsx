import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Class,
  SignInUserData,
} from '../../../services/usersService/signInUser';

const schema = z.object({
  type: z.string(), // Change this to string to allow dynamic options
});

type FormData = z.infer<typeof schema>;

export function useClasses() {
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [initialSetupDone, setInitialSetupDone] = useState<boolean>(false);

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
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedDay = watch('type');
  const [data, setData] = useState<Class[]>([]);
  const [locationTitle, setLocationTitle] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');

  useEffect(() => {
    const storedData = localStorage.getItem('hrftcrp:udcls');
    if (storedData) {
      const parsedData: SignInUserData = JSON.parse(storedData);
      setStudentName(parsedData.estudante?.nomeAluno);
      const availableDays = Object.keys(parsedData.dias).map(
        (day) =>
          Object.keys(dayMapping).find((key) => dayMapping[key] === day) || day,
      );
      setDaysOfWeek(availableDays);

      if (!initialSetupDone && availableDays.length > 0) {
        const currentDayIndex = new Date().getDay() - 1;
        const currentDay = availableDays[currentDayIndex] || availableDays[0];
        setValue('type', currentDay); // Set default value for the form initially
        setInitialSetupDone(true);
      }

      if (selectedDay && parsedData?.dias) {
        setData(parsedData.dias[dayMapping[selectedDay]]);
      }
    }
  }, [selectedDay, dayMapping, initialSetupDone, setValue]);

  function currentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const currentDay = daysOfWeek[date.getDay()];

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
    daysOfWeek,
    studentName,
  };
}
