import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  async function buscarPostagens() {
    try {
        setIsLoading(true)
        await buscar('/postagens', setPostagens, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout() // Se o token estiver errado ou sem Bearer, ele desloga aqui
        }
    } finally {
        setIsLoading(false)
    }
}

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')",
        }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/40 to-emerald-900/60 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-1xl md:text-4xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-pink-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] uppercase tracking-tighter">
          Mural de Postagens
        </h1>

        {isLoading && (
          <div className="flex flex-col items-center justify-center my-20">
            <SyncLoader
              color="#34d399"
              size={20}
            />
            <p className="mt-6 text-emerald-200/50 font-bold animate-pulse tracking-widest uppercase">
              Extraindo memórias do éter...
            </p>
          </div>
        )}

        <div className="flex justify-center w-full">
          <div className="container flex flex-col">
            {/* Mensagem de "Não Encontrado" */}
            {!isLoading && postagens.length === 0 && (
              <div className="bg-stone-900/40 backdrop-blur-md border border-emerald-500/20 p-9 rounded-[2rem] text-center shadow-2xl">
                <span className="text-2xl text-emerald-100 font-light italic">
                  "O silêncio ecoa por aqui... Nenhuma postagem foi encontrada."
                </span>
              </div>
            )}

            {/* Grid de Postagens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {postagens.map((postagem) => (
                <CardPostagem key={postagem.id} postagem={postagem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaPostagens;
