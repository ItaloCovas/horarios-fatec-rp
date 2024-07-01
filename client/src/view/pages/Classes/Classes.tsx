import { Controller } from 'react-hook-form';
import { useDialog } from '../../../context/DialogContext/useDialog';
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
    daysOfWeek,
    studentName,
  } = useClasses();

  return (
    <>
      <ClassesHeader />
      <main className="bg-[#F9F9F9] h-fit md:h-full min-h-[calc(100vh-110px)] flex flex-col items-center justify-center p-10 px-0 md:px-10 text-center">
        <h1 className="font-semibold text-2xl text-red-primary mb-4">
          Seja bem-vindo(a), <strong>{studentName}</strong>
        </h1>
        <span className="text-xl mb-4">{currentDate()}</span>
        <span className="mt-4">Escolha o dia da semana desejado:</span>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Selecione o dia"
              error={errors.type?.message}
              onChange={(e) => {
                onChange(e);
              }}
              value={value}
              options={daysOfWeek.map((day) => ({ value: day, label: day }))}
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
