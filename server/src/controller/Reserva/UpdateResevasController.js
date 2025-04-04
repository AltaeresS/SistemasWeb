import { prisma } from "../../database/client.js";

export class UpdateReservaController {
  async handle(request, response) {
    const { reservaid, userid } = request.params;
    const { quadraId, dataHora } = request.body;

    if (!userid || !quadraId || !dataHora) {
      return response.status(400).json({ error: "All fields are required" });
    }

    try {
      // Verificar se a reserva existe
      const reservaExistente = await prisma.reserva.findUnique({
        where: { id: parseInt(reservaid) },
      });

      if (!reservaExistente) {
        return response.status(404).json({ error: "Reserva not found" });
      }

      // Verificar se já existe uma reserva para a mesma quadra e horário (exceto a atual)
      const conflitoReserva = await prisma.reserva.findFirst({
        where: {
          quadraId: parseInt(quadraId),
          dataHora: new Date(dataHora),
          NOT: { id: parseInt(reservaid) },
        },
      });

      if (conflitoReserva) {
        return response.status(400).json({ error: "Já existe uma reserva para este horário." });
      }

      // Atualizar a reserva
      const reservaAtualizada = await prisma.reserva.update({
        where: { id: parseInt(reservaid) },
        data: {
          usuarioId: parseInt(userid),
          quadraId: parseInt(quadraId),
          dataHora: new Date(dataHora),
        },
      });

      return response.status(200).json(reservaAtualizada);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Error updating reservation" });
    }
  }
}