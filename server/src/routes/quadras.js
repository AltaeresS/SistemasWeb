import { Router } from "express";
import { CreateQuadraController } from "../controller/Quadras/CreateQuadrasController.js";
import { GetAllQuadrasController } from "../controller/Quadras/GetAllQuadrasController.js";
import { GetByIdQuadraController } from "../controller/Quadras/GetByIdQuadrasController.js";
import { UpdateQuadraController } from "../controller/Quadras/UpdateQuadrasController.js";
import { DeleteQuadraController } from "../controller/Quadras/DeleteQuadrasController.js";

const quadraRouter = Router()

// CRUD para as cidades
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createQuadraController = new CreateQuadraController()
quadraRouter.post('/quadras', createQuadraController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllQuadrasController = new GetAllQuadrasController()
quadraRouter.get('/quadras', getAllQuadrasController.handle)

// Get By ID
const getByIdQuadraController = new GetByIdQuadraController()
quadraRouter.get('/quadras/:id', getByIdQuadraController.handle)


// ----------------------------------------------------------------------------------------------
// UPDATE -> U
const updateQuadraController = new UpdateQuadraController()
quadraRouter.put('/quadras/:id', updateQuadraController.handle)

// ----------------------------------------------------------------------------------------------
// DELETE -> D
const deleteQuadraController = new DeleteQuadraController()
quadraRouter.delete('/quadras/:id', deleteQuadraController.handle)

export {quadraRouter}