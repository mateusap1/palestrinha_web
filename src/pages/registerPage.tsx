import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { IUsuarioRegister } from "../interfaces";

const Register = () => {
  const navigate = useNavigate;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUsuarioRegister>();

  const { createUser } = useContext(UserContext);

  const onSubmit = async (data: IUsuarioRegister) => {
    await createUser(data);
  };

  return (
    <div className="min-h-screen bg-secundary flex items-center justify-center">
      <div className="flex justify-center w-full">
        <div className="w-128">
          <div className="mt-8 mx-8">
            <h2 className="text-opposite font-bold text-2xl">Cadastro</h2>
            <Link to="/login" className="text-opposite hover:underline">
              Voltar
            </Link>
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col mt-8">
                <label htmlFor="nome" className="font-bold">
                  Nome
                </label>
                <input
                  id="nome"
                  className="formInput rounded"
                  type="text"
                  placeholder="Digite seu nome"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("nome")}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  id="email"
                  className="formInput rounded"
                  type="text"
                  placeholder="Digite seu email"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="senha" className="font-bold">
                  Senha
                </label>
                <input
                  id="senha"
                  className="formInput rounded"
                  type="password"
                  placeholder="Digite sua senha"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("senha")}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="matricula" className="font-bold">
                  Matrícula
                </label>
                <input
                  id="matricula"
                  className="formInput rounded"
                  type="text"
                  placeholder="Digite sua matrícula"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("matricula")}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="departamento" className="font-bold">
                  Departamento
                </label>
                <input
                  id="departamento"
                  className="formInput rounded"
                  type="text"
                  placeholder="Digite seu departamento"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("departamento")}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="tipoUsuario" className="font-bold">
                  Tipo de Usuário
                </label>
                <select
                  id="tipoUsuario"
                  className="formInput rounded"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("tipoUsuario")}
                >
                  <option value="Técnico">Técnico</option>
                  <option value="Docente">Docente</option>
                  <option value="Graduação">Graduação</option>
                  <option value="Pós-Graduação">Pós-Graduação</option>
                </select>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="subAreasInteresse" className="font-bold">
                  Subáreas de Interesse
                </label>
                <input
                  id="subAreasInteresse"
                  className="formInput rounded"
                  type="text"
                  placeholder="Digite as subáreas de interesse"
                  style={{ backgroundColor: "#E5E5E5" }}
                  {...register("subAreasInteresse")}
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-primary text-white px-4 py-2 rounded font-bold hover:bg-primary-dark"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
