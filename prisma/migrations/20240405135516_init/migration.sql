/*
  Warnings:

  - You are about to drop the `comentario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cuarto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mensaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_cuartoId_fkey";

-- DropForeignKey
ALTER TABLE "comentario" DROP CONSTRAINT "comentario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "cuarto" DROP CONSTRAINT "cuarto_propietarioId_fkey";

-- DropForeignKey
ALTER TABLE "mensaje" DROP CONSTRAINT "mensaje_idEmisor_fkey";

-- DropForeignKey
ALTER TABLE "mensaje" DROP CONSTRAINT "mensaje_idReceptor_fkey";

-- DropTable
DROP TABLE "comentario";

-- DropTable
DROP TABLE "cuarto";

-- DropTable
DROP TABLE "mensaje";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "Usuario" (
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

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuarto" (
    "id" SERIAL NOT NULL,
    "direccion" TEXT NOT NULL,
    "fotoUrlcuarto" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "tipo" "TipoCuarto" NOT NULL,
    "cantidadHabitaciones" DECIMAL(65,30) NOT NULL,
    "estado" "EstadoCuarto" NOT NULL,
    "propietarioId" INTEGER NOT NULL,

    CONSTRAINT "Cuarto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaDeRegistroComentario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "cuartoId" INTEGER NOT NULL,
    "calificacion" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idEmisor" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefono_key" ON "Usuario"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_ci_key" ON "Usuario"("ci");

-- AddForeignKey
ALTER TABLE "Cuarto" ADD CONSTRAINT "Cuarto_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_cuartoId_fkey" FOREIGN KEY ("cuartoId") REFERENCES "Cuarto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_idEmisor_fkey" FOREIGN KEY ("idEmisor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
