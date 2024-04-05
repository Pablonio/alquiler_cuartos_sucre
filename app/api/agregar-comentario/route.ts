// /pages/api/agregar-comentario.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, contenido, cuartoId, calificacion } = body;

    // Verificar si el usuario existe
    const existingUser = await db.usuario.findUnique({ where: { email } });
    if (!existingUser) {
      // Si el usuario no existe, devuelve un error
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Crear el comentario asociado al usuario y al cuarto
    const nuevoComentario = await db.comentario.create({
      data: {
        contenido,
        usuarioId: existingUser.id, // Utiliza el ID del usuario existente
        cuartoId,
        calificacion // Agrega la calificación del comentario
      },
    });

    return NextResponse.json(nuevoComentario);
  } catch (error) {
    console.error('Error al agregar el comentario:', error);
    return NextResponse.json({ message: 'Error al agregar el comentario' }, { status: 500 });
  }
}
