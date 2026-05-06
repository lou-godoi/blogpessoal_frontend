import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            bg-purple-900 text-teal-400'>

                <div className="container flex justify-between text-lg mx-8">
                    
                    <Link to='/home' className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>

                    <div className='flex gap-4'>
                        <div>Postagens</div>
                        <div>Temas</div>
                        <div>Cadastrar tema</div>
                        <div>Perfil</div>
                        <div>Sair</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar