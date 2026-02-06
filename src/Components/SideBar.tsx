import { TbMenu2 } from "react-icons/tb";
import { MdOutlineArrowBackIos } from "react-icons/md";
import "./SideBar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SideBar = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const navegar = useNavigate()


  const exit = ()=>{
    localStorage.clear()
    navegar("/")
  }
  return (
    <>
      <div id="conteinerMenu">
        <button id="butaoMenu" onClick={() => setMenu(true)}>
          <TbMenu2 id="iconMenu" />
        </button>
      </div>
      <div id="menu" className={menu ? "abrirMenu" : "fecharMenu"}>
        <Link className="linkMenu" to={"/alterar/dados"}>
          <button>Alterar Dados</button>
        </Link>

        <Link className="linkMenu" to={"/cadastrar/task"}>
          <button>Cadastrar tarefas</button>
        </Link>

        <button onClick={exit} id="exit"> Sair</button>

        <button
          id="Back"
          className={menu ? "abrirMenu" : "fecharMenu"}
          onClick={() => setMenu(false)}
        >
          <MdOutlineArrowBackIos id="iconBack" />
        </button>
      </div>
    </>
  );
};
