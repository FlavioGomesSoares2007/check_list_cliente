import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import api from "../../../Services/api";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const navegar = useNavigate();

  const enviarDados = async (e: any) => {
    e.preventDefault();
    setCarregando(true);
    try {
      const response = await api.post("/login", {
        email: email,
        senha: senha,
      });
      localStorage.setItem("token", response.data);
      navegar("/task");
    } catch (err) {
      setErr(true);
      setEmail("");
      setSenha("");
      console.log(`ocorreu um error ao fazer o login ${err}`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      {err ? (
        <div id="divError">
          <h3>error ao Entrar</h3>
          <p>Email ou Senha invalido</p>
          <button
            onClick={() => {
              setErr(false);
            }}
          >
            voltar
          </button>
        </div>
      ) : (
        <h1 id="noneLogin">oi</h1>
      )}
      <form id="conteinerLogin" onSubmit={enviarDados}>
        <h1 id="tituloLogin">Entrar</h1>

        <div className="divInputLogin">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            id="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="divInputLogin">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSenha(e.target.value);
            }}
          />
        </div>

        <button type="submit">{carregando ? "Carregando..." : "Entrar"}</button>

        <span>
          ainda não tem uma conta? <Link to={"/cadastrar"}>cadastra_se</Link>
        </span>
      </form>
    </>
  );
};
