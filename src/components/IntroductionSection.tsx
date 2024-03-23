import { ClockIcon } from './icons/ClockIcon';

export function IntroductionSection() {
  return (
    <section className="flex justify-center md:justify-normal px-10 md:px-20 py-28 gap-x-10">
      <div className="md:w-1/2 text-center w-full md:text-left">
        <h1 className="text-5xl font-bold">
          Suas aulas e horários na palma da mão.
        </h1>
        <p className="mt-10 text-2xl text-gray-primary">
          Não fique mais procurando sua sala ou perguntando no grupo da classe.
        </p>
        <p className="mt-2 text-2xl text-gray-primary">
          Aqui você encontra os horários de seu semestre e a localização da
          sala!
        </p>
        <button className="mt-16 bg-red-primary text-white py-4 px-10 rounded-2xl text-xl font-bold hover:bg-red-secondary">
          Acessar meus horários
        </button>
      </div>
      <div className="w-1/2 justify-end md:justify-end hidden items-center md:flex">
        <ClockIcon />
      </div>
    </section>
  );
}
