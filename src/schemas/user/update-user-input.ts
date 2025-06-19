import { z } from "zod";

export const updateUserInput = z
  .object({
    email: z.string().email("Email inválido").optional(),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .optional(),
    name: z.string().min(1, "Nome não pode estar vazio").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualizar",
  });

export type UpdateUserInput = z.infer<typeof updateUserInput>;
