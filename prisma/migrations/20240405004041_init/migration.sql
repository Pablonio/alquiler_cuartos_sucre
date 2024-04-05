/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoCuarto" AS ENUM ('GARZONIER');

-- CreateEnum
CREATE TYPE "EstadoCuarto" AS ENUM ('DESOCUPADO', 'EN_CONTRATO', 'ALQUILADO');

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "fechaNacimiento" TEXT,
    "fechaDeRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ci" TEXT NOT NULL,
    "rol" "UserRole" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuarto" (
    "id" SERIAL NOT NULL,
    "direccion" TEXT NOT NULL,
    "fotoUrlcuarto" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "tipo" "TipoCuarto" NOT NULL,
    "cantidadHabitaciones" DECIMAL(65,30) NOT NULL,
    "estado" "EstadoCuarto" NOT NULL,
    "propietarioId" INTEGER NOT NULL,

    CONSTRAINT "cuarto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentario" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cuartoId" INTEGER NOT NULL,
    "calificacion" INTEGER NOT NULL,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_telefono_key" ON "usuario"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_ci_key" ON "usuario"("ci");

-- AddForeignKey
ALTER TABLE "cuarto" ADD CONSTRAINT "cuarto_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_cuartoId_fkey" FOREIGN KEY ("cuartoId") REFERENCES "cuarto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
