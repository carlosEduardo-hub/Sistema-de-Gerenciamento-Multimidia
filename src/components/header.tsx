import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { House, LogOut } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
 

  function logOut() {
    // Remove dados do sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");

    navigate("/login");
  }

  return (
    <header className="bg-primarylemon shadow-shape p-4">
      {/* Linha principal */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl sm:text-3xl font-bold text-fulvouscolor"
        >
          Contentify
        </Link>

        {/* Input de pesquisa (apenas telas grandes) */}
        <input
          type="text"
          placeholder="Pesquisar arquivos..."
          className="hidden sm:block w-full sm:w-auto sm:flex-grow mx-4 px-3 py-2 rounded border border-gray-500 bg-transparent text-gray-500 placeholder-gray-500 focus:outline-none focus:border-fulvoushover"
        />

        {/* Ícones alinhados (visível em todas as telas) */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <House className="text-gray-600 text-2xl cursor-pointer hover:text-fulvoushover" />
          </Link>
          <Link to="/perfil">
            <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-fulvoushover" />
          </Link>
          <button onClick={logOut}>
            <LogOut className="text-gray-600 text-2xl cursor-pointer hover:text-fulvoushover" />
          </button>
        </div>
      </div>

      {/* Input de pesquisa no mobile */}
      <div className="mt-4 sm:hidden">
        <input
          type="text"
          placeholder="Pesquisar arquivos..."
          className="w-full px-3 py-2 rounded border border-gray-500 bg-transparent text-gray-500 placeholder-gray-500 focus:outline-none focus:border-fulvoushover"
        />
      </div>
    </header>
  );
}
