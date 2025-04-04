import {prisma} from '../../database/client.js'

export class GetAllUsuarioController{

    async handle(request,response){
        const usuarios = await prisma.usuario.findMany()
        return response.json(usuarios)
    }

}