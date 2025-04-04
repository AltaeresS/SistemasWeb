import { prisma } from '../../database/client.js';

export class UpdateQuadraController {
    async handle(request, response) {
        try {
            const { id } = request.params;
            const { nome } = request.body;

            // Verifica se a quadra existe
            const existingQuadra = await prisma.quadra.findUnique({
                where: { id: parseInt(id) }
            });

            if (!existingQuadra) {
                return response.status(404).json({ error: "Quadra não encontrada." });
            }

            // Verifica se o novo nome já está em uso
            const duplicateQuadra = await prisma.quadra.findUnique({
                where: { nome }
            });

            if (duplicateQuadra && duplicateQuadra.id !== parseInt(id)) {
                return response.status(400).json({ error: "Já existe uma quadra com esse nome." });
            }

            // Atualiza a quadra
            const updatedQuadra = await prisma.quadra.update({
                where: { id: parseInt(id) },
                data: { nome }
            });

            return response.json(updatedQuadra);
        } catch (error) {
            console.error("Erro ao atualizar quadra:", error);
            return response.status(500).json({ error: "Erro ao atualizar quadra." });
        }
    }
}
