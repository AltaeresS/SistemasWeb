import {prisma} from '../../database/client.js'

export class CreateUsuariosController{

    async handle(request,response){
        try {
            const { nome, email, senha, contato, categoria } = request.body;

            // Verifica se o e-mail já existe no banco de dados
            const existingUser = await prisma.usuario.findUnique({
                where: { email }
            });

            if (existingUser) {
                return response.status(400).json({ error: "E-mail já cadastrado." });
            }

            // Criação do usuário
            const usuario = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha,
                    contato,
                    categoria
                }
            });

            return response.json(usuario);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return response.status(500).json({ error: "Erro ao criar usuário." });
        }
    }

}