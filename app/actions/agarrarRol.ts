import getCurrentUser from "./agarrarUsuario";

const obtenerRolUsuario = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.error("Usuario no encontrado");
      return null;
    }
    const rolUsuario = currentUser.rol;

    return rolUsuario;
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return null;
  }
};

export default obtenerRolUsuario;
