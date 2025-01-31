import { useEffect, useState, useRef } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { EditProfileModal } from "../perfil_edit";
import { Modal_Password } from "../modal_password";

interface CustomSelectProps {
  profileData: {
    id: number | null;
    email: string;
    username: string;
    name: string;
    description: string | null;
    date_joined: string;
    date_of_birth: string | null;
    profile_picture: string;
  };
  setProfileData: (updatedData: {
    id: number | null;
    email: string;
    username: string;
    name: string;
    description: string | null;
    date_joined: string;
    date_of_birth: string | null;
    profile_picture: string;
  }) => void;
}

export function CustomSelect({
  profileData,
  setProfileData,
}: CustomSelectProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSave = (updatedData: typeof profileData) => {
    setProfileData(updatedData);
    setIsEditModalOpen(false);
    toast.success("Alterações salvas com sucesso!");
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-300 focus:outline-none"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-label="Options"
      >
        <DotsHorizontalIcon className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
      </button>

      {isDropdownOpen && (
        <div className="w-40 absolute right-0 mt-2 sm:w-48 bg-gray-400 rounded shadow-lg p-4 z-10">
          <div
            className="text-gray-100 hover:bg-fulvoushover cursor-pointer p-2 rounded flex justify-center"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsEditModalOpen(true);
            }}
          >
            Alterar Perfil
          </div>
          <div
            className="text-gray-100 hover:bg-red-600 cursor-pointer p-2 rounded flex justify-center"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsPasswordModalOpen(true);
            }}
          >
            Alterar Senha
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EditProfileModal
          profileData={profileData}
          setProfileData={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isPasswordModalOpen && (
        <Modal_Password onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </div>
  );
}