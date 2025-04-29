import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Styles globaux
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import './i18n'; // Initialisation de i18next (multilingue)

// Créer la racine pour le rendu
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre l’application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);