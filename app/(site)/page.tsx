
'use client'
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './componentes/Input';
import Boton from './componentes/Boton';
import GoogleButton from './componentes/GoogleButton';
import MicrosoftButton from './componentes/MicrosoftButton';
import { toast } from 'react-hot-toast';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [fotoUrl, setFotoUrl] = useState<string>('');
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const router = useRouter();

  const handleSignIn = async (provider: 'google' | 'azure-ad') => {
    setIsLoading(true);
    signIn(provider);
  };

  const {
    register,
    handleSubmit,
    setValue,
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
    if (files && files.length > 0 && variant === 'REGISTER') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoUrl(reader.result as string);
        setShowPhotoUpload(false); // Ocultar el botón de subir foto después de cargarla con éxito
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    try {
      if (event) {
        event.preventDefault();
      }
      setIsLoading(true);
  
      let response;
      if (variant === 'LOGIN') {
        response = await axios.post('/api/inicio', { email: data.email, contrasena: data.contrasena });
      } else {
        response = await axios.post('/api/agregar', { ...data, fotoUrl });
      }
  
      if (variant === 'LOGIN') {
        const rol = response.data.rol;
        switch (rol) {
          case 'USUARIO':
            router.push('/InicioUsuario');
            break;
          case 'PROPIETARIO':
            router.push('/InicioPropietario');
            break;
          case 'ADMIN':
            router.push('/InicioAdmin');
            break;
          case 'BANEADO':
            router.push('/InicioBaneado');
            break;
          default:
            router.push('/');
            break;
        }
      } else {
        toast.success('Usuario registrado exitosamente');
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/');
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.data?.user) {
      setValue('nombre', session.data.user.name);
      setValue('email', session.data.user.email);
      if (session.data.user.image) {
        setFotoUrl(session.data.user.image);
      } else {
        setShowPhotoUpload(true);
      }
    } else {
      setShowPhotoUpload(true);
    }
  }, [session, setValue]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-white border border-black rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          {variant === 'LOGIN' ? 'Inicia Sesión' : 'Regístrate'}
        </h2>
        {variant === 'REGISTER' && fotoUrl && (
          <img src={fotoUrl} alt="Foto de perfil" className="mx-auto rounded-full w-24 h-24 mb-4" />
        )}
        {variant === 'REGISTER' && showPhotoUpload && (
          <div className="flex justify-center mb-4">
            <label htmlFor="upload-photo" className="cursor-pointer">
              <img src='./'></img>
              <input id="upload-photo" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex justify-center">
            <div onClick={() => setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')} className="cursor-pointer text-sm text-blue-500 hover:text-blue-700">
              {variant === 'LOGIN' ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Iniciar Sesión'}
            </div>
          </div>
        </form>
        {variant === 'LOGIN' && (
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
                <GoogleButton onClick={() => handleSignIn('google')} />
              </div>
              <div>
                <MicrosoftButton onClick={() => handleSignIn('azure-ad')} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
