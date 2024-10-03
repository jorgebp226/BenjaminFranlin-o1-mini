import React, { useEffect, useState } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listSemanas } from '../graphql/queries';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getVirtudRating } from '../utils/dataProcessing'; // Función para procesar datos

const Progress = () => {
  const [semanaList, setSemanaList] = useState([]);
  const [virtudes, setVirtudes] = useState([]);
  const [dataGrafico, setDataGrafico] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const result = await API.graphql(graphqlOperation(listSemanas, { filter: { userId: { eq: user.attributes.sub } } }));
      setSemanaList(result.data.listSemanas.items);
      // Obtener las virtudes para los labels
      const virtudesResult = await API.graphql(graphqlOperation(listVirtudes));
      setVirtudes(virtudesResult.data.listVirtudes.items);
    };
    fetchData();
  }, []);

  const handleGenerateGraph = () => {
    const filteredSemanas = semanaList.filter(semana => {
      const semanaDate = new Date(semana.semana.split('-')[0], 0, 1 + (semana.semana.split('-')[1] - 1) * 7);
      return semanaDate >= new Date(fechaInicio) && semanaDate <= new Date(fechaFin);
    });
    const processedData = getVirtudRating(filteredSemanas, virtudes);
    setDataGrafico(processedData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Progreso de Virtudes</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Fecha Inicio:
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Fecha Fin:
          <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
        </label>
        <button onClick={handleGenerateGraph} style={{ marginLeft: '10px' }}>Generar Gráfico</button>
      </div>
      {dataGrafico.length > 0 && (
        <LineChart width={800} height={400} data={dataGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semana" />
          <YAxis />
          <Tooltip />
          <Legend />
          {virtudes.map(virtud => (
            <Line key={virtud.id} type="monotone" dataKey={virtud.nombre} stroke="#8884d8" />
          ))}
        </LineChart>
      )}
    </div>
  );
};

export default Progress;
