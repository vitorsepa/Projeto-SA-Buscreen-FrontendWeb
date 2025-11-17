import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { userAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      setCarregando(false);
      return;
    }

    try {
        console.log('Iniciando login...');
        console.log('Email:', email);
        
        const response = await userAPI.login(email, senha);
        console.log('Resposta da API:', response.data);
        
        if (response.data.usuario) {
          localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
          console.log('Usuário salvo no localStorage');
          
          window.location.href = '/dashboard';
          return;

        } else {
          setErro('Resposta da API sem dados de usuário');
        }

    } catch (error) {
      console.error('Erro completo no login:', error);
      
      if (error.code === 'ECONNABORTED') {
        setErro('Tempo de conexão esgotado. O servidor pode estar iniciando. Tente novamente em alguns segundos.');
      } else if (error.response) {
        // Erro da API
        setErro(error.response.data?.mensagem || 'Erro ao fazer login. Verifique suas credenciais.');
      } else if (error.request) {
        // Erro de rede
        setErro('Erro de conexão. Verifique se o servidor está rodando.');
      } else {
        // Outros erros
        setErro('Erro inesperado. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom color="primary">
            BusScreen
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            Sistema de Gerenciamento
          </Typography>
          <Typography component="p" variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
            Faça login para acessar o sistema
          </Typography>

          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={carregando}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={carregando}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={carregando}
            >
              {carregando ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>
          </Box>

          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="caption" color="textSecondary">
              <strong>Para teste use:</strong><br />
              Email: teste@gmail.com<br />
              Senha: 123456
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;