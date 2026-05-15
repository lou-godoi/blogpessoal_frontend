import {
  BehanceLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center py-1 bg-purple-900 text-teal-400 relative z-50">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xs font-bold">Copyright: {data}</p>
          <p className="text-xl font-bold">🏰 Blog Pessoal da Lou 🏰</p>

          <p className="text-lg">Acesse minhas redes sociais:</p>

          <div className="flex justify-between gap-2 items-left lg:items-start text-left lg:text-left">
            <a
              href="https://www.linkedin.com/in/lorena-godoi-almeida"
              target="_blank"
            >
              <LinkedinLogoIcon size={48} weight="bold" />
            </a>

            <a href="https://github.com/lou-godoi" target="_blank">
              <GithubLogoIcon size={48} weight="bold" />
            </a>

            <a href="https://www.behance.com/lougodoi" target="_blank">
              <BehanceLogoIcon size={48} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
