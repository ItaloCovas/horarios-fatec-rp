import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);

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
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
        reset();
        setFilename('');
        toast.success('Arquivo salvo com sucesso, cheque os novos horários.');
      } catch {
        setIsLoading(false);
        toast.error('Erro em salvar o arquivo, tente novamente.');
      }
    };
    reader.readAsArrayBuffer(data.file);
  });

  const handleDownload = async () => {
    try {
      setIsFileLoading(true);
      const response = await schedulesService.loadSpreedsheat();
      setIsFileLoading(false);
      const schedules = response;

      const transformedData = schedules!.map((schedule) => ({
        Curso: schedule.course,
        Periodo: schedule.semester,
        Disciplina: schedule.lessonName,
        DiaSemana: schedule.weekDay,
        Horario: schedule.lessonTime,
        Professor: schedule.teacherName,
        Sala: schedule.classroom,
        Andar: schedule.floor,
        Tag: schedule.tag,
        ClassroomLink: schedule.classroomLink,
      }));

      const worksheet = XLSX.utils.json_to_sheet(transformedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Schedules');

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      saveAs(blob, 'Aulas do Semestre.xlsx');
    } catch (error) {
      console.error('Error fetching schedules: ', error);
      toast.error('Erro ao baixar o arquivo, tente novamente.');
    }
  };

  return {
    errors,
    control,
    handleSubmit,
    setFilename,
    filename,
    isLoading,
    handleDownload,
    isFileLoading,
  };
}
