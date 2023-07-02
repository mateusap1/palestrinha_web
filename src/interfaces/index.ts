import { z } from "zod";
import { loginUserSchema } from "../schemas/userSchemas";

export interface IUser {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
}

export interface ILoginRequest {
  token: string;
  user: IUser;
}

export type ILogin = z.infer<typeof loginUserSchema>;

export enum ITipoUsuario {
  Tecnico,
  Docente,
  Graduacao,
  PosGraduacao,
}

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  matricula: string;
  departamento: string;
  tipoUsuario: ITipoUsuario;
  subAreasInteresse: string[];
}

export interface IUsuarioRegister {
  nome: string;
  email: string;
  senha: string;
  matricula: string;
  departamento: string;
  tipoUsuario: ITipoUsuario;
  subAreasInteresse: string[];
}

export interface IMacroArea {
  id: number;
  nome: string;
  areas: Area[];
}

export interface Area {
  id: number;
  nome: string;
  macroArea: IMacroArea;
  subAreas: SubArea[];
}

export interface SubArea {
  id: number;
  nome: string;
  area: Area;
}

export enum TipoEvent {
  EventoAcademico,
  EventoCultural,
}

export interface IEvent {
  map: any;
  departamentoId: undefined;
  nome: string;
  descricao: string;
  tipoEvento: TipoEvent;
  urlMaisInfo?: string;
  urlInscricao?: string;
  criadorEmail: string;
  eventoMaiorId?: string;
  departamentoNome: string;
  dataInicio: Date;
  dataFim: Date;
  subAreasRelacionadas: SubArea[];
}

export interface IEventCreation {
  nome: string;
  descricao: string;
  tipoEvento: TipoEvent;
  urlMaisInfo?: string;
  urlInscricao?: string;
  eventoMaiorId?: string;
  departamentoNome: string;
  dataInicio: Date;
  dataFim: Date;
  subAreasRelacionadas: SubArea[];
}