import { toast } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string) {
  const config = {
    position: "top-right" as const,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored" as const,
    progress: undefined,
  };

  switch (tipo) {
    case "sucesso":
      toast.success(mensagem, {
        ...config,
        style: {background: "linear-gradient(to right, #0c6e53, #034230)",
          color: "#a9f1d5",
          border: "1px solid #074736",},
      });
      break;

    case "erro":
      toast.error(mensagem, {
        ...config,
        style: { background: "linear-gradient(to right, #7e0c0c 0%, #1F0808 100%)",
          color: "#FFD2D2",
          border: "1px solid #380505",},
      });
      break;

    case "info":
    default:
      toast.info(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
        style: {
          background: "linear-gradient(to right, #5d1d5f, #1e1b4b)",
          color: "#a2caf8",
          border: "1px solid #065f46",
        },
      });
      break;
  }
}
