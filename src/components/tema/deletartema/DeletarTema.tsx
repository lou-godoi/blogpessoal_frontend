import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
  
  /* --- ESTADOS E HOOKS --- */
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  /* --- FUNÇÕES DE LÓGICA --- */

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // Alerta de login via Toast
  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info"); 
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Toast de Sucesso!
      ToastAlerta("Tema apagado com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        // Toast de Erro!
        ToastAlerta("Erro ao apagar o Tema", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  /* --- VISUAL (JSX) --- */
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950 flex items-center justify-center py-12">
      
      {/* Background Místico */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')",
        }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/40 to-emerald-900/60 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 container w-full max-w-xl px-4">
        <div className="bg-stone-900/60 backdrop-blur-md border border-emerald-500/20 rounded-[2rem] overflow-hidden shadow-2xl">
          <h1 className="text-3xl font-black text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-md">
            Deseja apagar este tema?
          </h1>

          <div className="border-t border-emerald-500/10">
            <header className="py-4 px-6 bg-emerald-950/50 border-b border-emerald-500/20">
              <p className="text-sm uppercase tracking-widest text-emerald-400/60 font-bold">
                Tema selecionado
              </p>
              <h3 className="text-2xl font-extrabold text-emerald-100 uppercase">
                {tema.descricao}
              </h3>
            </header>

            <div className="p-8 bg-black/20">
              <p className="text-lg text-emerald-100/70 italic">
                "Uma vez apagado, todos os registros deste feitiço serão
                perdidos para sempre."
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 p-6 bg-emerald-950/30 border-t border-emerald-500/10">
              <button
                className="w-full py-3 px-4 font-bold rounded-2xl text-white bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-500 hover:to-slate-700 transition-all transform hover:scale-[1.02] active:scale-95"
                onClick={retornar}
              >
                Não, voltar
              </button>
              <button
                className="w-full py-3 px-4 font-bold rounded-2xl text-white bg-gradient-to-r from-rose-700 to-red-900 hover:from-rose-600 hover:to-red-800 shadow-lg shadow-red-900/20 transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center"
                onClick={deletarTema}
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={16} />
                ) : (
                  "Sim, apagar"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;