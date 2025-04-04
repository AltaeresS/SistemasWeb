/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `quadra` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quadra_nome_key" ON "quadra"("nome");
