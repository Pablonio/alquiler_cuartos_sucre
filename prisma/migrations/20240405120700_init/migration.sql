-- CreateTable
CREATE TABLE "mensaje" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idEmisor" INTEGER NOT NULL,
    "idReceptor" INTEGER NOT NULL,

    CONSTRAINT "mensaje_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_idEmisor_fkey" FOREIGN KEY ("idEmisor") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_idReceptor_fkey" FOREIGN KEY ("idReceptor") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
