// src/App.js
import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; // Asegúrate de que este archivo existe y está correctamente configurado
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import Progress from './components/Progress';
import Navbar from './components/Navbar';
import '@aws-amplify/ui-react/styles.css'; // Estilos por defecto para los componentes de Amplify

// Configura Amplify con la configuración generada por 'amplify push'
Amplify.configure(awsExports);

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
