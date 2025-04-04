import {prisma} from '../../database/client.js'

export class GetByIdlUsuarioController{

    async handle(request,response){
        // /usuaros/{id} <- request.params
        // /usuaros?{id} <- request.query

        const {id} = request.params

        const usuario = await prisma.usuario.findUnique({
            where:{
                id: parseInt(id)
            }
        })
        return response.json(usuario)
    }

}