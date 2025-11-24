import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SobreNos = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  // Se não tem usuário, redireciona
  if (!usuario) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFB881' }}>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FF8F4A',
        color: '#fff',
        px: 3,
        py: 1.5,
        fontWeight: 'bold'
      }}>
        <Typography variant="h6" sx={{ cursor: 'default' }}>
          Buscreen
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography
            sx={{
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate('/dashboard')}
          >
            Home
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate('/linhas')}
          >
            Linhas
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate('/perfil')}
          >
            Perfil
          </Typography>
          <Typography
            sx={{
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            Sobre nós
          </Typography>
        </Box>

        <Button variant="contained" color="error" onClick={handleLogout}>
          Sair
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, backgroundColor: '#FFB881' }}>
        
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#7f3c00', fontWeight: 'bold' }}>
            Sobre Nós
          </Typography>
          <Typography variant="h6" sx={{ color: '#7f3c00' }}>
            Conheça nossa equipe e nossa missão
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFFFFF', mx: 'auto', maxWidth: 1200 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#7f3c00', mb: 3, textAlign: 'center' }}>
                Nossos colaboradores
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#f8f9fa', height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: '#7f3c00' }}>
                        👨‍💻 Vítor Costa
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Desenvolvedor Back e Front (Desktop)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#f8f9fa', height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: '#7f3c00' }}>
                        🧑‍💻 Vicenzo P
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Desenvolvedor Mobile
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card sx={{ backgroundColor: '#f8f9fa', height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: '#7f3c00' }}>
                        👨‍💻 João P
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Desenvolvedor Frontend
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFFFFF', height: '100%', textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#7f3c00', mb: 3 }}>
                Nossa Missão
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#333' }}>
                Facilitar a vida de quem depende do transporte público, tornando a locomoção mais previsível e eficiente.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFFFFF', height: '100%', textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#7f3c00', mb: 3 }}>
                Nossa Visão
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#333' }}>
                Ser referência em mobilidade urbana inteligente, promovendo inovação e tecnologia acessível para todos.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFFFFF', mx: 'auto', maxWidth: 1200 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#7f3c00', mb: 3, textAlign: 'center' }}>
                Nossos Valores
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>🚀</Typography>
                    <Typography variant="h6" sx={{ color: '#7f3c00', mb: 2 }}>Inovação</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Buscamos sempre as melhores soluções tecnológicas
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>🤝</Typography>
                    <Typography variant="h6" sx={{ color: '#7f3c00', mb: 2 }}>Colaboração</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Trabalhamos em equipe para alcançar resultados extraordinários
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>🎯</Typography>
                    <Typography variant="h6" sx={{ color: '#7f3c00', mb: 2 }}>Qualidade</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Comprometidos com a excelência em cada detalhe
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>❤️</Typography>
                    <Typography variant="h6" sx={{ color: '#7f3c00', mb: 2 }}>Acessibilidade</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tecnologia para todos, sem distinção
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

        </Grid>

        {/* Botão Voltar */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/dashboard')}
            sx={{ 
              backgroundColor: '#FF8F4A', 
              '&:hover': { backgroundColor: '#e07a38' },
              px: 4,
              py: 1.5
            }}
          >
            Voltar ao Dashboard
          </Button>
        </Box>

      </Container>

      {/* Footer */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 2, 
        backgroundColor: '#FF8F4A', 
        color: '#fff', 
        fontWeight: 'bold', 
        borderTop: '2px solid #e07a38', 
        mt: 'auto' 
      }}>
        © 2025 Buscreen. Todos os direitos reservados.
      </Box>

    </Box>
  );
};

export default SobreNos;