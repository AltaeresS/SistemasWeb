import {prisma} from '../../database/client.js'

export class GetByIdQuadraController{

    async handle(request,response){
        // /usuaros/{id} <- request.params
        // /usuaros?{id} <- request.query

        const {id} = request.params

        const quadra = await prisma.quadra.findUnique({
            where:{
                id: parseInt(id)
            }
        })
        return response.json(quadra)
    }

}