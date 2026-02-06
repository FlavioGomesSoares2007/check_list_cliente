import { useEffect, useState } from "react";
import { SideBar } from "../../Components/SideBar";
import { updateUser } from "../../Hooks/CadastrarForm";
import "./User.css";
import api from "../../Services/api";
import { set } from "zod";

export const User = () => {
  const { errors, handleSubmit, register } = updateUser();

  const [email, setEmail] = useState<string>();
  const [carregar, setCarregar] = useState<boolean>(false)

  useEffect(() => {
    const dados = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/user/dados", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };

    dados();
  }, []);

  const enviarDados = async (dados: any)=>{
    setCarregar(true)
    try {
        await api.patch("/user/atualizar",{
            email:dados.email,
            senha: dados.senha
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
    }catch(error){
    console.log(error);
  }finally{
    setCarregar(false)
  }
  }

  return (
    <>
      <SideBar />
      <form id="conteinerDados" onSubmit={handleSubmit(enviarDados)}>
        <h1 id="tituloDados">Alterar dados</h1>
        <div className="inputDados">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" value={email} {...register("email")} />
        </div>
        {errors.email && (
          <span className="errorDados">{errors.email.message}</span>
        )}
        <div className="inputDados">
          <label htmlFor="senha">senha:</label>
          <input type="text" id="senha" {...register("senha")} />
        </div>
        {errors.senha && (
          <span className="errorDados">{errors.senha.message}</span>
        )}
        <button type="submit">{carregar? "Carregando...":"Salvar"}</button>
      </form>
    </>
  );
};
