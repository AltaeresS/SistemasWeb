import { Router } from "express";
import { GetAllReservasByUserIDController } from "../controller/Reserva/GetAllReservasByUserIDController.js";
import { GetByIdReservasByUserIDController } from "../controller/Reserva/GetByIdReservasByUserIDController.js";
import { CreateReservaController } from "../controller/Reserva/CreateReservasController.js";
import { UpdateReservaController } from "../controller/Reserva/UpdateResevasController.js";
import { DeleteReservaController } from "../controller/Reserva/DeleteReservasController.js";

const reservaRouter = Router()

// CRUD para as cidades
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createReservaController = new CreateReservaController()
reservaRouter.post('/usuarios/:usuarioId/reservas', createReservaController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllReservasByUserIDController = new GetAllReservasByUserIDController()
reservaRouter.get('/usuarios/:id/reservas', getAllReservasByUserIDController.handle)

// Get By ID
const getByIdReservasByUserIDController = new GetByIdReservasByUserIDController()
reservaRouter.get('/usuarios/:userid/reservas/:reservaid', getByIdReservasByUserIDController.handle)


// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateReservaController = new UpdateReservaController()
reservaRouter.put('/usuarios/:userid/reservas/:reservaid', updateReservaController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteReservaController = new DeleteReservaController()
reservaRouter.delete('/usuarios/:userid/reservas/:reservaid', deleteReservaController.handle)

export {reservaRouter}