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

const CadastroUsuario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    if (!formData.nome || !formData.email || !formData.senha) {
      setErro('Todos os campos são obrigatórios.');
      setCarregando(false);
      return;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      setCarregando(false);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem.');
      setCarregando(false);
      return;
    }

    try {
      console.log('Tentando cadastrar usuário:', formData);
      
      const response = await userAPI.cadastro({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      });

      console.log('Usuário cadastrado:', response.data);
      
      setSucesso('Usuário cadastrado com sucesso! Redirecionando para login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      if (error.response?.status === 409) {
        setErro('Este e-mail já está cadastrado.');
      } else if (error.response?.data?.mensagem) {
        setErro(error.response.data.mensagem);
      } else {
        setErro('Erro ao cadastrar usuário. Tente novamente.');
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
            Criar Conta
          </Typography>

          {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
          {sucesso && <Alert severity="success" sx={{ mb: 2 }}>{sucesso}</Alert>}

          <Box component="form" onSubmit={handleCadastro} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome Completo"
              name="nome"
              autoComplete="name"
              autoFocus
              value={formData.nome}
              onChange={handleChange}
              disabled={carregando}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
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
              autoComplete="new-password"
              value={formData.senha}
              onChange={handleChange}
              disabled={carregando}
              helperText="Mínimo 6 caracteres"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              id="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              disabled={carregando}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={carregando}
            >
              {carregando ? <CircularProgress size={24} /> : 'Criar Conta'}
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Já tem uma conta? Faça login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CadastroUsuario;