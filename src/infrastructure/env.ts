import { envSchema } from "./env.schema";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Verifique as variáveis de ambiente", parsed.error.format());

  process.exit(1);
}

export const env = parsed.data;
