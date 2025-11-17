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
  Link
} from '@mui/material';
import { userAPI } from '../services/api';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

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

    try {
      console.log('🔍 Iniciando login...');
      
      const response = await userAPI.login(email, senha);
      console.log('✅ Resposta da API:', response.data);
      
      if (response.data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        console.log('💾 Usuário salvo no localStorage');
        
        window.location.href = '/dashboard';
        return;
      } else {
        setErro('Resposta da API sem dados de usuário');
      }
      
    } catch (error) {
      console.error('❌ Erro completo:', error);
      
      if (error.code === 'ECONNABORTED') {
        setErro('Tempo de conexão esgotado. O servidor pode estar iniciando.');
      } else if (error.response) {
        setErro(`Erro ${error.response.status}: ${error.response.data?.mensagem || 'Credenciais inválidas'}`);
      } else if (error.request) {
        setErro('Erro de conexão. Verifique: 1) Sua internet 2) Se o servidor está online');
      } else {
        setErro('Erro inesperado: ' + error.message);
      }
    } finally {
      setCarregando(false);
    }
  };

  const testWithExample = () => {
    setEmail('teste@gmail.com');
    setSenha('123456');
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
            🚌 BusScreen
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

          {/* Link para cadastro */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/cadastro" variant="body2">
              Não tem uma conta? Cadastre-se
            </Link>
          </Box>

          {/* Botão de teste rápido */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="outlined" size="small" onClick={testWithExample}>
              Preencher com dados de teste
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;