import { z } from "zod";

export const envSchema = z.object({
  DB_HOST: z.string().min(1, "DB_HOST é obrigatório"),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().min(1, "DB_USER é obrigatório"),
  DB_PASS: z.string().min(1, "DB_PASS é obrigatório"),
  DB_NAME: z.string().min(1, "DB_NAME é obrigatório"),
});
