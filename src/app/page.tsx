import { Panel } from "@/components/layout/Panel";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Recommendations } from "@/components/sections/Recommendations";
import { Skills } from "@/components/sections/Skills";

/**
 * Página única: a composição roda no servidor (Server Component) e só as
 * seções, que dependem do idioma escolhido em runtime, são client components.
 * Assim `Panel` e `Container` ficam fora do bundle enviado ao navegador.
 *
 * Os `id` são os mesmos alvos usados pelo scroll-spy do menu — ver
 * `SECTION_IDS` em `@/config/sections`.
 */
export default function Home() {
  return (
    <div className="flex flex-col">
      <Panel id="home" bare>
        <Hero />
      </Panel>
      <Panel id="sobre">
        <About />
      </Panel>
      <Panel id="habilidades">
        <Skills />
      </Panel>
      <Panel id="experiencia">
        <Experience />
      </Panel>
      <Panel id="projetos">
        <Projects />
      </Panel>
      <Panel id="recomendacoes">
        <Recommendations />
      </Panel>
      <Panel id="contato">
        <Contact />
      </Panel>
    </div>
  );
}
