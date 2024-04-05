'use client';
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
  contrasena: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  fechaNacimiento: string;
  ci: string;
  fotoUrl: string;
}

const AzureADModal: React.FC<Props> = ({ register, errors, onClose }) => {
  const { data: session } = useSession();

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
    setFormData(prevData => ({
      ...prevData,
      nombre: session?.user?.name || '',
      email: session?.user?.email || '',
    }));
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post('/api/agregar', formData)
      .then(response => {
        console.log('Usuario registrado exitosamente:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-75" />
      <div className="bg-white p-6 rounded-lg z-20">
      <button
        className="absolute top-0 right-0 m-2" // Ajusta los márgenes según sea necesario
        onClick={onClose}
        aria-label="Cerrar"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
            />
        </svg>
        </button>

        <p>Falta información específica de Azure AD.</p>
        <Input
          disabled
          register={register}
          errors={errors}
          required
          id="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <Input
          disabled
          register={register}
          errors={errors}
          required
          id="email"
          label="Correo Electrónico"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="contrasena"
          label="Contraseña del Sitio"
          type="password"
          value={formData.contrasena}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="telefono"
          label="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="direccion"
          label="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="ciudad"
          label="Ciudad"
          value={formData.ciudad}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="ci"
          label="Carnet de Identidad"
          value={formData.ci}
          onChange={handleChange}
        />
        <Input
          register={register}
          errors={errors}
          required
          id="fotoUrl"
          label="Foto"
          type="file"
          value={formData.fotoUrl}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <Boton onClick={handleSubmit} fullWidth>
            Registrar
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default AzureADModal;

