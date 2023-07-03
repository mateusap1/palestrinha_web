type PalestrinhaEvent = {
  publicId: string;
  name: string;
  description: string;
  eventType: "EventoAcademico" | "EventoCultural";
  urlMoreInfo: string;
  urlSubscribe: string;
  creatorName: string;
  majorEvent: string;
  relatedSubAreas: string[];
  startDate: string;
  endDate: string;
};

type SubArea = {
  nome: string;
  tabelaId: string;
};

type UserType = "Tecnico" | "Docente" | "Graduacao" | "PosGraduacao";

type User = {
  name: string;
  email: string;
  registration: string;
  userType: UserType;
  token: string;
};

type BackEndResponse = {
  success: boolean;
};

interface BackEndResponseFailure extends BackEndResponse {
  error: string;
}

interface SignInResponseSuccess extends BackEndResponse {
  name: string;
  email: string;
  registration: string;
  userType: UserType;
  token: string;
}

interface SignUpResponseSuccess extends BackEndResponse {}
