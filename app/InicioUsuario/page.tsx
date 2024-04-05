'use client'
// ClientePage.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "./cardCuartos/cardCuartos";

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

  const handleCardClick = (id: number) => {
    // Navega a la página "AboutRoom" con el ID del cuarto como parámetro en la URL
    router.push(`/AboutRoom/${id}`);
  };

  return (
    <div className="app">
      <h1>Lista de Cuartos</h1>
      <div className="card-container">
        {cuartos.map((cuarto) => (
          <Card key={cuarto.id} cuarto={cuarto}  />
        ))}
      </div>
    </div>
  );
};

export default ClientePage;
