import getCurrentUser from "./agarrarUsuario";

const obtenerRolUsuario = async () => {
  try {
    // Obtener el usuario actual
    const currentUser = await getCurrentUser();

    // Verificar si se encontró el usuario
    if (!currentUser) {
      console.error("Usuario no encontrado");
      return null;
    }

    // Acceder al campo "rol" del usuario
    const rolUsuario = currentUser.rol;

    return rolUsuario;
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return null;
  }
};

export default obtenerRolUsuario;
