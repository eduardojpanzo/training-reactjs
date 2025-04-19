import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Meu Blog</h1>
      <p className="mb-4">
        {`John Doe é apaixonado por eficiência e clareza no desenvolvimento de software. Ele defende o uso de tabs pela liberdade que oferecem na personalização da leitura do código e acredita firmemente na tipagem estática, valorizando sua capacidade de identificar erros logo no início e manter o código mais limpo e seguro. Além disso, John prefere o modo escuro, um aliado indispensável durante longas jornadas de codificação, ajudando a reduzir a fadiga visual e mantendo o foco por mais tempo.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
