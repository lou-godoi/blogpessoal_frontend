import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta"; // Importação do seu Toaster

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center py-20">
      {/* 1. Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-900/50 to-emerald-900/50 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        <div className="bg-stone-900/70 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Capa com Overlay de Gradiente */}
          <div className="relative h-64 w-full">
            <img
              className="w-full h-full object-cover opacity-80"
              src={`https://picsum.photos/seed/${usuario.nome}/1200/400`}
              alt="Capa do Perfil"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
          </div>

          {/* Container da Foto e Info */}
          <div className="relative flex flex-col items-center pb-12 px-6">
            {/* Foto de Perfil */}
            <div className="relative mt-[-7rem]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-pink-500 blur-lg opacity-40 animate-pulse"></div>
              <img
                className="rounded-full w-48 h-48 border-8 border-stone-900 relative z-10 object-cover shadow-2xl"
                src={usuario.foto}
                alt={`Foto de perfil de ${usuario.nome}`}
              />
            </div>

            {/* Nome e Info */}
            <div className="mt-6 text-center space-y-2">
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-pink-300 drop-shadow-sm tracking-tighter uppercase">
                {usuario.nome}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-8 bg-emerald-500/50"></span>
                <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                  Mago de Nível Superior
                </p>
                <span className="h-[1px] w-8 bg-emerald-500/50"></span>
              </div>
            </div>

            {/* Cards de Detalhes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-10">
              <div className="bg-black/30 border border-white/5 p-6 rounded-3xl backdrop-blur-sm group hover:border-emerald-500/30 transition-all">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                  Identidade Mística
                </p>
                <p className="text-slate-200 font-medium truncate">
                  {usuario.nome}
                </p>
              </div>

              <div className="bg-black/30 border border-white/5 p-6 rounded-3xl backdrop-blur-sm group hover:border-pink-500/30 transition-all">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                  Essência (Email)
                </p>
                <p className="text-slate-200 font-medium truncate">
                  {usuario.usuario}
                </p>
              </div>
            </div>

            {/* Botão de Edição */}
            <button className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold uppercase tracking-widest text-[10px] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all transform hover:scale-105">
              Aprimorar Habilidades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;