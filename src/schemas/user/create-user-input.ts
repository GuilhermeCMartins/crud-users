import { z } from "zod";

export const createUserInput = z.object({
  email: z
    .string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),
  senha: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome não pode estar vazio"),
});

export type CreateUserInput = z.infer<typeof createUserInput>;
