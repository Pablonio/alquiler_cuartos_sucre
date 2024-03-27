// Importaciones necesarias
import { authOptions } from "@/app/utilidades/OpcionesDeInicio";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };