import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin } from "../interfaces";
import { loginUserSchema } from "../schemas/userSchemas";
import { ZodObject, ZodString, ZodTypeAny } from "zod";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginUserSchema),
  });

  const submit = (data: ILogin) => {
    login(data);
  };

  const { login } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-secundary flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Usuário
            </label>
            <input
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              title="Email"
              type="text"
              placeholder="Digite seu usuário"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              title="Senha"
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Ainda não possui conta?{" "}
          <Link
            className="text-opposite hover:text-primary-dark"
            to="/register"
          >
            Cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
};
