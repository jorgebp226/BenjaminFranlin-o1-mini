import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { listVirtudes, listSemanas } from '../graphql/queries';
import { createSemana, updateSemana } from '../graphql/mutations';
import { getWeekNumber, getCurrentWeek } from '../utils/dateUtils'; // Funciones para obtener la semana actual
import './Calendar.css'; // CSS para estilizar el calendario

const Calendar = () => {
  const [virtudes, setVirtudes] = useState([]);
  const [semana, setSemana] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  useEffect(() => {
    const fetchVirtudes = async () => {
      // Obtener las 13 virtudes desde la base de datos
      const result = await API.graphql(graphqlOperation(listVirtudes));
      setVirtudes(result.data.listVirtudes.items);
    };

    const fetchSemana = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const semanaActual = getCurrentWeek();
      try {
        const result = await API.graphql(graphqlOperation(getSemana, { userId: user.attributes.sub, semana: semanaActual }));
        if (result.data.getSemana) {
          setSemana(result.data.getSemana);
        } else {
          // Crear nueva semana
          const virtudObjetivo = virtudes[(getWeekNumber(new Date()) % 13)];
          const nuevaSemana = {
            userId: user.attributes.sub,
            semana: semanaActual,
            virtudObjetivo: virtudObjetivo.id,
            dias: crearDiasDeSemana() // Función para crear los días de la semana con virtudes en estado 0
          };
          const createResult = await API.graphql(graphqlOperation(createSemana, { input: nuevaSemana }));
          setSemana(createResult.data.createSemana);
        }
      } catch (error) {
        console.error('Error fetching or creating semana:', error);
      }
    };

    fetchVirtudes();
    fetchSemana();
  }, [virtudes]);

  const crearDiasDeSemana = () => {
    const dias = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(today);
      fecha.setDate(today.getDate() - today.getDay() + i + 1); // Asumiendo que la semana empieza el lunes
      dias.push({
        fecha: fecha.toISOString().split('T')[0],
        virtudes: virtudes.map(virtud => ({
          idVirtud: virtud.id,
          estado: 0
        }))
      });
    }
    return dias;
  };

  const handleEstadoChange = async (fecha, idVirtud, nuevoEstado) => {
    const user = await Auth.currentAuthenticatedUser();
    const semanaActualizada = { ...semana };
    semanaActualizada.dias = semanaActualizada.dias.map(dia => {
      if (dia.fecha === fecha) {
        return {
          ...dia,
          virtudes: dia.virtudes.map(v => {
            if (v.idVirtud === idVirtud) {
              return { ...v, estado: nuevoEstado };
            }
            return v;
          })
        };
      }
      return dia;
    });
  
    try {
      await API.graphql(graphqlOperation(updateSemana, { input: semanaActualizada }));
      setSemana(semanaActualizada);
    } catch (error) {
      console.error('Error updating estado:', error);
    }
  };

  if (!semana) return <div>Cargando...</div>;

  const virtudObjetivo = virtudes.find(v => v.id === semana.virtudObjetivo);
  const hoy = new Date().toISOString().split('T')[0];

  return (
    <div className="calendar-container">
      <h2>Virtud Objetivo de la Semana: {virtudObjetivo?.nombre}</h2>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Virtudes</th>
            {semana.dias.map(dia => (
              <th key={dia.fecha} className={dia.fecha === hoy ? 'highlight' : ''}>
                {new Date(dia.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {virtudes.map(virtud => (
            <tr key={virtud.id}>
              <td>{virtud.nombre}</td>
              {semana.dias.map(dia => {
                const estadoVirtud = dia.virtudes.find(v => v.idVirtud === virtud.id)?.estado || 0;
                const color = estadoVirtud === 1 ? 'green' : estadoVirtud === -1 ? 'red' : 'white';
                return (
                  <td key={dia.fecha}>
                    <div
                      className="estado-circle"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        const nuevoEstado = estadoVirtud === 1 ? -1 : estadoVirtud === -1 ? 0 : 1;
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
