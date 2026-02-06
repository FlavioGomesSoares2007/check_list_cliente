import * as z from "zod"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AtualizarDadosUserSchema = z.object({
    email: z.string().min(1,"o email não pode ser vazio").regex(emailRegex, "tem q ser um email valido"),

    senha: z.string().min(6, "a senha nao pode ser menor q 6 digitos")
})

export type AtualizarDadosUserType = z.infer< typeof AtualizarDadosUserSchema>