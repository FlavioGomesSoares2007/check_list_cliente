import { z } from "zod";

export const cadastrarTaskschema = z.object({
  nome: z
    .string()
    .min(1, "o nome nao pode estar vazio")
    .max(25, "o max de caracteres sao apenas 25"),
});

export type cadastrarTaskFormData = z.infer<typeof cadastrarTaskschema>;
