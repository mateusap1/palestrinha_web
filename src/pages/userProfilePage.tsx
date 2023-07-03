import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/userContext";
import { editUserSchema } from "../schemas/userSchemas";

type FormValues = {
  nome: string;
  email: string;
  senha: string;
  subAreasInteresse: string;
};

const UserProfilePage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(editUserSchema),
  });

  const { setUser } = useContext(UserContext);

  const onSubmit = async (data: FormValues) => {
    const keysWithValues = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );

    try {
      await api.patch("/user/", keysWithValues);
      toast.success("Informações atualizadas com Sucesso!");
    } catch (error) {
      console.log(errors);
      toast.error("A requisição de edição falhou!");
    }
  };

  const handleAccountDeletion = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await api.delete("/user/");
      localStorage.removeItem("@accessToken");
      localStorage.removeItem("@userID");
      toast.success("Conta Excluída com sucesso!");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(errors);
      toast.error("A requisição de exclusão falhou!");
    }
  };

  return (
    <div className="bg-secondary min-h-screen text-opposite">
      <div className="flex justify-center w-full">
        <div className="w-128">
          <div className="mt-8 mx-8">
            <h2 className="font-bold text-3xl">Editar perfil</h2>
          </div>
          <div className="mt-8 mx-8">
            <h3 className="font-bold text-xl">Informações pessoais</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Digite seu nome"
                  {...register("nome")}
                />
                {errors.nome && (
                  <span className="text-red-500">{errors.nome.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Digite seu email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="block font-bold mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Digite sua senha"
                  {...register("senha")}
                />
                {errors.senha && (
                  <span className="text-red-500">{errors.senha.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subAreasInteresse"
                  className="block font-bold mb-2"
                >
                  Subáreas de Interesse
                </label>
                <input
                  type="text"
                  id="subAreasInteresse"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  placeholder="Digite suas subáreas de interesse"
                  {...register("subAreasInteresse")}
                />
                {errors.subAreasInteresse && (
                  <span className="text-red-500">
                    {errors.subAreasInteresse.message}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handleAccountDeletion}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Excluir Perfil
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
