import { z } from "zod";
import { SubAreaSchema } from "./subAreasSchema";

export const AreaSchema = z.object({
  id: z.number().int().positive(),
  tabelaId: z.string(),
  nome: z.string(),
  macroArea: z.number().int().positive(),
  macroAreaId: z.number().int().positive(),
  subAreas: z.array(SubAreaSchema),
  Departamento: z.array(z.unknown()), // Precisa ser definido corretamente
});
