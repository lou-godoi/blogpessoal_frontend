import { BehanceLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-purple-900 text-teal-400">
                <div className="container flex flex-col items-center py-4">

                    <p className='text-xl font-bold'>
                        Blog Pessoal da Lou | Copyright: {data}
                    </p>

                    <p className='text-lg'>
                        Acesse nossas redes sociais
                    </p>

                    <div className='flex gap-2'>

                        <a href="https://www.linkedin.com/in/lorena-godoi-almeida" target="_blank">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>

                        <a href="https://www.instagram.com/lougodoi" target="_blank">
                            <InstagramLogoIcon size={48} weight='bold' />
                        </a>

                        <a href="https://www.behance.com/lougodoi" target="_blank">
                            <BehanceLogoIcon size={48} weight='bold' />
                        </a>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer