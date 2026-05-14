import Popup from "reactjs-popup";
import FormPostagem from "../formpostagem/FormPostagem";

import "reactjs-popup/dist/index.css";

function ModalPostagem() {
  return (
    <>
      <Popup
        trigger={
          <button className="px-6 py-2 font-bold uppercase tracking-widest text-emerald-100 border-2 border-emerald-500/50 rounded-2xl bg-emerald-950/30 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:bg-emerald-500 hover:text-white transition-all">
            Nova Postagem
          </button>
        }
        modal
        overlayStyle={{
          background: "rgba(33, 19, 44, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        contentStyle={{
          background: "transparent",
          border: "none",
          width: "90%",
          maxWidth: "600px",
        }}
      >
        <div className="w-full">
          <FormPostagem />
        </div>
      </Popup>
    </>
  );
}

export default ModalPostagem;
