import Logo from "../../public/capa_SGM2.png";
import { LoginCard } from "../components/logincard";

export function InicialPageLogin() {
  
  return (
    <div className="flex w-full h-screen bg-primarylemon">
      <div className="hidden  md:w-[60%] md:flex items-center justify-center">
        <img className="w-full h-full object-cover" src={Logo} alt="capa" />
      </div>
      <div className="w-full flex flex-col gap-10 items-center justify-center md:w-[40%] text-white sm:flex sm:items-center sm:justify-center sm:flex-col sm:gap-10">
        <p className="text-fulvouscolor font-bold text-5xl">Contentify</p>
        <div className="shadow-shape rounded-md w-[60%] h-auto bg-slate-200 p-6 flex flex-col items-center space-y-4">
          {/* Cabeçalho do Card */}
          <div className="flex flex-col items-center space-y-1">
            <h1 className="text-fulvouscolor font-bold text-3xl">Login</h1>
          </div>
          <LoginCard />

          <div className="text-center w-full text-gray-400 text-sm mt-4">
            Não possui conta?{" "}
            <a className="text-fulvoushover underline text-sm" href="/register"> 
              Registrar-se
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
