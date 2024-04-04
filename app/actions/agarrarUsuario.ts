import { db } from "../../lib/db";
import getSession from "./agarrarSesion"
const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.usuario.findUnique({
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    console.error("Error al obtener el usuario actual:", error);
    return null;
  }
};

export default getCurrentUser;
