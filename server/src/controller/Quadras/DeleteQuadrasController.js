import { prisma } from '../../database/client.js';

export class DeleteQuadraController {
    async handle(request, response) {
        try {
            const { id } = request.params;

            // Verifica se a quadra existe
            const existingQuadra = await prisma.quadra.findUnique({
                where: { id: parseInt(id) }
            });

            if (!existingQuadra) {
                return response.status(404).json({ error: "Quadra não encontrada." });
            }

            // Deleta a quadra
            await prisma.quadra.delete({
                where: { id: parseInt(id) }
            });

            return response.json({ message: "Quadra deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar quadra:", error);
            return response.status(500).json({ error: "Erro ao deletar quadra." });
        }
    }
}