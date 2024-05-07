export function AboutUsSection() {
  return (
    <section className="flex justify-center flex-col md:justify-normal px-10 md:px-20 py-28 gap-x-10 pt-20">
      <h1 className="text-center text-4xl font-bold text-[#303031]">
        Simples, rápido e fluido.
      </h1>
      <p className="text-center mt-6 text-xl">
        Através do uso de nosso sistema, mude sua forma de visualizar horários e
        salas na FATEC Ribeirão Preto.
      </p>

      <div className="gap-x-6 flex justify-center items-center">
        <div className="flex items-center mt-14 rounded-lg max-w-[400px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col gap-y-5 items-center justify-center bg-white px-6 py-16">
            <div className="w-[80px] h-[80px] rounded-full bg-[#F3F0EA] flex items-center justify-center">
              icone
            </div>

            <h2>Facilidade no acesso</h2>
            <p>
              Com apenas seu RA e sua senha, tenha tudo disponível quando
              quiser.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-14 rounded-lg max-w-[400px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col gap-y-5 items-center justify-center bg-white px-6 py-16">
            <div className="w-[80px] h-[80px] rounded-full bg-[#F3F0EA] flex items-center justify-center">
              icone
            </div>

            <h2>Facilidade no acesso</h2>
            <p>
              Com apenas seu RA e sua senha, tenha tudo disponível quando
              quiser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
