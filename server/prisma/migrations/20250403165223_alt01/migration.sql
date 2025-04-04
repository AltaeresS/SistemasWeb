-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "quadra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "quadraId" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reserva_quadraId_fkey" FOREIGN KEY ("quadraId") REFERENCES "quadra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "quadra_nome_key" ON "quadra"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "reserva_quadraId_dataHora_key" ON "reserva"("quadraId", "dataHora");
