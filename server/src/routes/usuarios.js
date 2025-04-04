import { Router } from "express";
import { GetAllUsuarioController } from "../controller/Usuario/GetAllUsuarioController.js";
import { GetByIdlUsuarioController } from "../controller/Usuario/GetByIdlUsuarioController.js";
import { GetByEmailUsuarioController } from "../controller/Usuario/GetByEmaillUsuarioController.js";
import { CreateUsuariosController } from "../controller/Usuario/CreateUsuariosController.js";

const usuarioRouter = Router()

// CRUD para as cidades
// ----------------------------------------------------------------------------------------------
// CREATE -> C
const createUsuarioController = new CreateUsuariosController()
usuarioRouter.post('/usuarios', createUsuarioController.handle)

// ----------------------------------------------------------------------------------------------
// READ -> R
// Get All
const getAllUsuarioController = new GetAllUsuarioController()
usuarioRouter.get('/usuarios', getAllUsuarioController.handle)

// Get By ID
const getByIdlUsuarioController = new GetByIdlUsuarioController()
usuarioRouter.get('/usuarios/:id', getByIdlUsuarioController.handle)

// Get By EMAIL
const getByEmailUsuarioController = new GetByEmailUsuarioController()
usuarioRouter.post('/usuarios/login', getByEmailUsuarioController.handle);

// ----------------------------------------------------------------------------------------------
// UPDATE -> U


// ----------------------------------------------------------------------------------------------
// DELETE -> D


export {usuarioRouter}