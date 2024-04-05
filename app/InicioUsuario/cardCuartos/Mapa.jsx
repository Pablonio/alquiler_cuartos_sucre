'use client'
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    if (!document.getElementById('map').classList.contains('leaflet-container')) {
      const newMap = L.map('map').setView([51.505, -0.09], 16);
      setMap(newMap);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(newMap);
    }
  }, []);

  useEffect(() => {
    if (map) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const userLatLng = [latitude, longitude];

          if (!userMarker) {
            const marker = L.marker(userLatLng, { icon: L.icon({ iconUrl: '/R.ico', iconSize: [32, 32], iconAnchor: [16, 32] }) }).addTo(map);
            setUserMarker(marker);
          } else {
            userMarker.setLatLng(userLatLng);
          }

          map.setView(userLatLng, 16);
        },
        error => {
          console.error('Error al obtener la ubicación del usuario:', error);
        }
      );

      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const userLatLng = [latitude, longitude];

            userMarker.setLatLng(userLatLng);
            map.setView(userLatLng, 16);
          },
          error => {
            console.error('Error al obtener la ubicación del usuario:', error);
          }
        );
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [map, userMarker]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default Mapa;