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

  const user = await db.usuario.create({
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

  return NextResponse.json(user);
}