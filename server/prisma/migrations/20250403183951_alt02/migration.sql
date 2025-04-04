/*
  Warnings:

  - Added the required column `email` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "quadra_nome_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "categoria" TEXT NOT NULL
);
INSERT INTO "new_usuario" ("categoria", "contato", "id", "nome") SELECT "categoria", "contato", "id", "nome" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
