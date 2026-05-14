function DeletarPostagem() {
  return (

    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center py-10">
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2584&auto=format&fit=crop')" }}
      ></div>
      
      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/80 to-emerald-900/90 mix-blend-multiply pointer-events-none"></div>

      {/* 2. Card de Deleção */}
      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="bg-stone-950/90 backdrop-blur-md border border-red-500/30 rounded-[2rem] overflow-hidden shadow-2xl">
          
          <header className="py-4 px-6 bg-gradient-to-r from-red-900/40 to-transparent border-b border-red-500/20">
            <h1 className="text-2xl font-black text-red-200 uppercase tracking-tighter">
              Apagar Registro
            </h1>
          </header>

          <div className="p-8 space-y-6">
            <p className="text-slate-300 text-center font-medium">
              Tem certeza de que deseja banir esta postagem para o abismo? Esta ação não pode ser desfeita.
            </p>

            {/* Preview do Conteúdo */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-2">
              <h2 className="text-xl font-bold text-red-400/80 uppercase tracking-wide">
                Título da Postagem
              </h2>
              <p className="text-slate-400 italic">
                Texto da Postagem...
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4">
              <button className="flex-1 py-3 px-6 font-black rounded-xl text-white bg-slate-800 hover:bg-slate-700 transition-all uppercase tracking-widest text-[10px]">
                Não, manter
              </button>
              
              <button className="flex-1 py-3 px-6 font-black rounded-xl text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all uppercase tracking-widest text-[10px]">
                Sim, apagar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;