import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";
import { SyncLoader } from "react-spinners"; // Import do loader conforme a foto 1

function ListaTemas() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

useEffect(() => {
    if (token === '') {
        alert('Sua sessão expirou ou você não está logado.');
        navigate('/login');
    } else {
        buscarTemas();
    }
}, [token]); // Ele só vai rodar quando o token mudar ou o componente abrir

  async function buscarTemas() {
    try {
      setIsLoading(true);
      await buscar('/temas', setTemas, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/40 to-emerald-900/60 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 flex justify-center w-full py-12">
        <div className="container flex flex-col px-4">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-md">
              Biblioteca de Temas
            </h2>
          </div>

          {/* 1. Loader */}
          {isLoading && (
            <div className="flex justify-center w-full my-8">
               <SyncLoader color="#10b981" size={20} />
            </div>
          )}

          {/* 2. Mensagem de Lista Vazia */}
          {(!isLoading && temas.length === 0) && (
            <span className="text-3xl text-center my-8 font-bold text-emerald-200/50 italic">
              Nenhum Tema foi encontrado!
            </span>
          )}

          {/* 3. O Grid com o .map() */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ListaTemas;