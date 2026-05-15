import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Cadastro() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")
  
  // Iniciamos o usuário sem ID para não bugar o banco de dados
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",   
  })

  function retornar() {
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Validação de segurança
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {
        // Criamos uma cópia sem o ID 0 para a API não reclamar
        const { id, ...usuarioSemId } = usuario;
        
        await cadastrarUsuario(`/usuarios/cadastrar`, usuarioSemId, setUsuario)
        
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
        retornar() // Redireciona apenas após o sucesso confirmado

      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário! Verifique se o e-mail já existe.', 'erro')
      }
    } else {
      ToastAlerta('Dados inconsistentes! A senha deve ter 8 caracteres e ser igual à confirmação.', 'erro')
      setUsuario({ ...usuario, senha: '' })
      setConfirmarSenha('')
    }

    setIsLoading(false)
  }
  
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Imagem de Fundo - Adicionei pointer-events-none para não bloquear cliques */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/80 to-emerald-900/90 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl p-10 mx-4 bg-stone-900/40 backdrop-blur-xl border border-emerald-400/20 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 mb-2">
            Criar Feitiço
          </h2>
          <p className="text-emerald-200/80 text-sm italic">Inicie sua jornada neste refúgio</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-emerald-100/90 text-sm font-medium ml-2">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              placeholder="Como devemos lhe chamar?"
              className="px-5 py-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="usuario" className="text-emerald-100/90 text-sm font-medium ml-2">Usuário (E-mail)</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              required
              placeholder="viajante@email.com"
              className="px-5 py-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
              value={usuario.usuario}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="foto" className="text-emerald-100/90 text-sm font-medium ml-2">Link da Foto (Opcional)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="https://suafoto.com/imagem.png"
              className="px-5 py-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="senha" className="text-emerald-100/90 text-sm font-medium ml-2">Palavra Secreta</label>
              <input
                type="password"
                id="senha"
                name="senha"
                required
                placeholder="Mínimo 8 caracteres"
                className="px-5 py-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
                value={usuario.senha}
                onChange={atualizarEstado}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmarSenha" className="text-emerald-100/90 text-sm font-medium ml-2">Confirmar Palavra</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                required
                placeholder="Repita a senha"
                className="px-5 py-2.5 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
                value={confirmarSenha}
                onChange={handleConfirmarSenha}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={retornar}
              className="w-1/2 py-3 px-6 bg-stone-800/50 hover:bg-rose-900/60 text-emerald-100/70 border border-emerald-500/20 font-bold rounded-2xl transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 py-3 px-6 flex justify-center items-center bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro