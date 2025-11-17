import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Dashboard from './pages/Dashboard';
import Linhas from './pages/Linhas';
import CadastroLinha from './pages/CadastroLinha';

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

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario || !usuario.id) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };
  
  // E use assim nas rotas:
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />

// Verifica se o usuário está logado
// Verifica se o usuário está realmente logado
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
          {/* Rota raiz redireciona para login ou dashboard */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          
          {/* Rotas públicas */}
          <Route 
            path="/login" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/cadastro" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <CadastroUsuario />} 
          />
          
          {/* Rotas protegidas */}
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;