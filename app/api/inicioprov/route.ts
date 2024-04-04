import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    const {
      email,
      contrasena
    } = body;

    // Check if the email exists in the database
    const existingUser = await db.usuario.findUnique({ where: { email } });
    if (!existingUser) {
      // If the email doesn't exist, return a 404 Not Found response
      return NextResponse.json({ message: "Correo electrónico no encontrado" }, { status: 404 });
    }

    // Return the role of the user
    return NextResponse.json({ rol: existingUser.rol });
  } catch (error) {
    // If any error occurs during the process, return a 500 Internal Server Error response
    console.error("Error en el proceso:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
