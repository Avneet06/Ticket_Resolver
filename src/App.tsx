import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import Layout from './components/Layout';
import AlertContainer from './components/AlertContainer';

function App() {
  return (
    <Router>
      <AlertProvider>
        <Layout />
        <AlertContainer />
      </AlertProvider>
    </Router>
  );
}

export default App;