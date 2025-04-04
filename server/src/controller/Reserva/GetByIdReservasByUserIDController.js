import { prisma } from "../../database/client.js";

export class GetByIdReservasByUserIDController {
  async handle(request, response) {
    const { userid, reservaid } = request.params;

    if (!userid || !reservaid) {
      return response.status(400).json({ error: "User ID and Reservation ID are required" });
    }

    try {
      const reserva = await prisma.reserva.findFirst({
        where: {
          id: parseInt(reservaid),
          usuarioId: parseInt(userid),
        },
        include: {
          quadra: {
            select: {
              nome: true,
            },
          },
        },
      });

      if (!reserva) {
        return response.status(404).json({ error: "Reservation not found" });
      }

      return response.json(reserva);
    } catch (error) {
      return response.status(500).json({ error: "Error fetching reservation" });
    }
  }
}
