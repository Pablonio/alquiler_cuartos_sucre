'use client'
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Boton from "./Boton";
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Props {
  register: any;
  errors: any;
  onClose: () => void;
}

interface FormData {
  nombre: string;
  email: string;
  contrasena?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  fechaNacimiento?: string;
  ci?: string;
  fotoUrl?: string;
}

const AzureADModal: React.FC<Props> = ({ register, errors, onClose }) => {
  const { data: session } = useSession();

  // Inicializa el estado local con los datos de sesión
  const [formData, setFormData] = useState<FormData>({
    nombre: session?.user?.name || '',
    email: session?.user?.email || '',
    contrasena: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    fechaNacimiento: '',
    ci: '',
    fotoUrl: '',
  });

  useEffect(() => {
    // Actualiza los datos del formulario cuando cambian los datos de sesión
    setFormData((prevData) => ({
      ...prevData,
      nombre: session?.user?.name || '',
      email: session?.user?.email || '',
    }));
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post('/api/agregar', formData)
      .then((response) => {
        console.log('Usuario registrado exitosamente:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error al crear el usuario:', error);
      });
  };

  return (
    <>
      <p>Falta información específica de Azure AD.</p>
      <Input
        disabled={true}
        register={register}
        errors={errors}
        required
        id="nombre"
        label="Nombre"
        value={formData.nombre} // Usa el valor almacenado en formData
        onChange={handleChange}
      />
      <Input
        disabled={true}
        register={register}
        errors={errors}
        required
        id="email"
        label="Correo Electrónico"
        type="email"
        value={formData.email} // Usa el valor almacenado en formData
        onChange={handleChange}
      />

      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="contrasena"
        label="Contraseña del Sitio"
        type="password"
        onChange={handleChange}
      />
      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="telefono"
        label="Teléfono"
        onChange={handleChange}
      />
      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="direccion"
        label="Dirección"
        onChange={handleChange}
      />
      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="ciudad"
        label="Ciudad"
        onChange={handleChange}
      />
      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="fechaNacimiento"
        label="Fecha de Nacimiento"
        type="date"
        onChange={handleChange}
      />
      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="ci"
        label="Carnet de Identidad"
        onChange={handleChange}
      />
      <Input
        disabled={false}
        register={register}
        errors={errors}
        required
        id="fotoUrl"
        label="Foto"
        type="file"
        onChange={handleChange}
      />
      <div className="flex justify-end">
        {/* Renderiza un botón para enviar el formulario */}
        <Boton onClick={handleSubmit} fullWidth>
          Registrar
        </Boton>
      </div>
    </>
  );
};

// Exporta el componente AzureADModal
export default AzureADModal;
