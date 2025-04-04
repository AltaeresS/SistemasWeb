import { prisma } from "../../database/client.js";

export class GetAllReservasByUserIDController {
  async handle(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: "User ID is required" });
    }

    try {
      const reservas = await prisma.reserva.findMany({
        where: {
          usuarioId: parseInt(id),
        },
        include: {
          quadra: {
            select: {
              nome: true,
            },
          },
        },
      });
      return response.json(reservas);
    } catch (error) {
      return response.status(500).json({ error: "Error fetching reservations" });
    }
  }
}