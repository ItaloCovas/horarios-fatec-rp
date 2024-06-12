import { useDialog } from '../../context/DialogContext/useDialog';
import { ClockIcon } from './icons/ClockIcon';

export function IntroductionSection() {
  const { openDialog } = useDialog();

  return (
    <section className="flex justify-center md:justify-normal px-10 md:px-20 py-28 gap-x-10 pb-0">
      <div className="md:w-1/2 text-center w-full md:text-left">
        <h1 className="text-4xl font-bold text-gray-600">
          Suas aulas e horários na palma da mão.
        </h1>
        <p className="mt-8 text-2xl text-gray-primary">
          Não fique mais procurando sua sala ou perguntando no grupo da classe.
          Aqui você encontra os horários de seu semestre e a localização da
          sala!
        </p>
        <p className="mt-2 text-2xl text-gray-primary"></p>
        <button
          className="mt-16 bg-red-primary text-white py-4 px-10 rounded-2xl text-xl font-bold hover:bg-red-secondary ease-in-out  duration-200"
          onClick={openDialog}
        >
          Acessar meus horários
        </button>
      </div>
      <div className="w-1/2 justify-end md:justify-end hidden items-center md:flex">
        <ClockIcon />
      </div>
    </section>
  );
}
