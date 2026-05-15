import { useContext } from "react";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";
import { AuthContext } from "../../contexts/AuthContext";

function Home() {
  const { usuario } = useContext(AuthContext);

  return (
    <>
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
      
      {/* Imagem de Fundo*/}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
      ></div>
      
      {/* Gradiente Mágico */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/80 to-emerald-900/90 mix-blend-multiply pointer-events-none"></div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Texto e Boas-vindas */}
          <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-pink-400 drop-shadow-lg">
              Saudações, {usuario.nome}!
            </h2>
            <p className="text-2xl text-emerald-100/80 font-medium">
              O que traz de novo no seu refúgio digital?
            </p>

            <div className="flex gap-4">
            <ModalPostagem />
            </div>
          </div>

          {/* Imagem Ilustrativa com Efeito Glow */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
            <img
              src="src\assets\scribe.png"
              alt="Imagem Página Home"
              className="relative z-10 w-2/3 lg:w-2/3 drop-shadow-[0_0_35px_rgba(167,139,250,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>

     <ListaPostagens />

     </>
  );
}

export default Home;