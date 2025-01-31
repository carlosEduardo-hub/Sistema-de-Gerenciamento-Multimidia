/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader } from "lucide-react";
import { api } from "../api/token";

// Esquema de validação
const createUserFormSchema = z
  .object({
    name: z
      .string()
      .nonempty("O nome é obrigatório!")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    username: z
      .string()
      .nonempty("O nome é obrigatório!")
      .min(6, "O username precisa de no mínimo 6 caracteres!"),
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("Formato de email inválido")
      .toLowerCase(),
    password: z
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres!")
      .refine((password) => !/^\d+$/.test(password), {
        message: "A senha não pode ser somente de números!",
      }),
    confirm_password: z
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres!"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas precisam ser iguais!",
    path: ["confirm_password"], // Campo onde o erro será exibido
  });


type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function RegisterCard() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [message] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const navigate = useNavigate();

  // Função para enviar os dados ao backend
  const registerUser = async (data: CreateUserFormData) => {
    try {
      const response = await api.post("/users/", data);
      // setMessage("Usuário cadastrado com sucesso!");

      navigate("/");
      toast.success("Cadastro realizado com sucesso!");
      console.log("Resposta do servidor:", response.data);
    } catch (error: any) {
      console.error("Erro ao cadastrar usuário:",error.response?.data || error.message);
      toast.error("Erro ao cadastrar usuário!");
      // setMessage("Erro ao cadastrar usuário.");
    }
  };

  // Função chamada ao enviar o formulário
  const onSubmit = async(data: CreateUserFormData) => {
    await registerUser(data);
  };

  return (
    <>
      <form
        className="flex flex-col w-full max-w-xs gap-1.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-fulvouscolor font-semibold" htmlFor="fullname">
            Nome Completo
          </label>
          <input
            type="text"
            id="fullname"
            className="outline-none rounded h-10 px-3 bg-gray-400 text-white placeholder-gray-100"
            placeholder="Digite seu nome completo"
            {...register("name")}
          />
          <span
            className={`text-red-600 text-sm ${
              errors.name ? "visible" : "invisible"
            }`}
          >
            {errors.name?.message || "Espaço reservado"}
          </span>
        </div>

        <div className="flex flex-col">
          <label className="text-fulvouscolor font-semibold" htmlFor="username">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            className="outline-none rounded h-10 px-3 bg-gray-400 text-white placeholder-gray-100"
            placeholder="Digite seu nome de usuário"
            {...register("username")}
          />
          <span
            className={`text-red-600 text-sm ${
              errors.username ? "visible" : "invisible"
            }`}
          >
            {errors.username?.message || "Espaço reservado"}
          </span>
        </div>

        <div className="flex flex-col">
          <label className="text-fulvouscolor font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="outline-none rounded h-10 px-3 bg-gray-400 text-white placeholder-gray-100"
            placeholder="Digite seu email"
            {...register("email")}
          />
          <span
            className={`text-red-600 text-sm ${
              errors.email ? "visible" : "invisible"
            }`}
          >
            {errors.email?.message || "Espaço reservado"}
          </span>
        </div>

        <div className="flex flex-col">
          <label className="text-fulvouscolor font-bold" htmlFor="password">
            Senha
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="outline-none rounded w-full h-10 px-3 pr-10 bg-gray-400 text-white placeholder-gray-100"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeOff className="text-gray-600 cursor-pointer" />
              ) : (
                <Eye className="text-gray-600 cursor-pointer" />
              )}
            </button>
          </div>
          <span
            className={`text-red-600 text-sm ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            {errors.password?.message || "Espaço reservado"}
          </span>
        </div>

        <div className="flex flex-col">
          <label
            className="text-fulvouscolor font-bold"
            htmlFor="confirm_password"
          >
            Confirmar senha
          </label>
          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm_password"
              className="outline-none rounded h-10 w-full pr-10 px-3 bg-gray-400 text-white placeholder-gray-100"
              placeholder="Confirme sua senha"
              {...register("confirm_password")}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            >
              {isConfirmPasswordVisible ? (
                <EyeOff className="text-gray-600 cursor-pointer" />
              ) : (
                <Eye className="text-gray-600 cursor-pointer" />
              )}
            </button>
          </div>
          <span
            className={`text-red-600 text-sm ${errors.confirm_password ? "visible" : "invisible"}`}
          >
            {errors.confirm_password?.message || "Espaço reservado"}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-fulvouscolor rounded font-semibold text-gray-100 h-10 hover:bg-fulvoushover px-6 disabled:bg-fulvoushover flex items-center justify-center"
        >
          {isSubmitting ? <Loader className="animate-spin" /> : 'Cadastrar'}
          
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
}
