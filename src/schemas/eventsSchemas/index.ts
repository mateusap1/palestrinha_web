import { z } from "zod";
//import { SubAreaSchema } from "../areasSchemas/subAreasSchema";
const TipoEventoSchema = z.enum(["EventoAcademico", "EventoCultural"]);

export const EventoSchema: any = z.object({
  id: z.number().int().positive(),
  public_id: z.string(),
  nome: z.string(),
  descricao: z.string(),
  tipoEvento: TipoEventoSchema,
  urlMaisInfo: z.string().optional(),
  urlInscricao: z.string().optional(),
  criador: z.number().int().positive(),
  criadorId: z.number().int().positive(),
  eventoMaior: z.number().int().positive().optional(),
  eventoMaiorId: z.number().int().positive().optional(),
  eventosMenores: z.array(z.unknown()), // Precisa ser definido corretamente
  departamento: z.number().int().positive().optional(),
  departamentoId: z.number().int().positive().optional(),
  subAreasRelacionadas: z.array(z.undefined()), // Precisa ser definido corretamente
  dataInicio: z.date(),
  dataFim: z.date(),
});
