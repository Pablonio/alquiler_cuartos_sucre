import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    nombre,
    contrasena,
    telefono,
    direccion,
    ciudad,
    fotoUrl,
    fechaNacimiento,
    ci
  } = body;

  // Otherwise, create a new user
  const newUser = await db.usuario.create({
    data: {
      email,
      nombre,
      contrasena,
      telefono,
      direccion,
      ciudad,
      fotoUrl,
      fechaNacimiento,
      ci
    }
  });

  return NextResponse.json(newUser);
}
