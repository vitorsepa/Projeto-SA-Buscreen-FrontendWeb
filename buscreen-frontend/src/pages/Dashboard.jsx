import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  DirectionsBus,
  ListAlt,
  Person,
  Add
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Verifica se o usuário está logado
  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate('/login');
    }
  }, [usuario, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    // Força o redirecionamento
    window.location.href = '/login';
  };

  // Loading enquanto verifica
  if (!usuario || !usuario.id) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const menuItems = [
    {
      title: 'Ver Linhas',
      description: 'Visualize todas as linhas de ônibus cadastradas',
      icon: <ListAlt fontSize="large" color="primary" />,
      action: () => navigate('/linhas'),
      color: '#1976d2'
    },
    {
      title: 'Cadastrar Linha',
      description: 'Adicione uma nova linha de ônibus ao sistema',
      icon: <Add fontSize="large" color="secondary" />,
      action: () => navigate('/cadastro-linha'),
      color: '#dc004e'
    },
    {
      title: 'Minha Conta',
      description: 'Veja e edite suas informações de usuário',
      icon: <Person fontSize="large" color="success" />,
      action: () => alert('Funcionalidade em desenvolvimento!'),
      color: '#2e7d32'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              🚌 BusScreen
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Bem-vindo, <strong>{usuario.nome}</strong>!
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {usuario.email}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleLogout}>
            Sair
          </Button>
        </Box>

        {/* Cards de Estatísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="primary" sx={{ mr: 2 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Linhas Cadastradas
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  3
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total no sistema
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person color="success" sx={{ mr: 2 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Sua Conta
                  </Typography>
                </Box>
                <Typography variant="h6" component="div">
                  Ativa
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Desde: {new Date().toLocaleDateString('pt-BR')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ListAlt color="secondary" sx={{ mr: 2 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Companhias
                  </Typography>
                </Box>
                <Typography variant="h6" component="div">
                  3
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Biguaçu, Jotur, Estrela
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Menu Principal */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Menu Principal
        </Typography>
        
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
                onClick={item.action}
              >
                <CardContent sx={{ textAlign: 'center', pb: 1 }}>
                  {item.icon}
                  <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" variant="outlined">
                    Acessar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;