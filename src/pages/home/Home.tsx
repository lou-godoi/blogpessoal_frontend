function Home() {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
      
      {/* Imagem de Fundo (Mesma do Jardim Encantado) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>
      
      {/* Gradiente Mágico */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/80 to-emerald-900/90 mix-blend-multiply pointer-events-none"></div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Texto e Boas-vindas */}
          <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
            <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-lg">
              Seja Bem Vinde!
            </h2>
            <p className="text-2xl text-emerald-100/80 font-medium">
              Expresse aqui seus pensamentos e opiniões no seu refúgio digital.
            </p>

            <div className="flex gap-4">
              <button className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-500 transform hover:-translate-y-1">
                Nova Postagem
              </button>
            </div>
          </div>

          {/* Imagem Ilustrativa com Efeito Glow */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
            <img
              src="src\assets\scribe.png"
              alt="Imagem Página Home"
              className="relative z-10 w-2/3 lg:w-2/2 drop-shadow-[0_0_35px_rgba(167,139,250,0.5)]"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;