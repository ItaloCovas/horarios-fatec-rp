import { Controller } from 'react-hook-form';
import { useDialog } from '../../../context/DialogContext/useDialog';
import { mockedInfo } from '../../../mocks/mockedInfo';

import { useClasses } from './useClasses';
import { ClassesHeader } from '../../components/ClassesHeader/ClassesHeader';
import { Select } from '../../components/Select';
import { Table } from '../../components/Table';
import { LocationDialog } from '../../components/LocationDialog/LocationDialog';

export function Classes() {
  const { closeDialog, open, openDialog } = useDialog();

  const {
    currentDate,
    control,
    errors,
    data,
    locationTitle,
    setLocationTitle,
    setImageURL,
    imageURL,
  } = useClasses();

  return (
    <>
      <ClassesHeader />
      <main className="bg-[#F9F9F9] h-fit md:h-full min-h-[calc(100vh-110px)] flex flex-col items-center justify-center p-10 px-0 md:px-10 text-center">
        <h1 className="font-semibold text-2xl text-red-primary mb-4">
          Seja bem-vindo(a), <strong>{mockedInfo.nomeAluno}</strong>
        </h1>
        <span className="text-xl mb-4">{currentDate()}</span>
        <span className="mt-4">Escolha o dia da semana desejado:</span>
        <Controller
          control={control}
          name="type"
          defaultValue="Segunda-feira"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Selecione o dia"
              error={errors.type?.message}
              onChange={(e) => {
                onChange(e);
              }}
              value={value}
              options={[
                { value: 'Segunda-feira', label: 'Segunda-feira' },
                { value: 'Terça-feira', label: 'Terça-feira' },
                { value: 'Quarta-feira', label: 'Quarta-feira' },
                { value: 'Quinta-feira', label: 'Quinta-feira' },
                { value: 'Sexta-feira', label: 'Sexta-feira' },
                { value: 'Sábado', label: 'Sábado' },
              ]}
            />
          )}
        />
        <Table
          openDialog={openDialog}
          data={data}
          setLocationTitle={setLocationTitle}
          setImageURL={setImageURL}
        />
      </main>
      <LocationDialog
        open={open}
        closeDialog={closeDialog}
        openDialog={openDialog}
        title={locationTitle}
        imageURL={imageURL}
      />
    </>
  );
}
