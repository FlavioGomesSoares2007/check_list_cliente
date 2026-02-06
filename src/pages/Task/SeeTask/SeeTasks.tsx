import { useEffect, useState } from "react";
import { SideBar } from "../../../Components/SideBar";
import "./SeeTaks.css";
import api from "../../../Services/api";

interface tarefas {
  id_list: number;
  nome: string;
  concluido: string;
}

export const SeeTasks = () => {
  const [tasks, setTasks] = useState<tarefas[]>([]);

  const cancelar = async (id_lista: number, nome: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/task/atualizar/${id_lista}`,
        {
          nome: nome,
          concluido: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await api.get("/task/tarefas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setTasks(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const concluir = async (id_lista: number, nome: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/task/atualizar/${id_lista}`,
        {
          nome: nome,
          concluido: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await api.get("/task/tarefas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setTasks(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const dados = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get("/task/tarefas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          setTasks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    dados();
  }, []);

  const apagar = async (id_list: number) => {
    try {
      await api.delete(`task/deleta/${id_list}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await api.get("/task/tarefas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        setTasks(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
return (
  <>
    <SideBar />
    <div>
      {tasks.length > 0 ? (
        tasks.map((dados: tarefas) => (
          <div
            key={dados.id_list}
            id="task"
            className={dados.concluido ? "taskTrue" : "taskFalse"}
          >
            <span>
              <strong>{dados.nome}</strong>
            </span>
            <button
              onClick={() => concluir(dados.id_list, dados.nome)}
              className={dados.concluido ? "none" : "concluir"}
            >
              concluir
            </button>
            <button
              onClick={() => cancelar(dados.id_list, dados.nome)}
              className={dados.concluido ? "cancelar" : "none"}
            >
              cancelar
            </button>
            <button id="apagar" onClick={() => apagar(dados.id_list)}>
              <strong>Apagar</strong>
            </button>
          </div>
        ))
      ) : (
        <p className="noTasks">Você ainda não tem nenhuma task cadastrada.</p>
      )}
    </div>
  </>
);
};
