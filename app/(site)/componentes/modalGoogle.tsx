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

const GoogleModal: React.FC<Props> = ({ register, errors, onClose }) => {
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
    fotoUrl: session?.user?.image || '',
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      nombre: session?.user?.name || '',
      email: session?.user?.email || '',
      fotoUrl: session?.user?.image || '',
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
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-75" />
      <div className="bg-white p-6 rounded-lg z-20 relative">
        <button
          className="absolute top-0 right-0 m-2"
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
        <div className="absolute top-0 left-0 -mt-10 mx-auto">
          <img src={formData.fotoUrl} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-gray-200" />
        </div>
        <p>Falta información específica de Google.</p>
        <Input
          disabled={true}
          register={register}
          errors={errors}
          required
          id="nombre"
          label="Nombre"
          value={formData.nombre}
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
          value={formData.email}
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
         <div className="flex justify-end">
          <Boton onClick={handleSubmit} fullWidth>
            Registrar
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default GoogleModal;
