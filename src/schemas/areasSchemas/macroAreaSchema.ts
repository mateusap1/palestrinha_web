import { z } from "zod";
import { AreaSchema } from "./areaSchema";

export const MacroAreaSchema = z.object({
  id: z.number().int().positive(),
  tabelaId: z.string(),
  nome: z.string(),
  area: z.array(AreaSchema),
});
