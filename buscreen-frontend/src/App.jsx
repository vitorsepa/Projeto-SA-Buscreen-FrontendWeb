import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Dashboard from './pages/Dashboard';
import Linhas from './pages/Linhas';
import CadastroLinha from './pages/CadastroLinha';
import Perfil from './pages/Perfil';
import SobreNos from './pages/SobreNos';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },  
  },
});

const ProtectedRoute = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario || !usuario.id) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };
  
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />

const isAuthenticated = () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return false;
    
    try {
      const userData = JSON.parse(usuario);
      return !!(userData && userData.id && userData.email);
    } catch (error) {
      localStorage.removeItem('usuario');
      return false;
    }
  };

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/login" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/cadastro" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <CadastroUsuario />} 
          />
          
          <Route 
            path="/dashboard" 
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/linhas" 
            element={isAuthenticated() ? <Linhas /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cadastro-linha" 
            element={isAuthenticated() ? <CadastroLinha /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/perfil" 
            element={isAuthenticated() ? <Perfil /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/sobre-nos" 
            element={isAuthenticated() ? <SobreNos /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}



export default App;