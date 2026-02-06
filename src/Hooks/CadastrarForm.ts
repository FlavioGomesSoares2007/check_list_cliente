import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastrarSchema, type CadastrarFormData } from "../Schema/CadastrarSchema";
import { cadastrarTaskschema, type cadastrarTaskFormData } from "../Schema/cadastrarTaskschema";
import { AtualizarDadosUserSchema, type AtualizarDadosUserType } from "../Schema/AtualizarDadosUserSchema";

export const useCadastrarForm = () => {
  const {
    register,          
    handleSubmit,    
    formState: { errors }, 
  } = useForm<CadastrarFormData>({
    resolver: zodResolver(cadastrarSchema),
    mode: "all",
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
export const cadastrarTask = () => {
  const {
    register,          
    handleSubmit,    
    formState: { errors }, 
  } = useForm<cadastrarTaskFormData>({
    resolver: zodResolver(cadastrarTaskschema),
    mode: "all",
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
export const updateUser = () => {
  const {
    register,          
    handleSubmit,    
    formState: { errors }, 
  } = useForm<AtualizarDadosUserType>({
    resolver: zodResolver(AtualizarDadosUserSchema),
    mode: "all",
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};