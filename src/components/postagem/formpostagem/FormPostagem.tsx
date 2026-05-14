import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

function FormPostagem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  // Função para buscar postagem por ID (Edição)
  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // Função para buscar a lista de temas
  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // Função CRÍTICA: Seleciona o tema da lista já carregada (faz o botão destravar!)
  function selecionarTemaPorId(id: string) {
    const temaEncontrado = temas.find((t) => t.id === Number(id));
    if (temaEncontrado) {
      setTema(temaEncontrado);
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Postagem atualizada com sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar a Postagem");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Postagem cadastrada com sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar a Postagem");
        }
      }
    }
    setIsLoading(false);
  }

  const carregandoTema = tema.id === 0;

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center py-10">
      
      {/* 1. Imagem de Fundo (Exatamente como na sua Home) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>
      
      {/* 2. Gradiente Mágico (O que dá o tom roxo/indigo) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/80 to-emerald-900/90 mix-blend-multiply pointer-events-none"></div>

      {/* 3. Conteúdo Principal (O Form) */}
      <div className="relative z-10 w-full max-w-xl px-4">
          <div className="bg-stone-950/80 backdrop-blur-sm border border-emerald-500/20 rounded-[2rem] p-8 shadow-2xl">
              
              <h1 className="text-2xl md:text-3xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-md uppercase tracking-tighter">
                  {id !== undefined ? 'Editar Postagem' : 'Nova Postagem'}
              </h1>

              <form onSubmit={gerarNovaPostagem} className="flex flex-col gap-4">
                  {/* ... seus inputs continuam aqui ... */}
                  <div className="flex flex-col gap-1">
                      <label htmlFor="titulo" className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] ml-2">Título da Postagem</label>
                      <input
                          value={postagem.titulo}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                          type="text"
                          placeholder="Insira o título místico..."
                          name="titulo"
                          required
                          className="bg-black/40 border border-emerald-500/30 rounded-2xl p-3 text-emerald-100 placeholder-emerald-800 focus:outline-none focus:border-emerald-400 transition-all"
                      />
                  </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="texto"
              className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] ml-2"
            >
              Conteúdo do Pergaminho
            </label>
            <textarea
              value={postagem.texto}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                atualizarEstado(e)
              }
              placeholder="Escreva seu feitiço aqui..."
              name="texto"
              required
              rows={3}
              className="bg-black/40 border border-emerald-500/30 rounded-2xl p-3 text-emerald-100 placeholder-emerald-800 focus:outline-none focus:border-emerald-400 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="tema"
              className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] ml-2"
            >
              Escolha a Categoria
            </label>
            <select
              name="tema"
              id="tema"
              className="w-full bg-black/40 border border-emerald-500/30 rounded-2xl p-3 text-emerald-100 appearance-none focus:outline-none focus:border-emerald-400 transition-all cursor-pointer"
              onChange={(e) => selecionarTemaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione um Tema
              </option>
              {temas.map((tema) => (
                <option
                  key={tema.id}
                  value={tema.id}
                  className="bg-stone-900 text-emerald-100"
                >
                  {tema.descricao}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={carregandoTema || isLoading}
            className="mt-4 w-full py-3 px-6 font-black rounded-2xl text-white 
                                   bg-gradient-to-r from-emerald-600 to-teal-700 
                                   hover:from-purple-600 hover:to-pink-600 
                                   disabled:from-slate-800 disabled:to-slate-900 
                                   disabled:text-slate-500 disabled:cursor-not-allowed
                                   shadow-[0_0_20px_rgba(16,185,129,0.2)] 
                                   hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] 
                                   transition-all duration-500 transform hover:scale-[1.02] 
                                   active:scale-95 flex justify-center items-center gap-2 uppercase tracking-widest"
          >
            {isLoading ? (
              <SyncLoader color="#ffffff" size={8} />
            ) : id !== undefined ? (
              "Confirmar Alteração"
            ) : (
              "Publicar no Mural"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}


export default FormPostagem;
