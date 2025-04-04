import { prisma } from "../../database/client.js";

export class DeleteReservaController {
  async handle(request, response) {
    const { reservaid } = request.params;

    if (!reservaid) {
      return response.status(400).json({ error: "Reservation ID is required" });
    }

    try {
      // Verificar se a reserva existe
      const reservaExistente = await prisma.reserva.findUnique({
        where: { id: parseInt(reservaid) },
      });

      if (!reservaExistente) {
        return response.status(404).json({ error: "Reserva not found" });
      }

      // Deletar a reserva
      await prisma.reserva.delete({
        where: { id: parseInt(reservaid) },
      });

      return response.status(200).json({ message: "Reserva deleted successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Error deleting reservation" });
    }
  }
}
