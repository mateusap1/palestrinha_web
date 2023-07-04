import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from "../components/Modal";
import { useUser } from "../contexts/UserProvider";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { signIn } = useUser()!;

  const submitLogin = async () => {
    setIsLoading(true);

    const response = await signIn(email, password);

    if (response.success) {
      toast.success("Login bem sucedido!");
      navigate("/");
    } else {
      const responseFailure = response as BackEndResponseFailure;
      toast.error("E-mail ou senha inválidos!");
      setError(`Server failed with error:  ${responseFailure.error}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="bg-secundary text-opposite min-h-screen">
        <div className="flex justify-center w-full">
          <div className="w-128">
            <div className="w-full">
              <div className="flex items-center h-screen w-full">
                <div className="flex flex-col items-center w-full">
                  <h2 className="text-opposite font-bold text-5xl w-full mb-10">
                    Login
                  </h2>

                  <div className="w-full">
                    <div className="text-xl font-semibold w-full flex flex-col gap-8">
                      <div className="flex flex-col gap-4 w-full">
                        <span>Qual o seu e-mail acadêmico?</span>
                        <input
                          className="p-4 bg-opposite-pale text-black rounded-lg"
                          placeholder="alberto@aluno.unb.br"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <span>Qual a sua senha?</span>
                        <input
                          type="password"
                          className="p-4 bg-opposite-pale text-black rounded-lg"
                          placeholder="**********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <button
                        className="border-2 border-white px-6 py-1 mt-8 rounded-full font-semibold opacity-80"
                        onClick={() => navigate("/register")}
                      >
                        Não tenho conta ainda
                      </button>
                      {isLoading ? (
                        <button className="border-2 border-white px-6 py-1 mt-8 rounded-full font-semibold opacity-80">
                          Loading...
                        </button>
                      ) : (
                        <button
                          className="text-black bg-white px-6 py-1 mt-8 rounded-full font-semibold"
                          onClick={() => submitLogin()}
                        >
                          Confirmar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*   <Modal isOpen={error !== null} onClose={() => setError(null)}>
        {error}
      </Modal> */}
    </>
  );
};

export default LoginPage;
