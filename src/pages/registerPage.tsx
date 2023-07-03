import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Select, { SingleValue, MultiValue } from "react-select";

import { Modal } from "../components/Modal";
import { LoadingIcon } from "../components/LoadingIcon";

import { useUser } from "../contexts/UserProvider";
import { useBackEnd } from "../contexts/BackEndProvider";

type NameEmailRegistrationPageProps = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  registration: string;
  setRegistration: (registration: string) => void;
};

const NameEmailRegistrationPage = ({
  name,
  setName,
  email,
  setEmail,
  registration,
  setRegistration,
}: NameEmailRegistrationPageProps) => {
  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <span>Qual o seu nome?</span>
        <input
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="Alberto Júnior"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <span>Qual o seu email acadêmico?</span>
        <input
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="alberto@aluno.unb.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <span>Qual o seu número de matrícula?</span>
        <input
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="221037970"
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
        />
      </div>
    </div>
  );
};

type PasswordPageProps = {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
};

const PasswordPage = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: PasswordPageProps) => {
  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <span>Escolha uma senha</span>
        <input
          type="password"
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="+10 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <span>Confirme a sua senha</span>
        <input
          type="password"
          className="p-4 bg-opposite-pale text-black rounded-lg"
          placeholder="*********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

type UserTypeDepartamentPageProps = {
  userType: UserType;
  setUserType: (userType: UserType) => void;
  department: SingleValue<Option>;
  setDepartment: (department: SingleValue<Option>) => void;
  initialDepartments: string[];
};

const UserTypeDepartamentPage = ({
  userType,
  setUserType,
  department,
  setDepartment,
  initialDepartments,
}: UserTypeDepartamentPageProps) => {
  const selectionButtonClassName =
    "p-4 bg-opposite-pale hover:opacity-80 text-black rounded-lg";
  const selectedButtonClassName =
    "p-4 bg-[#CF55ED] hover:opacity-80 text-black rounded-lg";

  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <span>Qual a sua função na UnB?</span>
        <div className="flex flex-col gap-2 w-full">
          <button
            className={
              userType === "Graduacao"
                ? selectedButtonClassName
                : selectionButtonClassName
            }
            onClick={() => setUserType("Graduacao")}
          >
            Aluno de Graduação
          </button>
          <button
            className={
              userType === "PosGraduacao"
                ? selectedButtonClassName
                : selectionButtonClassName
            }
            onClick={() => setUserType("PosGraduacao")}
          >
            Aluno de Pós-Graduação
          </button>
          <button
            className={
              userType === "Tecnico"
                ? selectedButtonClassName
                : selectionButtonClassName
            }
            onClick={() => setUserType("Tecnico")}
          >
            Servidor técnico
          </button>
          <button
            className={
              userType === "Docente"
                ? selectedButtonClassName
                : selectionButtonClassName
            }
            onClick={() => setUserType("Docente")}
          >
            Professor
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span>Qual é o seu departamento?</span>
        <Select
          className="text-black rounded-lg"
          classNamePrefix="bg-opposite-pale"
          value={department}
          onChange={(value) => setDepartment(value)}
          options={initialDepartments.map((department) => ({
            value: department,
            label: department,
          }))}
        />
      </div>
    </div>
  );
};

type SubAreasInterestPageProps = {
  subAreas: MultiValue<Option>;
  setSubAreas: (subAreas: MultiValue<Option>) => void;
  initialSubAreas: SubArea[];
};

const SubAreasInterestPage = ({
  subAreas,
  setSubAreas,
  initialSubAreas,
}: SubAreasInterestPageProps) => {
  return (
    <div className="text-xl font-semibold w-full flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <span>Quais sub-áreas mais te interessam?</span>
        <Select
          className="text-black rounded-lg"
          classNamePrefix="bg-opposite-pale"
          isMulti
          value={subAreas}
          onChange={(values) => setSubAreas(values)}
          options={initialSubAreas.map((subArea) => ({
            value: subArea.tabelaId,
            label: subArea.nome,
          }))}
        />
      </div>
    </div>
  );
};

type CurrentPage =
  | "Name/Email/Registration"
  | "Password"
  | "UserType/Departament"
  | "SubAreasInterest";

const RegisterPage = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>(
    "Name/Email/Registration"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registration, setRegistration] = useState("");
  const [department, setDepartment] = useState<SingleValue<Option>>(null);
  const [userType, setUserType] = useState<UserType>("Graduacao");
  const [interestedSubAreas, setInterestedSubAreas] = useState<
    MultiValue<Option>
  >([]);

  const [initialSubAreas, setInitaialSubAreas] = useState<SubArea[] | null>(
    null
  );
  const [initialDepartments, setInitialDepartments] = useState<string[] | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { signUp } = useUser()!;
  const { getSubAreas, getDepartments } = useBackEnd()!;

  const navigate = useNavigate();

  useEffect(() => {
    loadRegisterPage();
  }, []);

  const loadRegisterPage = async () => {
    const departments = await getDepartments();
    const subAreas = await getSubAreas();

    setInitialDepartments(departments);
    setInitaialSubAreas(subAreas);
    setIsLoading(false);
  };

  const isValidNameEmailRegistration = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const registrationRegex = /^\d+$/;

    return (
      emailRegex.test(email) &&
      registrationRegex.test(registration)
    );
  };

  const isValidPassword = () => {
    return password === confirmPassword;
  };

  const isValidUserTypeDepartament = () => {
    return department !== null;
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
          registerUser();
        }
        break;
      default:
        return <></>;
    }
  };

  const registerUser = async () => {
    const result = await signUp(
      name,
      email,
      password,
      registration,
      department!.value,
      userType,
      interestedSubAreas.map((val) => val.value)
    );

    if (result.success) {
      navigate("/login");
    } else {
      const failureResult = result as BackEndResponseFailure;
      console.log(failureResult.error);
      // setError(failureResult.error);
    }
  };

  if (isLoading) {
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128">
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-20 h-20">
              <LoadingIcon />
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  return (
    <>
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
                    {currentPage === "Name/Email/Registration" ? (
                      <NameEmailRegistrationPage
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        registration={registration}
                        setRegistration={setRegistration}
                      />
                    ) : currentPage === "Password" ? (
                      <PasswordPage
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                      />
                    ) : currentPage === "UserType/Departament" ? (
                      <UserTypeDepartamentPage
                        userType={userType}
                        setUserType={setUserType}
                        department={department}
                        setDepartment={setDepartment}
                        initialDepartments={initialDepartments!}
                      />
                    ) : (
                      <SubAreasInterestPage
                        subAreas={interestedSubAreas}
                        setSubAreas={setInterestedSubAreas}
                        initialSubAreas={initialSubAreas!}
                      />
                    )}
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
      <Modal isOpen={error !== null} onClose={() => setError(null)}>
        {error}
      </Modal>
    </>
  );
};

export default RegisterPage;
