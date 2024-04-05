'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "./cardCuartos/cardCuartos";
import Mapa from "./cardCuartos/Mapa";

interface Cuarto {
  id: number;
  direccion: string;
  fotoUrlcuarto: string;
  precio: number;
  caracteristicas: string;
  tipo: string;
  cantidadHabitaciones: number;
  estado: string;
  propietario: {
    nombre: string;
  };
}

const ClientePage = () => {
  const [cuartos, setCuartos] = useState<Cuarto[]>([]);
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getcuarto");
        const data = await response.json();
        setCuartos(data);
      } catch (error) {
        console.error("Error al obtener datos de cuartos:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Obtener la ubicación del usuario
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      error => {
        console.error('Error al obtener la ubicación del usuario:', error);
      }
    );
  }, []);

  const handleCardClick = (id: number) => {
    // Navega a la página "AboutRoom" con el ID del cuarto como parámetro en la URL
    router.push(`/AboutRoom/${id}`);
  };

  return (
    <div className="app">
      <h1>Cuartos</h1> {/* Título de la lista de cuartos */}
      <Mapa></Mapa>
      <p>Conoce tu ubicación</p> {/* Texto sobre el mapa */}
      <div className="card-container">
        {cuartos.map((cuarto) => (
          <Card key={cuarto.id} cuarto={cuarto} />
        ))}
      </div>

      <style jsx>{`
        .app {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          width: 100%;
        }

        @media only screen and (max-width: 768px) {
          .card-container {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default ClientePage;
