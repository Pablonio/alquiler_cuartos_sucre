'use client'
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Input from './componentes/Input';
import Button from './componentes/Boton';
import GoogleButton from './componentes/GoogleButton';
import MicrosoftButton from './componentes/MicrosoftButton'; // Corregido el nombre del componente

type Variante = 'INICIO_SESION' | 'REGISTRAR';

interface DatosFormulario {
  nombre?: string;
  correo: string;
  contraseña: string;
}

const Formulario = () => {
  const { status } = useSession();
  const [variante, setVariante] = useState<Variante>('INICIO_SESION');

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Usuario autenticado');
    }
  }, [status]);

  const { register, handleSubmit, formState: { errors } } = useForm<DatosFormulario>({
    defaultValues: {
      correo: '',
      contraseña: '',
    }
  });

  const onSubmit = (data: DatosFormulario) => {
    console.log(data); // Aquí conectarías con tu lógica de autenticación
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border-2 bg-white border-black rounded-md">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {variante === 'INICIO_SESION' ? 'Inicia Sesion' : 'Registrate'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variante === 'REGISTRAR' && (
            <Input
              disabled={false}
              register={register}
              errors={errors}
              required
              id="nombre"
              label="Nombre"
            />
          )}
          <Input
            disabled={false}
            register={register}
            errors={errors}
            required
            id="correo"
            label="Correo electrónico"
            type="email"
          />
          <Input
            disabled={false}
            register={register}
            errors={errors}
            required
            id="contraseña"
            label="Contraseña"
            type="password"
          />
          <Button disabled={false} fullWidth type="submit" >
            {variante === 'INICIO_SESION' ? 'Iniciar sesión' : 'Registrar'}
          </Button>

          <div className="mt-6 flex justify-center">
            <div onClick={() => setVariante(variante === 'INICIO_SESION' ? 'REGISTRAR' : 'INICIO_SESION')} className="cursor-pointer text-sm text-blue-500 hover:text-blue-700">
              {variante === 'INICIO_SESION' ? '¿Necesitas una cuenta? Registrate' : '¿Tienes una cuenta? Iniciar sesión'}
            </div>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Iniciar Sesion con</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <GoogleButton onClick={() => signIn('google')} />
            </div>
            <div>
              <MicrosoftButton onClick={() => signIn('azure-ad')}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
