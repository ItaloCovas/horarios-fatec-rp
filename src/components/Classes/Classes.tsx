import { ClassesHeader } from '../ClassesHeader/ClassesHeader';
import { Footer } from '../Footer';
import { Table } from '../Table';
import { useClasses } from './useClasses';

export function Classes() {
  const { currentDate } = useClasses();

  return (
    <>
      <ClassesHeader />
      <main className="bg-[#F9F9F9] h-full min-h-[calc(100vh-105px)] flex flex-col items-center p-10 text-center">
        <h1 className="font-semibold text-2xl text-red-primary mb-4">
          Seja bem-vindo(a), <strong>Ítalo Garcia Covas</strong>
        </h1>
        <span className="text-xl mb-4">{currentDate()}</span>
        <Table />
      </main>
      <Footer />
    </>
  );
}
