import {prisma} from '../../database/client.js'

export class GetByEmailUsuarioController {
    async handle(request, response) {
        const { email, senha } = request.body;

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (senha !== usuario.senha) { // Comparação direta (não seguro!)
            return response.status(401).json({ error: 'Senha incorreta' });
        }

        return response.json({ message: 'Login bem-sucedido', usuario });
    }
}
