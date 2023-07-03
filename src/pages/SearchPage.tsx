import React, { useEffect, useState } from "react";

import { Event } from "../components/Event";
import { LoadingIcon } from "../components/LoadingIcon";
import { NavBar } from "../components/NavBar";

import Select, { SingleValue, MultiValue } from "react-select";
import DatePicker from "react-datepicker";

import { MdCalendarMonth } from "react-icons/md";

import { useBackEnd } from "../contexts/BackEndProvider";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchName, setSearchName] = useState("");
  const [eventType, setEventType] = useState<SingleValue<Option>>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [department, setDepartment] = useState<SingleValue<Option>>(null);
  const [subAreas, setSubAreas] = useState<MultiValue<Option>>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [initialSubAreas, setInitaialSubAreas] = useState<SubArea[] | null>(
    null
  );
  const [initialDepartments, setInitialDepartments] = useState<string[] | null>(
    null
  );

  const { getSubAreas, getDepartments, getFilteredEvents } = useBackEnd()!;

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

  const clearFilters = () => {
    setSearchName("");
    setEventType(null);
    setStartDate(null);
    setEndDate(null);
    setDepartment(null);
    setSubAreas([]);
  }

  const searchFilters = () => {
    let filterString = `?`;
    if (searchName) {
      filterString += `&nome=${searchName}`;
    }
    if (eventType) {
      filterString += `&tipo=${eventType.value}`;
    }
    if (startDate) {
      filterString += `&dataInicio=${startDate}`;
    }
    if (endDate) {
      filterString += `&dataFim=${endDate}`;
    }
    if (department) {
      filterString += `&departamento="${department.value}"`;
    }
    if (subAreas) {
      for (const subArea of subAreas) {
        filterString += `&subAreasRelacionadas=${subArea.value}`;
      }
    }

    navigate(`/${filterString}`)
  }

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
    <div className="bg-secundary text-opposite min-h-screen">
      <div className="flex justify-center w-full">
        <div className="w-128">
          {isLoading ? (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-20 h-20">
                <LoadingIcon />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              <div className="mt-8 mx-8">
                <NavBar selected={"Search"} />
              </div>
              <div className="flex flex-col gap-8">
                <div className="w-full mb-4">
                  <input
                    className="p-4 mt-8 w-full bg-opposite-pale text-black rounded-lg"
                    placeholder="Pesquisar nome do evento..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <div className="text-xl font-semibold w-full flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span>Qual o tipo de evento?</span>
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
                <div className="text-xl font-semibold w-full flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span>Qual é a data de início e fim?</span>
                    <div className="flex flex-row items-center gap-2">
                      <MdCalendarMonth />
                      <div className="flex flex-row items-center gap-4">
                        <DatePicker
                          placeholderText="Início"
                          className="text-black text-center p-2 rounded-full w-36"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <DatePicker
                          placeholderText="Fim"
                          className="text-black text-center p-2 rounded-full w-36"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xl font-semibold w-full flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span>Qual o departamento do evento?</span>
                    <Select
                      className="text-black rounded-lg"
                      classNamePrefix="bg-opposite-pale"
                      value={department}
                      onChange={(value) => setDepartment(value)}
                      options={initialDepartments!.map((department) => ({
                        value: department,
                        label: department,
                      }))}
                    />
                  </div>
                </div>
                <div className="text-xl font-semibold w-full flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span>Quais as sub-áreas dos eventos?</span>
                    <Select
                      className="text-black rounded-lg"
                      classNamePrefix="bg-opposite-pale"
                      isMulti
                      value={subAreas}
                      onChange={(values) => setSubAreas(values)}
                      options={initialSubAreas!.map((subArea) => ({
                        value: subArea.tabelaId,
                        label: subArea.nome,
                      }))}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <button
                  className="border-2 border-white px-6 py-1 mt-8 rounded-full font-semibold opacity-80"
                  onClick={() => clearFilters()}
                >
                  Limpar
                </button>
                <button
                  className="text-black bg-white px-6 py-1 mt-8 rounded-full font-semibold"
                  onClick={() => searchFilters()}
                >
                  Buscar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
