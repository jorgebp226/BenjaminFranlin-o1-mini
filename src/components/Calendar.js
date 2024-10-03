// src/components/Calendar.js
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { listVirtuds, getSemana } from '../graphql/queries';
import { createSemana, updateSemana } from '../graphql/mutations';
import { getWeekNumber, getCurrentWeek } from '../utils/dateUtils'; // Funciones personalizadas para manejar semanas
import './Calendar.css'; // Estilos de la página de calendario

// Configuración del cliente de GraphQL
const client = generateClient();

const Calendar = () => {
  const [virtudes, setVirtudes] = useState([]);
  const [semana, setSemana] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  // Al cargar el componente, obtenemos las virtudes y la semana actual
  useEffect(() => {
    const fetchVirtudes = async () => {
      try {
        const result = await client.graphql({ query: listVirtuds });
        setVirtudes(result.data.listVirtuds.items);
      } catch (error) {
        console.error('Error fetching virtudes:', error);
      }
    };

    const fetchSemana = async () => {
      try {
        const user = await Amplify.Auth.currentAuthenticatedUser(); // Obtenemos el usuario autenticado
        const semanaActual = getCurrentWeek();
        const result = await client.graphql({
          query: getSemana,
          variables: { userId: user.username, semana: semanaActual },
        });

        if (result.data.getSemana) {
          setSemana(result.data.getSemana); // Si la semana existe, la almacenamos
        } else {
          const virtudObjetivo = virtudes[getWeekNumber(new Date()) % 13];
          const nuevaSemana = {
            userId: user.attributes.sub,
            semana: semanaActual,
            virtudObjetivo: virtudObjetivo.id,
            dias: crearDiasDeSemana(virtudes),
          };
          const createResult = await client.graphql({
            query: createSemana,
            variables: { input: nuevaSemana },
          });
          setSemana(createResult.data.createSemana);
        }
      } catch (error) {
        console.error('Error fetching or creating semana:', error);
      }
    };

    fetchVirtudes().then(() => fetchSemana());
  }, [virtudes]);

  // Función para crear los días de la semana
  const crearDiasDeSemana = (virtudes) => {
    const dias = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(today);
      fecha.setDate(today.getDate() - today.getDay() + i + 1); // Calculamos el día (lunes a domingo)
      dias.push({
        fecha: fecha.toISOString().split('T')[0],
        virtudes: virtudes.map((virtud) => ({
          idVirtud: virtud.id,
          estado: 0,
        })),
      });
    }
    return dias;
  };

  // Manejamos los cambios en el estado de las virtudes
  const handleEstadoChange = async (fecha, idVirtud, nuevoEstado) => {
    const semanaActualizada = {
      ...semana,
      dias: semana.dias.map((dia) => {
        if (dia.fecha === fecha) {
          return {
            ...dia,
            virtudes: dia.virtudes.map((v) =>
              v.idVirtud === idVirtud ? { ...v, estado: nuevoEstado } : v
            ),
          };
        }
        return dia;
      }),
    };

    setSemana(semanaActualizada); // Actualizamos el estado local

    try {
      await client.graphql({
        query: updateSemana,
        variables: { input: semanaActualizada }, // Enviamos la actualización a través de la API GraphQL
      });
    } catch (error) {
      console.error('Error updating semana:', error);
    }
  };

  // Si no hemos cargado aún la semana, mostramos un mensaje de carga
  if (!semana) return <div>Cargando...</div>;

  const virtudObjetivo = virtudes.find((v) => v.id === semana.virtudObjetivo);
  const hoy = new Date().toISOString().split('T')[0];

  return (
    <div className="calendar-container">
      <h2>Virtud Objetivo de la Semana: {virtudObjetivo?.nombre}</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Virtudes</th>
            {semana.dias.map((dia) => (
              <th key={dia.fecha} className={dia.fecha === hoy ? 'highlight' : ''}>
                {new Date(dia.fecha).toLocaleDateString('es-ES', {
                  weekday: 'short',
                  day: 'numeric',
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {virtudes.map((virtud) => (
            <tr key={virtud.id}>
              <td>{virtud.nombre}</td>
              {semana.dias.map((dia) => {
                const estadoVirtud =
                  dia.virtudes.find((v) => v.idVirtud === virtud.id)?.estado || 0;
                const color =
                  estadoVirtud === 1
                    ? 'green'
                    : estadoVirtud === -1
                    ? 'red'
                    : 'white';
                return (
                  <td key={dia.fecha}>
                    <div
                      className="estado-circle"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        const nuevoEstado =
                          estadoVirtud === 1 ? -1 : estadoVirtud === -1 ? 0 : 1;
                        handleEstadoChange(dia.fecha, virtud.id, nuevoEstado);
                      }}
                    ></div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
