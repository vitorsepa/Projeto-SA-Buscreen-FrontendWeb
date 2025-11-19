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
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Person, 
  Edit, 
  Save, 
  Cancel,
  Visibility, 
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  // Pega os dados do usuário do localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleEditar = () => {
    setEditando(!editando);
    setErro('');
    setSucesso('');
    
    // Se está cancelando a edição, restaura os dados originais
    if (editando) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        senha: '',
        confirmarSenha: ''
      });
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    // Validações
    if (!formData.nome || !formData.email) {
      setErro('Nome e e-mail são obrigatórios.');
      setCarregando(false);
      return;
    }

    if (formData.senha && formData.senha.length < 6) {
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
      // Simula um delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ATUALIZA APENAS NO LOCALSTORAGE (frontend)
      const usuarioAtualizado = {
        ...usuario,
        nome: formData.nome,
        email: formData.email
      };

      // Salva no localStorage
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      
      setSucesso('Perfil atualizado com sucesso!');
      setEditando(false);
      
      // Limpa os campos de senha
      setFormData({
        ...formData,
        senha: '',
        confirmarSenha: ''
      });

      // Recarrega a página para refletir as mudanças
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      setErro('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  // Se não tem usuário logado, redireciona
  if (!usuario) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 4, 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        
        {/* Cabeçalho */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Person fontSize="large" color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Meu Perfil
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Gerencie suas informações pessoais
          </Typography>
        </Box>

        {/* Card Principal */}
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          
          {/* Cabeçalho do Card */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Informações da Conta
            </Typography>
            <Button
              variant={editando ? "outlined" : "contained"}
              startIcon={editando ? <Cancel /> : <Edit />}
              onClick={toggleEditar}
              disabled={carregando}
              size="small"
            >
              {editando ? 'Cancelar' : 'Editar'}
            </Button>
          </Box>

          {/* Alertas */}
          {erro && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {erro}
            </Alert>
          )}

          {sucesso && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {sucesso}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSalvar}>
            
            {/* Informações Atuais (quando não está editando) */}
            {!editando && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Nome Completo
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    {usuario.nome}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    E-mail
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    {usuario.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    ID do Usuário
                  </Typography>
                  <Typography variant="body1" sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    #{usuario.id}
                  </Typography>
                </Box>
              </Box>
            )}

            {editando && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  name="nome"
                  label="Nome Completo"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={carregando}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="email"
                  label="E-mail"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={carregando}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Alterar Senha (opcional)
                </Typography>

                <TextField
                  fullWidth
                  name="senha"
                  label="Nova Senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={handleChange}
                  disabled={carregando}
                  margin="normal"
                  placeholder="Deixe em branco para manter a atual"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleMostrarSenha}
                          edge="end"
                        >
                          {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="confirmarSenha"
                  label="Confirmar Nova Senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  disabled={carregando}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            {editando && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={carregando ? <CircularProgress size={20} /> : <Save />}
                disabled={carregando}
                size="large"
                sx={{ mt: 2 }}
              >
                {carregando ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            )}

          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/dashboard')}
              fullWidth
            >
              Voltar ao Dashboard
            </Button>
          </Box>

        </Paper>

      </Box>
    </Container>
  );
};

export default Perfil;