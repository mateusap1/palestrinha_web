import { z } from "zod";
import { EventoSchema } from "../eventsSchemas";
//import { SubAreaSchema } from "../areasSchemas/subAreasSchema";

export const loginUserSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

const TipoUsuarioSchema = z.enum([
  "Tecnico",
  "Docente",
  "Graduacao",
  "PosGraduacao",
]);

export const userSchema: any = z.object({
  id: z.number().int().positive(),
  nome: z.string().nonempty(),
  email: z.string().email().nonempty(),
  senha: z.string().nonempty(),
  matricula: z.string().nonempty(),
  departamento: z.optional(z.number().int().positive()),
  departamentoId: z.optional(z.number().int().positive()),
  eventosCriados: z.array(EventoSchema),
  tipo: TipoUsuarioSchema,
  subAreasInteresse: z.array(z.undefined()),
});
