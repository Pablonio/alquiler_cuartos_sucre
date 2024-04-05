'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import AuthForm from "../Inicio/page";
import CommentCard from "./componente/cardComentario";

interface Comment {
    id: number;
    usuario: string;
    contenido: string;
    calificacion: number;
    fechaDeRegistroComentario: Date; // Cambiar el tipo a Date
}

function AboutRoom() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const session = useSession();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    const selectedRoomString = localStorage.getItem("selectedRoom");
    if (selectedRoomString) {
      const room = JSON.parse(selectedRoomString);
      setSelectedRoom(room);
      fetchComments(room.id);
    }
  }, []);

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCommentContent(event.target.value);
  };

  const handleRatingChange = (newRating: number): void => {
    setRating(newRating);
  };

  const sendComment = async (email: string): Promise<void> => {
    try {
      const response = await axios.post("/api/agregar-comentario", {
        email: email,
        contenido: commentContent,
        calificacion: rating,
        cuartoId: selectedRoom.id
      });
      console.log("Respuesta de la API:", response.data);
      console.log("Comentario enviado exitosamente");
      setCommentContent("");
      setRating(0);
      fetchComments(selectedRoom.id);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!session) {
      toggleModal();
    } else {
      sendComment(session.data?.user?.email as string);
    }
  };

  const fetchComments = async (cuartoId: string): Promise<void> => {
    try {
      const response = await axios.post("/api/getComentario", { cuartoId });
      setComments(response.data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  if (!selectedRoom) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Detalles del Cuarto</h1>
      <div className="flex flex-wrap items-start">
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
          <img className="w-full mb-4" src={selectedRoom.fotoUrlcuarto} alt="Foto del cuarto" />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <p className="font-bold">Dirección: {selectedRoom.direccion}</p>
            <p className="mb-2">Precio: {selectedRoom.precio}</p>
            <p className="mb-2">Características: {selectedRoom.caracteristicas}</p>
            <p className="mb-2">Tipo: {selectedRoom.tipo}</p>
            <p className="mb-2">Cantidad de Habitaciones: {selectedRoom.cantidadHabitaciones}</p>
            <p className="mb-2">Estado: {selectedRoom.estado}</p>
            <p className="mb-2">Propietario: {selectedRoom.propietario.nombre}</p>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => console.log("Chatea con el arrendador")}>
            Chatea con el arrendador
          </button>
        </div>
      </div>
      {/* Modal de inicio de sesión */}
      {isModalOpen && <AuthModal onClose={toggleModal} />}
      {/* Formulario de envío de comentario */}
      <form onSubmit={handleFormSubmit} className="mt-4">
        {/* Campo de entrada para el contenido del comentario */}
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={commentContent}
            onChange={handleCommentChange}
            placeholder="Escribe tu comentario aquí..."
            className="bg-gray-100 rounded p-2 mr-2 flex-grow"
          />
          {/* Componente de calificación */}
          <Rating
            rating={rating}
            onChange={handleRatingChange}
          />
        </div>
        {/* Botón de enviar comentario */}
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Enviar Comentario
        </button>
      </form>
      {/* Mostrar los comentarios */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Comentarios</h2>
        <div className="mt-4">
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="mb-4">
                <CommentCard comentario={comment} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Componente de modal de inicio de sesión
function AuthModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <AuthForm />
        <button onClick={onClose} className="text-blue-500 mt-4">
          Cancelar
        </button>
      </div>
    </div>
  );
}

// Componente de calificación en estrellitas
function Rating({ rating, onChange }: { rating: number; onChange: (newRating: number) => void }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-yellow-500 cursor-pointer" : "text-gray-500 cursor-pointer"}
          onClick={() => onChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default AboutRoom;
