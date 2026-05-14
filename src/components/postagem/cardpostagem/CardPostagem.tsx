import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='flex flex-col rounded-[2rem] overflow-hidden justify-between bg-stone-900/60 backdrop-blur-md border border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]'>
                
            <div>
                {/* Cabeçalho: Info do Usuário */}
                <div className="flex w-full bg-emerald-950/50 py-3 px-6 items-center gap-4 border-b border-emerald-500/10">
                    <img 
                        src={postagem.usuario?.foto || 'https://i.imgur.com/pK6vSCy.png'} 
                        className='h-12 w-12 rounded-full border-2 border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                        alt={postagem.usuario?.nome} 
                    />
                    <h3 className='text-lg font-bold text-emerald-100 uppercase tracking-wider'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>

                {/* Conteúdo da Postagem */}
                <div className='p-6 flex flex-col gap-3'>
                    <h4 className='text-2xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-pink-300 drop-shadow-md'>
                        {postagem.titulo}
                    </h4>
                    
                    <p className='text-emerald-100/80 text-lg leading-relaxed bg-black/10 p-4 rounded-xl border border-emerald-500/5'>
                        {postagem.texto}
                    </p>
                    
                    <div className="mt-2 space-y-1">
                        <p className='text-sm font-bold text-teal-400 uppercase tracking-widest'>
                            Tema: <span className='text-emerald-100 font-medium normal-case ml-1'>
                                {postagem.tema?.descricao}
                            </span>
                        </p>
                        
                        {/* Data formatada com Intl.DateTimeFormat */}
                        <p className='text-xs text-slate-400 italic bg-emerald-950/20 p-2 rounded-lg inline-block'>
                            Data: {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'full',
                                timeStyle: 'medium',
                            }).format(new Date(postagem.data))}
                        </p>
                    </div>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 p-4 bg-emerald-950/30 border-t border-emerald-500/20">
                <Link to={`/editarPostagem/${postagem.id}`} 
                    className='w-full py-3 px-4 flex items-center justify-center font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:-translate-y-1'>
                    Editar
                </Link>
                <Link to={`/deletarPostagem/${postagem.id}`} 
                    className='w-full py-3 px-4 flex items-center justify-center font-bold rounded-2xl text-white bg-gradient-to-r from-rose-800 to-red-950 hover:from-rose-600 hover:to-red-800 shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all duration-300 transform hover:-translate-y-1'>
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem