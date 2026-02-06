import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Inicio/login/Login";
import { Cadastrar } from "./pages/Inicio/cadastrar/Cadastrar";
import { SeeTasks } from "./pages/Task/SeeTask/SeeTasks";
import { CreateTask } from "./pages/Task/createTask/createTask";
import { User } from "./pages/User/User";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/task" element={<SeeTasks />} />
        <Route path="/cadastrar/task" element={<CreateTask/>} />
        <Route path="/alterar/dados" element={<User/>} />
      </Routes>
    </>
  );
}

export default App;
