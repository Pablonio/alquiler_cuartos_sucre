// /pages/api/cuartos.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      direccion,
      fotoUrlcuarto,
      precio,
      caracteristicas,
      tipo,
      cantidadHabitaciones,
      estado,
      email
    } = body;

    // Buscar al usuario por su email
    const usuario = await db.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Crear un nuevo cuarto asociado al usuario
    const nuevoCuarto = await db.cuarto.create({
      data: {
        direccion,
        fotoUrlcuarto,
        precio,
        caracteristicas,
        tipo,
        cantidadHabitaciones,
        estado,
        propietarioId: usuario.id,
      },
    });

    return NextResponse.json(nuevoCuarto);
  } catch (error) {
    console.error('Error al crear el cuarto:', error);
    return NextResponse.json({ message: 'Error al crear el cuarto' }, { status: 500 });
  }
}
