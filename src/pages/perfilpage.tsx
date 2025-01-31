import { useState, useEffect } from "react";
import { useUser } from "../userContext"; // Importando o hook para acessar o contexto
import { Galeria } from "../components/perfil_galeria";
import { Fotos } from "../components/perfil_fotos";
import { Videos } from "../components/perfil_videos";
import { Audio } from "../components/perfil_audio";
import { Header } from "../components/header";
import { EditProfileModal } from "../components/perfil_edit";
import { CustomSelect } from "../components/ui/select_radix";
import { toast } from "sonner";
import Logo from "../../public/robot_perfil.png";

export function PerfilPage() {
  const { user, setUser, fetchUserData } = useUser(); // Pegando os dados do contexto
  const [activeTab, setActiveTab] = useState("Galeria");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!user.id) {
      fetchUserData(); // Busca os dados do usuário se não estiverem no estado
    }
  }, [user.id, fetchUserData]);

  const handleSave = (updatedData: typeof user) => {
    setUser(updatedData); // Atualizando os dados do usuário no contexto
    setIsEditModalOpen(false);
    toast.success("Alterações salvas com sucesso!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-primarylemon">
      <Header />

      <main className="flex-grow p-6">
        <div className="bg-perfilcolor p-6 rounded flex items-center space-x-6">
          {/* Foto de Perfil */}
          <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-300">
            <img
              src={Logo}
              alt="Foto de Perfil"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Informações do Perfil */}
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <div className="flex flex-col md:flex-row items-baseline">
                <h2 className="text-xl font-bold sm:text-3xl sm:font-semibold">{user.username}</h2>
                <p className="text-gray-500 text-xs sm:text-gray-500 italic opacity-75 font-semibold sm:text-sm">
                  ({user.email})
                </p>
              </div>
              <CustomSelect profileData={user} setProfileData={setUser} />
            </div>
            {/* Informações adicionais */}
            <div className="mt-2">
              <p className="text-xs text-gray-600 sm:text-lg">
                <strong>Nome:</strong> {user.name}
              </p>
              <p className="text-gray-600 text-xs sm:text-lg">
                <strong>Criação da conta:</strong>{" "}
                {new Date(user.date_joined).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-xs text-gray-600 sm:text-lg">
                <strong>Bio:</strong> {user.description}
              </p>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="mt-6">
          <ul className="flex border-b">
            {["Galeria", "Fotos", "Videos", "Audio"].map((tab) => (
              <li key={tab} className={`mr-1`}>
                <button
                  className={`inline-block py-2 px-4 font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "text-fulvouscolor border-b-4 border-fulvouscolor text-lg"
                      : "text-gray-500 hover:text-fulvouscolor" 
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          {/* Conteúdo */}
          <div className="bg-primarylemon p-6 mt-4 shadow-both rounded">
            {activeTab === "Galeria" && <Galeria />}
            {activeTab === "Fotos" && <Fotos />}
            {activeTab === "Videos" && <Videos />}
            {activeTab === "Audio" && <Audio />}
          </div>
        </div>

        {/* Modal de Edição de Perfil */}
        {isEditModalOpen && (
          <EditProfileModal
            profileData={user}
            setProfileData={handleSave}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
}
