'use client'
// AuthForm.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import GoogleButton from './componentes/GoogleButton';
import MicrosoftButton from './componentes/MicrosoftButton';
import Input from './componentes/Input';
import Boton from '@/app/Inicio/componentes/Boton';
import { toast } from 'react-hot-toast';
import AzureADModal from './componentes/modalAzure-ad';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [fotoUrl, setFotoUrl] = useState<string>('');

  const handleGoogleSignIn = async () => {
    await signIn('google');
    setSelectedProvider('google');
  };
  
  const handleMicrosoftSignIn = async () => {
    await signIn('azure-ad');
  };
  
  useEffect(() => {
    if (session?.status === 'authenticated') {
      setShowModal(true);
    }
  }, [session]);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: session?.data?.user?.name || '',
      email: session?.data?.user?.email || '',
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/agregar', { ...data, fotoUrl })
        .then((response) => {
          return response.data;
        })
        .then((user) => {
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
          <Input
            disabled={false}
            register={register}
            errors={errors}
            required
            id="contrasena"
            label="Contraseña"
            type="password"
          />
          <Boton fullWidth type="submit">
            {variant === 'LOGIN' ? 'Iniciar Sesión' : 'Registrarse'}
          </Boton>

          <div className="mt-6 flex justify-center">
            <div onClick={toggleVariant} className="cursor-pointer text-sm text-blue-500 hover:text-blue-700">
              {variant === 'LOGIN' ? '¿Necesitas una cuenta? Regístrate' : '¿Tienes una cuenta? Iniciar Sesión'}
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
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>
            <div>
              <MicrosoftButton onClick={handleMicrosoftSignIn} />
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black opacity-75" onClick={() => setShowModal(false)} />
            <div className="bg-white p-6 rounded-lg z-20">
              {/* Renderiza el modal específico según el proveedor seleccionado */}
              {session && session.status === 'authenticated' && (
                <AzureADModal
                  register={register}
                  errors={errors}
                  onClose={() => setShowModal(false)} // Pasar la función para cerrar el modal
                />
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AuthForm;

