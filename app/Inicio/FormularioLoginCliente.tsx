'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import GoogleButton from './componentes/GoogleButton';
import MicrosoftButton from './componentes/MicrosoftButton';
import Input from './componentes/Input';
import Boton from '@/app/Inicio/componentes/Boton';
import { toast } from 'react-hot-toast';
import AzureADModal from './componentes/modalAzure-ad';
import GoogleModal from './componentes/modalGoogle';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [showModalMicrosoft, setShowModalMicrosoft] = useState(false);
  const [showModalGoogle, setShowModalGoogle] = useState(false);
  const [fotoUrl, setFotoUrl] = useState<string>('');

  const handleSignIn = async (provider: 'google' | 'azure-ad') => {
    setIsLoading(true);
    if (provider === 'google') {
      await signIn(provider);
    } else if (provider === 'azure-ad') {
      await signIn(provider);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: '',
      email: '',
      contrasena: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      fechaNacimiento: '',
      ci: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    if (event) {
      event.preventDefault();
    }
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios
        .post('/api/agregar', { ...data, fotoUrl })
        .then((response) => {
          toast.success('Usuario registrado exitosamente');
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          toast.error('Something went wrong!');
        })
        .finally(() => setIsLoading(false));
    }
  };

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      if (session?.data?.user?.image === '') {
        setShowModalMicrosoft(true);
      } else {
        setShowModalGoogle(true);
      }
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border-2 bg-white border-black rounded-md">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {variant === 'LOGIN' ? 'Inicia Sesión' : 'Regístrate'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
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
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="fotoUrl"
                label="Foto"
                type="file"
                onChange={handleFileChange}
              />
              <Input
                disabled={false}
                register={register}
                errors={errors}
                required
                id="fechaNacimiento"
                label="Fecha de Nacimiento"
                type="date"
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
            id="email"
            label="Correo Electrónico"
            type="email"
          />
          {/* Input para la contraseña */}
          <Input
            disabled={false}
            register={register}
            errors={errors}
            required
            id="contrasena"
            label="Contraseña"
            type="password"
          />
          {/* Botón de enviar (iniciar sesión o registrarse) */}
          <Boton fullWidth type="submit">
            {variant === 'LOGIN' ? 'Iniciar Sesión' : 'Registrarse'}
          </Boton>
          {/* Enlace para alternar entre iniciar sesión y registrarse */}
          <div className="mt-6 flex justify-center">
            <div onClick={toggleVariant} className="cursor-pointer text-sm text-blue-500 hover:text-blue-700">
              {variant === 'LOGIN' ? '¿Necesitas una cuenta? Regístrate' : '¿Tienes una cuenta? Iniciar Sesión'}
            </div>
          </div>
        </form>

        {/* Botones de inicio de sesión */}
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
            {/* Botón de inicio de sesión con Google */}
            <div>
              <GoogleButton onClick={() => handleSignIn('google')} />
            </div>
            {/* Botón de inicio de sesión con Microsoft */}
            <div>
              <MicrosoftButton onClick={() => handleSignIn('azure-ad')} />
            </div>
          </div>
        </div>

        {/* Modales */}
        {/* Modal de Google */}
        {showModalGoogle && (
          <GoogleModal
            register={register}
            errors={errors}
            onClose={() => setShowModalGoogle(false)}
          />
        )}
        {/* Modal de Microsoft */}
        {showModalMicrosoft && (
          <AzureADModal
            register={register}
            errors={errors}
            onClose={() => setShowModalMicrosoft(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
