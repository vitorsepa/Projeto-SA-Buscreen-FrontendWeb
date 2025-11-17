import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Dashboard - BusScreen
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Sair
          </Button>
        </Box>
        
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Bem-vindo, {usuario?.nome}!
        </Typography>

        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Funcionalidades
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mr: 2 }}
            onClick={() => navigate('/linhas')}
          >
            Ver Linhas de Ônibus
          </Button>
          <Button 
            variant="outlined"
            onClick={() => navigate('/cadastro-linha')}
          >
            Cadastrar Nova Linha
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;