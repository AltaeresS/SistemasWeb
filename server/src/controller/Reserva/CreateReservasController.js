import { prisma } from "../../database/client.js";

export class CreateReservaController {
  async handle(request, response) {
    const { usuarioId } = request.params;
    const { quadraId, dataHora } = request.body;

    if (!usuarioId || !quadraId || !dataHora) {
      return response.status(400).json({ error: "All fields are required" });
    }

    try {
      // Verificar se já existe uma reserva para a mesma quadra e horário
      const reservaExistente = await prisma.reserva.findFirst({
        where: {
          quadraId: parseInt(quadraId),
          dataHora: new Date(dataHora),
        },
      });

      if (reservaExistente) {
        return response.status(400).json({ error: "Já existe uma reserva para este horário." });
      }

      // Criar a reserva
      const reserva = await prisma.reserva.create({
        data: {
          usuarioId: parseInt(usuarioId),
          quadraId: parseInt(quadraId),
          dataHora: new Date(dataHora), // Corrigido o nome do campo e a conversão
        },
      });

      return response.status(201).json(reserva);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Error creating reservation" });
    }
  }
}