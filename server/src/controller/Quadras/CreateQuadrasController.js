import {prisma} from '../../database/client.js'

export class CreateQuadraController{

    async handle(request,response){
        try{

            const { nome } = request.body;

            // Verifica se o nome já existe no banco de dados
            const existingUser = await prisma.quadra.findUnique({
                where: { nome }
            });

            if (existingUser) {
                return response.status(400).json({ error: "Quadra já existente." });
            }

            // Criação da quadra
            const quadra = await prisma.quadra.create({
                data: {
                    nome
                }
            });

            return response.json(quadra);
        } catch (error) {
            console.error("Erro ao criar quadra:", error);
            return response.status(500).json({ error: "Erro ao criar quadra." });
        }
    }

}