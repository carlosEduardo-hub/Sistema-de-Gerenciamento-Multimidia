import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { api } from "../api/token";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";

const modalPasswordFormSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres!")
      .refine((password) => !/^\d+$/.test(password), {
        message: "A senha não pode ser somente de números!",
      }),
    new_password: z
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres!")
      .refine((password) => !/^\d+$/.test(password), {
        message: "A senha não pode ser somente de números!",
      }),
    confirm_new_password: z
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres!")
      .refine((password) => !/^\d+$/.test(password), {
        message: "A senha não pode ser somente de números!",
      }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "As senhas precisam ser iguais!",
    path: ["confirm_new_password"],
  });

type ModalPasswordFormData = z.infer<typeof modalPasswordFormSchema>;

interface ModalPasswordProps {
  onClose: () => void;
}

export function Modal_Password({ onClose }: ModalPasswordProps) {
  const [isCurrentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ModalPasswordFormData>({
    resolver: zodResolver(modalPasswordFormSchema),
  });

  const navigate = useNavigate();

  const editPassword = async (data: ModalPasswordFormData) => {
    const idUsuario = sessionStorage.getItem("user_id");

    try {
      const response = await api.patch(`/change-password/${idUsuario}/`, data); // Use backticks
      navigate("/login");
      toast.success("Senha alterada com sucesso.");
      console.log("Resposta do servidor:", response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Erro ao alterar senha.");
      console.error(
        "Erro ao alterar senha.",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primarylemon p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>

        <form className="flex flex-col" onSubmit={handleSubmit(editPassword)}>
          <div className="mb-4">
            <label className="block text-gray-700">Senha Atual</label>
            <div className="relative">
              <input
                type={isCurrentPasswordVisible ? "text" : "password"}
                placeholder="Digite sua senha atual"
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
                {...register("current_password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() =>
                  setCurrentPasswordVisible(!isCurrentPasswordVisible)
                }
              >
                {isCurrentPasswordVisible ? (
                  <EyeOff className="text-gray-600 cursor-pointer" />
                ) : (
                  <Eye className="text-gray-600 cursor-pointer" />
                )}
              </button>
            </div>

            {errors.current_password && (
              <span className="text-red-600 text-sm">
                {errors.current_password.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Nova Senha</label>
            <div className="relative">
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                placeholder="Digite sua nova senha"
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
                {...register("new_password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setNewPasswordVisible(!isNewPasswordVisible)}
              >
                {isNewPasswordVisible ? (
                  <EyeOff className="text-gray-600 cursor-pointer" />
                ) : (
                  <Eye className="text-gray-600 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.new_password && (
              <span className="text-red-600 text-sm">
                {errors.new_password.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirmar Nova Senha</label>
            <div className="relative">
              <input
                type={isConfirmNewPasswordVisible ? "text" : "password"}
                placeholder="Confirme sua nova senha"
                className="w-full px-3 py-2 border rounded outline-none bg-gray-200"
                {...register("confirm_new_password")}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setConfirmNewPasswordVisible(!isConfirmNewPasswordVisible)}
              >
                {isConfirmNewPasswordVisible ? (
                  <EyeOff className="text-gray-600 cursor-pointer" />
                ) : (
                  <Eye className="text-gray-600 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.confirm_new_password && (
              <span className="text-red-600 text-sm">
                {errors.confirm_new_password.message}
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-fulvouscolor text-white rounded hover:bg-fulvoushover"
            >
              {isSubmitting ? <Loader className="animate-spin" /> : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
