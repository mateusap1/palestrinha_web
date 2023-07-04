import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { NavBar } from "../components/NavBar";
import { LoadingIcon } from "../components/LoadingIcon";
import { Event } from "../components/Event";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { useBackEnd } from "../contexts/BackEndProvider";
import { MdPerson } from "react-icons/md";

type FormValues = {
  nome: string;
  email: string;
  senha: string;
  subAreasInteresse: string;
};

type Selection = "Recentes" | "Sugeridos";

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMM, HH:mm");

  return formattedDate;
};

const ProfilePage = () => {
  
  const [currentEvents, setCurrentEvents] = useState<PalestrinhaEvent[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Selection>("Recentes");

  const [isLoading, setIsLoading] = useState(true);

  const { getHomeEvents, getFilteredEvents, getHomeEventsRecommededUser } =
    useBackEnd()!;
  const { isUserSignedIn, user } = useUser()!;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isUserSignedIn) loadHomeEvents();
  }, []);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormValues>({
  //   resolver: zodResolver(editUserSchema),
  // });

  // const { setUser } = useContext(UserContext);

  const onSubmit = async (data: FormValues) => {
    const keysWithValues = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );

    // try {
    //   await api.patch("/user/", keysWithValues);
    //   toast.success("Informações atualizadas com Sucesso!");
    // } catch (error) {
    //   console.log(errors);
    //   toast.error("A requisição de edição falhou!");
    // }
  };

  // const handleAccountDeletion = async (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  //   try {
  //     await api.delete("/user/");
  //     localStorage.removeItem("@accessToken");
  //     localStorage.removeItem("@userID");
  //     toast.success("Conta Excluída com sucesso!");
  //     setUser(null);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(errors);
  //     toast.error("A requisição de exclusão falhou!");
  //   }
  // };

  const loadHomeEvents = async () => {
    if (searchParams) {
      const dataInicio = searchParams.get("dataInicio");
      const dataFim = searchParams.get("dataFim");

      const events = await getFilteredEvents(
        currentPage,
        10,
        searchParams.get("nome"),
        searchParams.get("tipo") as EventType | null,
        dataInicio ? new Date(dataInicio) : null,
        dataFim ? new Date(dataFim) : null,
        searchParams.get("departamento"),
        searchParams.getAll("subAreasRelacionadas")
      );

      setCurrentEvents(events);
      setIsLoading(false);
    } else {
      const events = await getHomeEvents(currentPage, 10);

      setCurrentEvents(events);
      setIsLoading(false);
    }
  };

  const loadHomeEventsRecommededUser = async () => {
    const events = await getHomeEventsRecommededUser(user!, currentPage, 10);

    setCurrentEvents(events);
    setIsLoading(false);
  };


  const selectSugeridos = () => {
    setIsLoading(true);
    setSelected("Sugeridos");
    loadHomeEventsRecommededUser();
  };

  const selectRecentes = () => {
    setIsLoading(true);
    setSelected("Recentes");
    loadHomeEvents();
  };


  const Selector = () => (
    <div className="flex flex-row justify-between items-center mx-32 mt-4 font-bold">
      <span
        className={`${
          selected === "Recentes" ? "border-b-2 p-2" : ""
        } hover:cursor-pointer`}
        onClick={selectRecentes}
      >
        Recentes
      </span>
      <span
        className={`${
          selected === "Sugeridos" ? "border-b-2 p-2" : ""
        } hover:cursor-pointer`}
        onClick={selectSugeridos}
      >
        Sugeridos
      </span>
    </div>
  );

  return (
  <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128">
          <div>
            <div className="mt-8 mx-8">
              <NavBar selected={"Profile"} />
              <br></br>
              <div className="text-xl font-semibold w-full flex gap-8">
                <div className="w-full flex ">
                  <div className="w-20 h-20">
                    <div className="flex flex-row items-center gap-2">
                      <div className="col-1 bg-white rounded-full p-4 ">
                        <MdPerson
                          size={48}
                          color={"#0C134F"}
                        />
                      </div>
                      <div></div>
                      <div className="text-white text-center p-2 rounded-full w-36">
                        <span>Alexandre de moraes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="flex flex-row items-center">
                <div className="flex flex-col items-center gap-8">
                  <h3>Nome</h3>
                </div>
                <div className="flex flex-col items-center gap-8">
                  <h2> Alexandre</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default ProfilePage;
