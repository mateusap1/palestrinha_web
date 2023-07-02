import { z } from "zod";
//import { userSchema } from "../userSchemas";
import { EventoSchema } from "../eventsSchemas";

export const SubAreaSchema = z.object({
  id: z.number().int().positive(),
  tabelaId: z.string(),
  nome: z.string(),
  area: z.number().int().positive(),
  areaId: z.number().int().positive(),
  usuarios: z.array(z.undefined()),
  eventos: z.array(EventoSchema),
});
