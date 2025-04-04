import {prisma} from '../../database/client.js'

export class GetAllQuadrasController{

    async handle(request,response){
        const quadras = await prisma.quadra.findMany()
        return response.json(quadras)
    }

}