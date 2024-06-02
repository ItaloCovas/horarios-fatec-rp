import { AboutCard } from './AboutCard';

export function AboutUsSection() {
  return (
    <section className="flex justify-center flex-col md:justify-normal px-10 md:px-20 py-16 gap-x-10 pt-20 pb-16">
      <h1 className="text-center text-4xl font-bold text-[#303031]">
        Simples, rápido e fluido.
      </h1>
      <p className="text-center mt-6 text-xl">
        Através do uso de nosso sistema, mude sua forma de visualizar horários e
        salas na FATEC Ribeirão Preto.
      </p>

      <div
        className="gap-x-6 flex justify-center items-center flex-wrap"
        id="about"
      >
        <AboutCard
          title="Facilidade no acesso"
          description="Com apenas seu RA e sua senha, tenha tudo disponível quando quiser."
          icon="signIn"
        />
        <AboutCard
          title="Facilidade no acesso"
          description="Com apenas seu RA e sua senha, tenha tudo disponível quando quiser."
          icon="clarity"
        />
        <AboutCard
          title="Facilidade no acesso"
          description="Com apenas seu RA e sua senha, tenha tudo disponível quando quiser."
          icon="padLock"
        />
      </div>

      <h1 className="text-center text-4xl font-bold text-[#303031] mt-20">
        Ajude a melhorar o projeto!
      </h1>
      <p className="text-center mt-6 text-xl">
        Como sempre gostamos de iniciativas de código livre (open source), temos
        o repositório de forma aberta para que todos possam ver o código e
        sugerir alterações ou novas implementações.
      </p>
    </section>
  );
}
