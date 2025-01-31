import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../userContext"; // Importando o hook para acessar o contexto
import { UserData } from "../dataUser/userData";
// import { createUser } from "../dataUser/functionData";
import { api } from "../api/token";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";

const loginUserFormSchema = z.object({
  username: z
    .string()
    .nonempty("O nome é obrigatório!")
    .min(6, "O username precisa de no mínimo 6 caracteres!"),
  password: z.string().min(8, "A senha precisa de no mínimo 8 caracteres!"),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export function LoginCard() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const navigate = useNavigate();
  const { setUser } = useUser(); // Pegando a função de atualização do contexto

  const loginUser = async (data: loginUserFormData) => {
    try {
      const response = await api.post("/authentication/token/", data);
      const token = response.data.access;
      const userId = response.data.user_id;

      if (!userId) {
        throw new Error("ID do usuário não foi retornado pelo backend.");
      }

      // Armazene o token e o user_id no sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user_id", userId);

      // Adicione o token ao cabeçalho para chamadas futuras
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Faça a requisição para obter os dados do usuário
      const userResponse = await api.get<UserData>(`/users/${userId}/`);

      // Atualize o contexto do usuário
      const userData = userResponse.data;
      setUser(userData); // Atualize o contexto com os dados do usuário

      // Salve os dados do usuário no sessionStorage
      // sessionStorage.setItem('user', JSON.stringify(userData));

      navigate("/dashboard");
      toast.success("Seja bem-vindo ao Contentify!", { duration: 3000 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Nome de Usuário e/ou senha inválidos!", { duration: 3000});
      console.error(
        "Erro ao logar usuário:",
        error.response?.data || error.message
      );
    }
  };

  const onSubmit = async (data: loginUserFormData) => {
    await loginUser(data);
  };

  return (
    <form
      className="flex flex-col w-full max-w-xs gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        {errors.username && (<span className="text-red-600 text-sm">{errors.username.message}</span>)}
      </div>
      <div className="flex flex-col">
        <label className="text-fulvouscolor font-bold" htmlFor="password">
          Senha
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            className="outline-none rounded h-10 w-full pr-10 px-3 bg-gray-400 text-white placeholder-gray-100"
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
        {errors.password && (
          <span className="text-red-600 text-sm">
            {errors.password.message}
          </span>
        )}
        <div className="flex flex-col items-center mt-2">
          <a
            href="/password_recuperation"
            className="text-fulvoushover underline text-sm"
          >
            Esqueci minha senha
          </a>
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-fulvouscolor rounded font-semibold text-gray-100 h-10 hover:bg-fulvoushover px-6 disabled:bg-fulvoushover flex items-center justify-center"
      >
        {isSubmitting ? <Loader className="animate-spin" /> : 'Entrar'}
      </button>
    </form>
  );
}
