import React, { useContext, useEffect, useState } from "react";
import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import { useBackEnd } from "../contexts/BackEndProvider";

import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

type Selection = "Recentes" | "Sugeridos";

const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, "dd MMM, HH:mm");

  return formattedDate;
};

const HomePage = () => {
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
    <div className="flex flex-row justify-center items-center mx-32 mt-6 font-bold gap-10">
      <span
        className={`${selected === "Recentes" ? "border-b-2" : ""
          } hover:cursor-pointer`}
        onClick={selectRecentes}
      >
        Recentes
      </span>
      <span
        className={`${selected === "Sugeridos" ? "border-b-2" : ""
          } hover:cursor-pointer`}
        onClick={selectSugeridos}
      >
        Sugeridos
      </span>
    </div>
  );

  return (
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full h-full">
        <div className="w-128 max-md:w-80">
          <div>
            <div className="mt-8 mx-8">
              <NavBar selected={"Home"} />
            </div>
            {isLoading ? (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-20 h-20">
                  <LoadingIcon />
                </div>
              </div>
            ) : (
              <div>
                <Selector />
                {currentEvents!.length === 0 && (
                  <div className="mt-12 w-full text-center">
                    Não existem eventos ainda :(
                  </div>
                )}
                <div>
                  <div className="flex justify-center">
                    {(user!.userType === "Docente" ||
                      user!.userType === "Tecnico") && (
                        <button
                          className="border-2 border-white px-6 py-1 mt-8 mb-8 rounded-full font-semibold"
                          onClick={() => navigate("/create-event")}
                        >
                          Criar Evento
                        </button>
                      )}
                  </div>

                  <div>
                    {currentEvents!.map(
                      ({ publicId, startDate, endDate, name, description }) => (
                        <Event
                          publicId={publicId}
                          startDate={formatDateString(startDate)}
                          endDate={formatDateString(endDate)}
                          name={name}
                          description={description}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
