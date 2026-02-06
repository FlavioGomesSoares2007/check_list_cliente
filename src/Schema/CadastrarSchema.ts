import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const cadastrarSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .regex(emailRegex, "Insira um formato de e-mail válido"),

  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),

  senhaComfi: z.string().min(1, "Confirme sua senha")

}).refine((data) => data.senha === data.senhaComfi, {
  message: "As senhas não coincidem",
  path: ["senhaComfi"], 
});


export type CadastrarFormData = z.infer<typeof cadastrarSchema>;
