import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'
import { SyncLoader } from 'react-spinners'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="flex flex-col rounded-[2rem] overflow-hidden justify-between bg-stone-900/60 backdrop-blur-md border border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]">
      
      {/* Cabeçalho */}
      <header className="py-4 px-6 bg-emerald-950/50 border-b border-emerald-500/20 flex items-center h-20">
        <h3 className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400"> 
          {tema.descricao !== "" ? tema.descricao : <SyncLoader color="#34d399" size={10} />}
        </h3>
      </header>

      {/* Corpo / Descrição */}
      <p className="p-8 text-xl text-emerald-100/80 h-full bg-black/20">
        Categoria registrada na grande biblioteca.
      </p>

      {/* Botões */}
      <div className="flex gap-4 p-4 bg-emerald-950/30 border-t border-emerald-500/20">
        <Link to={`/editartema/${tema.id}`}
          className="w-full py-3 px-4 flex items-center justify-center font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:-translate-y-1">
            Editar
        </Link>

        {/* Link atuando como botão de Deletar */}
        <Link to={`/deletartema/${tema.id}`}  
          className="w-full py-3 px-4 flex items-center justify-center font-bold rounded-2xl text-white bg-gradient-to-r from-rose-800 to-red-950 hover:from-rose-600 hover:to-red-800 shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:-translate-y-1">
          Deletar
        </Link>
      </div>
      
    </div>
  )
}

export default CardTema