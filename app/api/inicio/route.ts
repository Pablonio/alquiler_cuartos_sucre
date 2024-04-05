// api/inicio.js
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, contrasena } = body;

    // Verifica si el email existe en la base de datos
    const existingUser = await db.usuario.findUnique({ where: { email } });
    if (!existingUser) {
      // Si el email no existe, devuelve el rol "ANONIMO"
      return NextResponse.json({ rol: "ANONIMO" });
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    if (contrasena !== existingUser.contrasena) {
      // Si la contraseña no coincide, devuelve una respuesta 401 Unauthorized
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Devuelve todos los datos del usuario
    return NextResponse.json(existingUser);
  } catch (error) {
    // Si ocurre un error durante el proceso, devuelve una respuesta 500 Internal Server Error
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
