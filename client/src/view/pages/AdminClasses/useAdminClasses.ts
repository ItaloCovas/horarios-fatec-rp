import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { schedulesService } from '../../../services/schedulesService';

type ExcelRow = {
  Curso: string;
  Periodo: string;
  Disciplina: string;
  DiaSemana: string;
  Horario: string;
  Professor: string;
  Sala: string;
  Andar: string;
  Tag?: string;
  ClassroomLink?: string;
};

const ACCEPTED_FILE_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_FILE_SIZE = 400000;

const schema = z.object({
  file: z
    .any()
    .refine((file) => file, 'O arquivo é obrigatório.')
    .refine((file) => {
      console.log('file', file);
      return ACCEPTED_FILE_TYPES.includes(file?.type);
    }, 'Apenas .xls e .xlsx são suportados.')
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `O tamanho máximo é de 4MB.`,
    ),
});

type FormData = z.infer<typeof schema>;

export function useAdminClasses() {
  const [filename, setFilename] = useState<string>('');

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      file: '',
    },
  });

  const handleSubmit = hookFormSubmit(async (data: FormData) => {
    console.log(data, 'filee');
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const binaryString = new Uint8Array(arrayBuffer).reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          '',
        );
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

        const transformedJson = json.map((item: ExcelRow) => ({
          course: item.Curso,
          semester: item.Periodo,
          lessonName: item.Disciplina,
          weekDay: item.DiaSemana,
          lessonTime: item.Horario,
          teacherName: item.Professor,
          classroom: item.Sala,
          floor: item.Andar,
          tag: item?.Tag || '',
          classroomLink: item?.ClassroomLink || '',
        }));

        await schedulesService.updateSchedules({ schedules: transformedJson });
        reset();
        setFilename('');
        toast.success('Arquivo salvo com sucesso, cheque os novos horários.');
      } catch {
        toast.error('Erro em salvar o arquivo, tente novamente.');
      }
    };
    reader.readAsArrayBuffer(data.file);
  });

  return {
    errors,
    control,
    handleSubmit,
    setFilename,
    filename,
  };
}
