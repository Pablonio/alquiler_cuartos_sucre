// pages/api/registrar.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { tursoClient } from '@/app/utilidades/turso/route';
import { DatosFormulario } from '@/app/Inicio/FormularioLoginCliente';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData: DatosFormulario = req.body;
      const result = await añadirCliente(formData);
      res.status(200).json({ message: 'Cliente registrado con éxito', data: result });
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al registrar el cliente' });
    }
  } else {
    // Permitir solo el método POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function añadirCliente(datos: DatosFormulario) {
  const result = await tursoClient().execute({
    sql: 'INSERT INTO clientes (nombre, correo, contraseña, telefono, direccion, ciudad, foto, fechaNacimiento, ci) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    args: [
      datos.nombre, 
      datos.correo, 
      datos.contraseña, 
      datos.telefono, 
      datos.direccion, 
      datos.ciudad, 
      datos.foto,
      datos.fechaNacimiento, 
      datos.ci
    ],
  });

  return result;
}
