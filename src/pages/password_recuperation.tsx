import Logo from "../../public/capa_SGM2.png";
import { PasswordRecuperationCard } from "../components/password_recuperation_card";

export function PasswordRecuperation() {
  return (
    <>
      <div className="flex w-full h-screen bg-primarylemon">
        <div className="w-[60%] flex items-center justify-center">
          <img className="w-full h-full object-cover" src={Logo} alt="capa" />
        </div>
        <div className="w-[40%] text-white flex items-center justify-center">
          <div className="shadow-shape rounded-md w-[60%] bg-slate-200 p-6 flex flex-col items-center space-y-4">
            <div>
              <h1 className="text-fulvouscolor font-bold text-3xl">Recuperar senha</h1>
            </div>
            <PasswordRecuperationCard />
          </div>
        </div>
      </div>
    </>
  );
}
