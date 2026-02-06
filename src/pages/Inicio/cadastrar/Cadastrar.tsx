import { Link, useNavigate } from "react-router-dom";
import { useCadastrarForm } from "../../../Hooks/CadastrarForm";
import "./Cadastrar.css";
import api from "../../../Services/api";
import { useState } from "react";

export const Cadastrar = () => {
  const { register, handleSubmit, errors } = useCadastrarForm();
  const [carregar, setCarregar] = useState<boolean>(false);
  const navegar = useNavigate();

  const aoEnviar = async (dados: any) => {
    console.log("Sucesso! Dados validados:", dados);
    setCarregar(true);
    try {
      await api.post("/user", {
        email: dados.email,
        senha: dados.senha,
      });
      navegar("/");
    } catch (err) {
      console.log(`erro ao cadastrar ${err}`);
    } finally {
      setCarregar(false);
    }
  };

  return (
    <>
      <form id="conteinerCadastrar" onSubmit={handleSubmit(aoEnviar)}>
        <h1>Cadastrar</h1>

        <div className="divInputCadastrar">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        {errors.email && (
          <span className="erro-msg">{errors.email.message}</span>
        )}

        <div className="divInputCadastrar">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" {...register("senha")} />
        </div>
        {errors.senha && (
          <span className="erro-msg">{errors.senha.message}</span>
        )}

        <div className="divInputCadastrarSenha">
          <label htmlFor="senhaComfi">confirmar senha:</label>
          <input type="password" id="senhaComfi" {...register("senhaComfi")} />
        </div>
        {errors.senhaComfi && (
          <span className="erro-msg">{errors.senhaComfi.message}</span>
        )}

        <button type="submit">
          {carregar ? "Carregando..." : "Cadastrar"}
        </button>

        <span>
          Ja possui uma conta? <Link to={"/"}>Login</Link>
        </span>
      </form>
    </>
  );
};
