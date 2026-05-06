import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      
      {/* Imagem de Fundo (Floresta/Jardim) com Efeito de Crepúsculo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>
      
      {/* Gradiente (Azul Crepúsculo, Roxo e Verde Esmeralda) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/80 to-emerald-900/90 mix-blend-multiply pointer-events-none"></div>

      {/* Container do Formulário */}
      <div className="relative z-10 w-full max-w-md p-10 mx-4 bg-stone-900/40 backdrop-blur-xl border border-emerald-400/20 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-sm mb-2">
            Adentrar
          </h2>
          <p className="text-emerald-200/80 text-sm">
            Acesse o seu refúgio pessoal
          </p>
        </div>

        <form className="flex flex-col gap-6">
          
          {/* Input Usuário */}
          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="text-emerald-100/90 text-sm font-medium ml-2">
              Nome do Viajante
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Seu nome..."
              className="px-5 py-3 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Input Senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="text-emerald-100/90 text-sm font-medium ml-2">
              Palavra Secreta
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="••••••••"
              className="px-5 py-3 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl text-emerald-50 placeholder-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Botão Mágico */}
          <button 
            type="submit" 
            className="mt-4 w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-500 transform hover:-translate-y-1"
          >
            Despertar Magia
          </button>

          {/* Divisor */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-emerald-500/20"></div>
            <span className="flex-shrink-0 mx-4 text-emerald-300/50 text-xs uppercase tracking-widest">ou</span>
            <div className="flex-grow border-t border-emerald-500/20"></div>
          </div>

          {/* Link de Cadastro */}
        <p className="text-emerald-200/70 text-center">
         Ainda não tem a chave?{' '}
        <Link to="/cadastro" className="text-pink-500 font-bold hover:underline">
            Criar um feitiço
        </Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Login;