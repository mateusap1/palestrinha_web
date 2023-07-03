import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

const NameEmailRegistrationPage = () => {
  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <span>Qual o seu nome?</span>
        <input
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="Alberto Júnior"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span>Qual o seu email acadêmico?</span>
        <input
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="alberto@aluno.unb.br"
        />
      </div>
    </div>
  );
};

const PasswordPage = () => {
  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <span>Escolha uma senha</span>
        <input
          type="password"
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="+10 caracteres"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span>Confirme a sua senha</span>
        <input
          type="password"
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="*********"
        />
      </div>
    </div>
  );
};

const UserTypeDepartamentPage = () => {
  const selectionButtonClassName =
    "p-4 bg-opposite-pale hover:opacity-80 text-black rounded-lg";

  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <span>Qual a sua função na UnB?</span>
        <div className="flex flex-col gap-2 w-full">
          <button className={selectionButtonClassName}>
            Aluno de Graduação
          </button>
          <button className={selectionButtonClassName}>
            Aluno de Pós-Graduação
          </button>
          <button className={selectionButtonClassName}>Servidor</button>
          <button className={selectionButtonClassName}>Professor</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span>Qual é o seu departamento?</span>
        <Select
          className="text-black rounded-lg"
          classNamePrefix="bg-opposite-pale"
          options={[
            {
              value: "1",
              label: "Option 1",
            },
            {
              value: "2",
              label: "Option 2",
            },
            {
              value: "3",
              label: "Option 3",
            },
          ]}
        />
      </div>
    </div>
  );
};

const SubAreasInterestPage = () => {
  const selectionButtonClassName =
    "p-4 bg-opposite-pale hover:opacity-80 text-black rounded-lg";

  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <span>Quais sub-áreas mais te interessam?</span>
        <Select
          className="text-black rounded-lg"
          classNamePrefix="bg-opposite-pale"
          isMulti
          options={[
            {
              value: "1",
              label: "Option 1",
            },
            {
              value: "2",
              label: "Option 2",
            },
            {
              value: "3",
              label: "Option 3",
            },
          ]}
        />
      </div>
    </div>
  );
};

// Nome
// Email
// Senha
// Confirmar Senha
// Matrícula
// Departamento
// Tipo Usuário
// SubÁreas Interesse

type CurrentPage =
  | "Name/Email/Registration"
  | "Password"
  | "UserType/Departament"
  | "SubAreasInterest";

const RegisterPage = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>(
    "Name/Email/Registration"
  );

  const navigate = useNavigate();

  const isValidNameEmailRegistration = () => {
    return true;
  };

  const isValidPassword = () => {
    return true;
  };

  const isValidUserTypeDepartament = () => {
    return true;
  };

  const isValidSubAreasInterest = () => {
    return true;
  };

  const moveToPreviousPage = () => {
    switch (currentPage) {
      case "Name/Email/Registration":
        if (isValidNameEmailRegistration()) {
          navigate("/login");
        }
        break;
      case "Password":
        if (isValidPassword()) {
          setCurrentPage("Name/Email/Registration");
        }
        break;
      case "UserType/Departament":
        if (isValidUserTypeDepartament()) {
          setCurrentPage("Password");
        }
        break;
      case "SubAreasInterest":
        if (isValidSubAreasInterest()) {
          setCurrentPage("UserType/Departament");
        }
        break;
      default:
        return <></>;
    }
  };

  const moveToNextPage = () => {
    switch (currentPage) {
      case "Name/Email/Registration":
        if (isValidNameEmailRegistration()) {
          setCurrentPage("Password");
        }
        break;
      case "Password":
        if (isValidPassword()) {
          setCurrentPage("UserType/Departament");
        }
        break;
      case "UserType/Departament":
        if (isValidUserTypeDepartament()) {
          setCurrentPage("SubAreasInterest");
        }
        break;
      case "SubAreasInterest":
        if (isValidSubAreasInterest()) {
          navigate("/login");
        }
        break;
      default:
        return <></>;
    }
  };

  const CurrentPage = () => {
    switch (currentPage) {
      case "Name/Email/Registration":
        return <NameEmailRegistrationPage />;
      case "Password":
        return <PasswordPage />;
      case "UserType/Departament":
        return <UserTypeDepartamentPage />;
      case "SubAreasInterest":
        return <SubAreasInterestPage />;
      default:
        return <></>;
    }
  };

  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128">
          <div className="w-full">
            <div className="flex items-center h-screen w-full">
              <div className="flex flex-col items-center w-full">
                <h2 className="text-opposite font-bold text-5xl w-full mb-10">
                  Cadastro
                </h2>

                <div className="w-full">
                  <CurrentPage />
                  <div className="w-full flex justify-between items-center">
                    <button
                      className="border-2 border-white px-6 py-1 mt-8 rounded-full font-semibold opacity-80"
                      onClick={() => moveToPreviousPage()}
                    >
                      {currentPage !== "Name/Email/Registration"
                        ? "Voltar"
                        : "Já tenho conta"}
                    </button>
                    <button
                      className="text-black bg-white px-6 py-1 mt-8 rounded-full font-semibold"
                      onClick={() => moveToNextPage()}
                    >
                      {currentPage === "SubAreasInterest"
                        ? "Confirmar"
                        : "Próximo"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
