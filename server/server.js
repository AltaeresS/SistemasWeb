import express, { request, response } from 'express'
import { usuarioRouter } from './src/routes/usuarios.js'
import { reservaRouter } from './src/routes/reservas.js'
import { quadraRouter } from './src/routes/quadras.js'
import cors from "cors"

const server = express()
const PORT = 5000

// Routes
server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    })
})

server.use(express.json())
server.use(cors())
server.use(usuarioRouter)
server.use(reservaRouter)
server.use(quadraRouter)

//servidor rodar
server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})