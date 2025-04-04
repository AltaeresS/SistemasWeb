import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import Login from "./Components/Login/Login"
import Cadastro from "./Components/Cadastro/Cadastro"
import ListaReservas from "./Components/Reservas/ListaReservas"
import CreateReserva from "./Components/Reservas/CreateReserva"
import UpdateReserva from "./Components/Reservas/UpdateReserva"

import ListaQuadras from "./Components/Quadras/ListaQuadras"
import CreateQuadra from "./Components/Quadras/CreateQuadras"
import UpdateQuadra from "./Components/Quadras/UpdateQuadras"

const AppRoutes = () => {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                
                <Route path="/Home" element={<ListaReservas />} />
                <Route path="/Home/CreateReserva" element={<CreateReserva />} />
                <Route path="/Home/UpdateReserva/:id" element={<UpdateReserva />} />

                <Route path="/Home_Admin" element={<ListaQuadras />} />
                <Route path="/Home_Admin/CreateQuadra" element={<CreateQuadra />} />
                <Route path="/Home_Admin/UpdateQuadra/:id" element={<UpdateQuadra />} />
            </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes;