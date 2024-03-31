'use client'
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Input from '@/app/Inicio/componentes/Input';
import Boton from '@/app/Inicio/componentes/Boton';
import GoogleButton from '@/app/Inicio/componentes/GoogleButton';
import MicrosoftButton from '@/app/Inicio/componentes/MicrosoftButton';

type Variante = 'INICIO_SESION' | 'REGISTRAR';

export interface DatosFormulario {
  nombre: string;
  correo: string;
  contraseña: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  foto: string; // Cambiado a string
  fechaNacimiento: string;
  ci: string;
}

const Formulario = () => {
  const { status } = useSession();
  const [variante, setVariante] = useState<Variante>('INICIO_SESION');
  const [datosAdicionalesRequeridos, setDatosAdicionalesRequeridos] = useState<boolean>(true);
  const { register, handleSubmit, formState: { errors } } = useForm<DatosFormulario>({
    defaultValues: {
      correo: '',
      contraseña: '',
    }
  });

  useEffect(() => {
    if (status === 'authenticated' && variante === 'REGISTRAR') {
      setDatosAdicionalesRequeridos(true);
    }
  }, [status, variante]);
  
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border-2 bg-white border-black rounded-md">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {variante === 'INICIO_SESION' ? 'Inicia Sesión' : 'Regístrate'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="/api/registrar" method="post">
          {variante === 'REGISTRAR' && datosAdicionalesRequeridos && (
            <>
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="nombre"
                label="Nombre"
              />
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="telefono"
                label="Teléfono"
              />
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="direccion"
                label="Dirección"
              />
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="ciudad"
                label="Ciudad"
              />
              <input
                disabled={false}
                {...register("foto")} // Cambiado aquí
                type="file"
              />
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="fechaNacimiento"
                label="Fecha de Nacimiento"
                type='date'
              />
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="ci"
                label="Carnet de Identidad"
              />
            </>
          )}
          <Input
            disabled={false}
            register={register}
            errors={errors}
            required
            id="correo"
            label="Correo Electrónico"
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
          <Boton fullWidth type="submit" >
            {variante === 'INICIO_SESION' ? 'Iniciar Sesión' : 'Registrarse'}
          </Boton>

          <div className="mt-6 flex justify-center">
            <div onClick={() => setVariante(variante === 'INICIO_SESION' ? 'REGISTRAR' : 'INICIO_SESION')} className="cursor-pointer text-sm text-blue-500 hover:text-blue-700">
              {variante === 'INICIO_SESION' ? '¿Necesitas una cuenta? Regístrate' : '¿Tienes una cuenta? Iniciar Sesión'}
            </div>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Iniciar Sesión con</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <GoogleButton onClick={() => signIn('google')} />
            </div>
            <div>
              <MicrosoftButton onClick={() => signIn('azure-ad')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
