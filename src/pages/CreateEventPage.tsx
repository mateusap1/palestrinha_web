import React, { useContext, useEffect, useState } from "react";

import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import { useBackEnd } from "../contexts/BackEndProvider";

import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

import { Modal } from "../components/Modal";

import Select, { SingleValue, MultiValue } from "react-select";
import DatePicker from "react-datepicker";

type CurrentPage =
  | "EventType"
  | "NameDescription"
  | "Urls"
  | "Dates"
  | "Department"
  | "SubAreas";

const CreateEventPage = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("EventType");

  const [eventType, setEventType] = useState<SingleValue<Option>>({
    label: "Evento Acadêmico",
    value: "EventoAcademico",
  });
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventMoreInfoURL, setMoreInfoURL] = useState<string>("");
  const [eventSubscriptionURL, setEventSubscriptionURL] = useState<string>("");
  const [eventStartDate, setEventStartDate] = useState<Date | null>(null);
  const [eventEndDate, setEventEndDate] = useState<Date | null>(null);
  const [eventDepartment, setEventDepartment] =
    useState<SingleValue<Option>>(null);
  const [eventSubAreas, setEventSubAreas] = useState<MultiValue<Option>>([]);

  const [initialSubAreas, setInitaialSubAreas] = useState<SubArea[] | null>(
    null
  );
  const [initialDepartments, setInitialDepartments] = useState<string[] | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { getDepartments, getSubAreas, createEvent } = useBackEnd()!;
  const { isUserSignedIn, user } = useUser()!;

  const navigate = useNavigate();

  useEffect(() => {
    loadCreateEventPage();
  }, []);

  const loadCreateEventPage = async () => {
    const departments = await getDepartments();
    const subAreas = await getSubAreas();

    setInitialDepartments(departments);
    setInitaialSubAreas(subAreas);
    setIsLoading(false);
  };

  const submitCreateEvent = async () => {
    if (eventType === null) {
      setError("Você precisa selecionar um tipo de evento!");
      return;
    }

    if (!user) {
      setError("Você precisa estar logado para criar um evento!");
      return;
    }

    if (!eventDepartment) {
      setError("Você precisa selecionar um departamento para criar um evento!");
    }

    if (!eventStartDate || !eventEndDate) {
      setError(
        "Você precisa selecionar uma data de início e fim para criar um evento!"
      );
    }

    createEvent(
      user,
      eventName,
      eventDescription,
      eventType!.value as EventType,
      eventMoreInfoURL === "" ? null : eventMoreInfoURL,
      eventSubscriptionURL === "" ? null : eventSubscriptionURL,
      eventDepartment!.value,
      eventStartDate!,
      eventEndDate!,
      eventSubAreas.map(({ value }) => value)
    )
      .then(() => {
        setSuccess("Evento criado com sucesso");
      })
      .catch((error) => setError(error));
  };

  const moveToNextPage = () => {
    switch (currentPage) {
      case "EventType":
        setCurrentPage("NameDescription");
        break;
      case "NameDescription":
        setCurrentPage("Urls");
        break;
      case "Urls":
        setCurrentPage("Dates");
        break;
      case "Dates":
        setCurrentPage("Department");
        break;
      case "Department":
        setCurrentPage("SubAreas");
        break;
      case "SubAreas":
        submitCreateEvent();
        break;
      default:
        return <></>;
    }
  };

  const moveToPreviousPage = () => {
    switch (currentPage) {
      case "EventType":
        navigate("/");
        break;
      case "NameDescription":
        setCurrentPage("EventType");
        break;
      case "Urls":
        setCurrentPage("NameDescription");
        break;
      case "Dates":
        setCurrentPage("Urls");
        break;
      case "Department":
        setCurrentPage("Dates");
        break;
      case "SubAreas":
        setCurrentPage("Department");
        break;
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="bg-secundary text-opposite min-h-screen">
        <div className="flex justify-center w-full">
          <div className="w-128">
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
                <div className="py-20">
                  <div>
                    {currentPage === "EventType" ? (
                      <div className="text-xl font-semibold w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-4 w-full">
                          <span>Qual tipo de evento é esse?</span>
                          <Select
                            className="text-black rounded-lg"
                            classNamePrefix="bg-opposite-pale"
                            value={eventType}
                            onChange={(value) => setEventType(value)}
                            options={[
                              {
                                value: "EventoAcademico",
                                label: "Evento Acadêmico",
                              },
                              {
                                value: "EventoCultural",
                                label: "Evento Cultural",
                              },
                            ]}
                          />
                        </div>
                      </div>
                    ) : currentPage === "NameDescription" ? (
                      <div className="text-xl font-semibold w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                          <span>Qual o nome do evento?</span>
                          <input
                            className="p-4 bg-opposite-pale text-black rounded-lg"
                            placeholder="Nome do evento"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <span>Escreva uma descrição breve do evento</span>
                          <textarea
                            className="w-full h-40 p-4 bg-opposite-pale text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={eventDescription}
                            onChange={(e) =>
                              setEventDescription(e.target.value)
                            }
                            placeholder={"Descreva o seu evento..."}
                          />
                        </div>
                      </div>
                    ) : currentPage === "Urls" ? (
                      <div className="text-xl font-semibold w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                          <span>
                            Escreva um link para obter mais informações sobre o
                            evento (opcional)
                          </span>
                          <input
                            className="p-4 bg-opposite-pale text-black rounded-lg"
                            value={eventMoreInfoURL}
                            onChange={(e) => setMoreInfoURL(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <span>
                            Escreva um link para se inscrever no evento
                            (opcional)
                          </span>
                          <input
                            className="p-4 bg-opposite-pale text-black rounded-lg"
                            value={eventSubscriptionURL}
                            onChange={(e) =>
                              setEventSubscriptionURL(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ) : currentPage === "Dates" ? (
                      <div className="text-xl font-semibold w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                          <span>Qual vai ser a data de início do evento?</span>
                          <DatePicker
                            placeholderText="Início"
                            className="text-black text-center p-2 rounded-full w-36"
                            selected={eventStartDate}
                            onChange={(date) => setEventStartDate(date)}
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <span>Qual vai ser a data de fim do evento?</span>
                          <DatePicker
                            placeholderText="Fim"
                            className="text-black text-center p-2 rounded-full w-36"
                            selected={eventEndDate}
                            onChange={(date) => setEventEndDate(date)}
                          />
                        </div>
                      </div>
                    ) : currentPage === "Department" ? (
                      <div className="text-xl font-semibold w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                          <span>Qual é o seu departamento?</span>
                          <Select
                            className="text-black rounded-lg"
                            classNamePrefix="bg-opposite-pale"
                            value={eventDepartment}
                            onChange={(value) => setEventDepartment(value)}
                            options={initialDepartments?.map((department) => ({
                              value: department,
                              label: department,
                            }))}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-xl font-semibold w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                          <span>Quais sub-áreas mais te interessam?</span>
                          <Select
                            className="text-black rounded-lg"
                            classNamePrefix="bg-opposite-pale"
                            isMulti
                            value={eventSubAreas}
                            onChange={(values) => setEventSubAreas(values)}
                            options={initialSubAreas?.map((subArea) => ({
                              value: subArea.tabelaId,
                              label: subArea.nome,
                            }))}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <button
                      className="border-2 border-white px-6 py-1 mt-8 rounded-full font-semibold opacity-80"
                      onClick={() => moveToPreviousPage()}
                    >
                      {currentPage !== "EventType"
                        ? "Voltar"
                        : "Voltar Para Home"}
                    </button>
                    <button
                      className="text-black bg-white px-6 py-1 mt-8 rounded-full font-semibold"
                      onClick={() => moveToNextPage()}
                    >
                      {currentPage === "SubAreas" ? "Criar Evento" : "Próximo"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={error !== null} onClose={() => setError(null)}>
        {error}
      </Modal>
      <Modal
        isOpen={success !== null}
        onClose={() => {
          setSuccess(null);
          navigate("/");
        }}
      >
        {success}
      </Modal>
    </>
  );
};

export default CreateEventPage;
