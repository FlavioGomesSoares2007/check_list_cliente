import { useNavigate } from "react-router-dom";
import { SideBar } from "../../../Components/SideBar";
import { cadastrarTask } from "../../../Hooks/CadastrarForm";
import api from "../../../Services/api";
import "./createTask.css";
import { useState } from "react";

export const CreateTask = () => {
  const { register, errors, handleSubmit } = cadastrarTask();
  const [carregar, setCarregar] = useState<boolean>(false)

  const navegar = useNavigate()

  const enviarDados = async (dados:any)=>{
    setCarregar(true)
    try {
        await api.post("task",{
         nome: dados.nome
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        navegar("/task")
    } catch (error) {
        console.log(error);
        
    }finally{
        setCarregar(false)
    }
  }

  return (
    <>
      <SideBar />
      <form id="conteinerCreate" onSubmit={handleSubmit(enviarDados)}>
        <h1 id="tituloCreate">tarefa</h1>

        <div className="inputCreate">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" {...register("nome")}/>
        </div>
        {errors.nome &&(
            <span id="errorCreate">{errors.nome.message}</span>
        )}
        <button type="submit">{carregar? "Carregando...": "Salvar"}</button>
      </form>
    </>
  );
};
