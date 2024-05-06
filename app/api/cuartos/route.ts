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
    const usuarios = await db.usuario.findMany({
      where: {
        email: email
      }
    });

    // Verificar si se encontró algún usuario con el correo electrónico proporcionado
    if (usuarios.length === 0) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Utilizar el ID del primer usuario encontrado para crear el cuarto asociado
    const nuevoCuarto = await db.cuarto.create({
      data: {
        direccion,
        fotoUrlcuarto,
        precio,
        caracteristicas,
        tipo,
        cantidadHabitaciones,
        estado,
        propietarioId: usuarios[0].id, // Utilizamos el ID del primer usuario encontrado
      },
    });

    return NextResponse.json(nuevoCuarto);

  } catch (error) {
    console.error('Error al crear el cuarto:', error);
    return NextResponse.json({ message: 'Error al crear el cuarto' }, { status: 500 });
  }
}
