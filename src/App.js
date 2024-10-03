// src/App.js
import React from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsExports from './aws-exports'; // Archivo de configuración de Amplify
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import Progress from './components/Progress';
import Navbar from './components/Navbar';
import '@aws-amplify/ui-react/styles.css'; // Estilos por defecto de Amplify UI

// Configura Amplify con la configuración generada por 'amplify push'
Amplify.configure(awsExports);

// Genera el cliente GraphQL para interactuar con la API
const client = generateClient();

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
