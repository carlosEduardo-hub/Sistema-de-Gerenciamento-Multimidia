import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { api } from "../api/token";

const passwordRedefinitionFormSchema = z
  .object({
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

type PasswordRedefinitionFormData = z.infer<typeof passwordRedefinitionFormSchema>;

export function PasswordRedefinitionCard() {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRedefinitionFormData>({
    resolver: zodResolver(passwordRedefinitionFormSchema),
  });

  async function onSubmit(data: PasswordRedefinitionFormData) {
    if (!token) {
      alert("Token inválido ou ausente.");
      return;
    }

    try {
      await api.post(`/user/reset-password/confirm/${token}/`, {
        new_password: data.new_password,
      });
      alert("Senha redefinida com sucesso!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Erro ao redefinir a senha. Tente novamente.");
    }
  }

  return (
    <form
      className="flex flex-col w-full max-w-xs gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label className="text-fulvouscolor font-semibold" htmlFor="new_password">
          Nova Senha
        </label>
        <input
          type="password"
          id="new_password"
          className="outline-none rounded h-10 px-3 bg-gray-400 text-white placeholder-gray-100"
          placeholder="Digite sua nova senha"
          {...register("new_password")}
        />
        {errors.new_password && (
          <span className="text-red-600 text-sm">{errors.new_password.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label
          className="text-fulvouscolor font-semibold"
          htmlFor="confirm_new_password"
        >
          Confirmar Nova Senha
        </label>
        <input
          type="password"
          id="confirm_new_password"
          className="outline-none rounded h-10 px-3 bg-gray-400 text-white placeholder-gray-100"
          placeholder="Confirme sua nova senha"
          {...register("confirm_new_password")}
        />
        {errors.confirm_new_password && (
          <span className="text-red-600 text-sm">
            {errors.confirm_new_password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-fulvouscolor rounded font-semibold text-gray-100 h-10 hover:bg-fulvoushover px-6 mt-2"
      >
        Redefinir
      </button>
      <div className="flex flex-col items-center mt-1">
          <span className="text-center w-full text-gray-400 text-sm">
            Retornar para{" "}
            <a href="/" className="text-fulvoushover underline text-sm">
              login
            </a>
          </span>
        </div>
    </form>
  );
}
