import { type ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

function FormTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL se for edição
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
  const [isLoading, setIsLoading] = useState(false);

  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate('/temas');
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Tema atualizado com sucesso');
      } else {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Tema cadastrado com sucesso');
      }
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      } else {
        alert(id !== undefined ? 'Erro ao atualizar o Tema' : 'Erro ao cadastrar o Tema');
      }
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950 flex items-center justify-center py-12">
      {/* Background Místico */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/40 to-emerald-900/60 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl px-4">
        <div className="bg-stone-900/60 backdrop-blur-md border border-emerald-500/20 rounded-[2rem] p-10 shadow-2xl">
          
          <h1 className="text-4xl font-black text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-md">
            {id === undefined ? 'Cadastrar Novo Tema' : 'Editar Tema'}
          </h1>

          <form onSubmit={gerarNovoTema} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="descricao" className="text-emerald-100/80 font-bold text-lg ml-1">
                Descrição do Tema
              </label>
              <input
                type="text"
                placeholder="Descreva aqui seu tema..."
                name="descricao"
                value={tema.descricao}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="bg-black/40 border-2 border-emerald-500/30 text-white p-4 rounded-2xl focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-500"
              />
            </div>

            <button
              className="mt-4 w-full py-4 px-4 font-bold text-xl rounded-2xl text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-[1.02]"
              type="submit">
              
              { isLoading ? (
                <ClipLoader 
                  color="#10b981" 
                  size={24} 
                /> 
              ) : (
                id === undefined ? 'Cadastrar' : 'Atualizar' 
              )}

            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormTema;