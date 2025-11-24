import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';

import { Search, Clear, DirectionsBus, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { linhasAPI } from '../services/api';

const navItems = ['Home', 'Linhas', 'Perfil', 'Sobre nós'];

const Linhas = () => {
  const [linhas, setLinhas] = useState([]);
  const [linhaFiltrada, setLinhaFiltrada] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [idPesquisa, setIdPesquisa] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [linhaParaExcluir, setLinhaParaExcluir] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarLinhas();
  }, []);

  const carregarLinhas = async () => {
    setCarregando(true);
    setErro('');
    setLinhaFiltrada(null);
    try {
      const response = await linhasAPI.getAll();
      setLinhas(response.data.linhas);
    } catch (error) {
      setErro('Erro ao carregar linhas: ' + error.message);
    } finally {
      setCarregando(false);
    }
  };

  const pesquisarPorId = async () => {
    if (!idPesquisa.trim()) {
      setErro('Por favor, digite um ID para pesquisar');
      return;
    }

    setCarregando(true);
    setErro('');
    setLinhaFiltrada(null);

    try {
      const response = await linhasAPI.getById(idPesquisa);
      setLinhaFiltrada(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setErro(`Linha com ID ${idPesquisa} não encontrada`);
      } else {
        setErro('Erro ao buscar linha: ' + error.message);
      }
      setLinhaFiltrada(null);
    } finally {
      setCarregando(false);
    }
  };

  const limparPesquisa = () => {
    setIdPesquisa('');
    setLinhaFiltrada(null);
    setErro('');
    carregarLinhas();
  };

  const abrirDialogExclusao = (linha) => {
    setLinhaParaExcluir(linha);
    setDialogAberto(true);
  };

  const fecharDialogExclusao = () => {
    setDialogAberto(false);
    setLinhaParaExcluir(null);
  };

  const excluirLinha = async () => {
    if (!linhaParaExcluir) return;

    setCarregando(true);
    try {
      const novasLinhas = linhas.filter(linha => linha.id !== linhaParaExcluir.id);
      setLinhas(novasLinhas);
      setErro(`Linha "${linhaParaExcluir.nome_linha}" excluída com sucesso!`);
      fecharDialogExclusao();
      setTimeout(() => setErro(''), 3000);
    } catch (error) {
      setErro('Erro ao excluir linha: ' + error.message);
    } finally {
      setCarregando(false);
    }
  };

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

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
            textDecoration: 'underline'
          }}
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
            '&:hover': { textDecoration: 'underline' }
          }}
          onClick={() => navigate('/sobre-nos')}
        >
          Sobre nós
        </Typography>
      </Box>
        <Button variant="contained" color="error" onClick={() => { localStorage.removeItem('usuario'); navigate('/login'); }}>
          Sair
        </Button>
      </Box>

      
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, backgroundColor: '#FFB881' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ color: '#7f3c00' }}>
            Linhas de Ônibus
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/cadastro-linha')}
            startIcon={<Add />}
            sx={{ backgroundColor: '#FF8F4A', '&:hover': { backgroundColor: '#e07a38' } }}
          >
            Nova Linha
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#FFFFFF' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#7f3c00' }}>
            Pesquisar Linha por ID
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="ID da Linha"
              value={idPesquisa}
              onChange={(e) => setIdPesquisa(e.target.value)}
              placeholder="Ex: 1, 2, 3..."
              type="number"
              sx={{ flex: 1, backgroundColor: '#fff', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={pesquisarPorId}
              disabled={carregando}
              startIcon={carregando ? <CircularProgress size={20} /> : <Search />}
              sx={{ backgroundColor: '#FF8F4A', '&:hover': { backgroundColor: '#e07a38' } }}
            >
              Pesquisar
            </Button>
            <Button
              variant="outlined"
              onClick={limparPesquisa}
              disabled={carregando}
              startIcon={<Clear />}
              sx={{ color: '#7f3c00', borderColor: '#7f3c00', '&:hover': { borderColor: '#7f3c00' } }}
            >
              Limpar
            </Button>
          </Box>
        </Paper>

        {erro && (
          <Alert severity={erro.includes('excluída') ? 'success' : 'error'} sx={{ mb: 3 }}>
            {erro}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="primary" sx={{ mr: 2 }} />
                  <Typography color="#7f3c00" gutterBottom>Total de Linhas</Typography>
                </Box>
                <Typography variant="h4" component="div" color="#7f3c00">{linhas.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="secondary" sx={{ mr: 2 }} />
                  <Typography color="#7f3c00" gutterBottom>Companhias</Typography>
                </Box>
                <Typography variant="h4" component="div" color="#7f3c00">
                  {[...new Set(linhas.map(l => l.companhia))].length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['ID','Companhia','Nome da Linha','Lotação Máxima','Horário','Data de Criação','Ações'].map(header => (
                    <TableCell key={header} sx={{ fontWeight: 'bold', color: '#7f3c00' }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {carregando ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                      <Typography variant="body2" sx={{ mt: 1 }}>Carregando linhas...</Typography>
                    </TableCell>
                  </TableRow>
                ) : linhaFiltrada ? (
                  <TableRow hover key={linhaFiltrada.id}>
                    <TableCell><Chip label={linhaFiltrada.id} color="primary" size="small" /></TableCell>
                    <TableCell><Chip label={linhaFiltrada.companhia} variant="outlined" /></TableCell>
                    <TableCell>{linhaFiltrada.nome_linha}</TableCell>
                    <TableCell><Chip label={`${linhaFiltrada.lotacao_maxima} passageiros`} color="secondary" size="small" /></TableCell>
                    <TableCell>{linhaFiltrada.horario}</TableCell>
                    <TableCell>{formatarData(linhaFiltrada.data_criacao)}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => abrirDialogExclusao(linhaFiltrada)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : linhas.length > 0 ? (
                  linhas.map((linha) => (
                    <TableRow hover key={linha.id}>
                      <TableCell><Chip label={linha.id} color="primary" size="small" /></TableCell>
                      <TableCell><Chip label={linha.companhia} variant="outlined" /></TableCell>
                      <TableCell>{linha.nome_linha}</TableCell>
                      <TableCell><Chip label={`${linha.lotacao_maxima} passageiros`} color="secondary" size="small" /></TableCell>
                      <TableCell>{linha.horario}</TableCell>
                      <TableCell>{formatarData(linha.data_criacao)}</TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => abrirDialogExclusao(linha)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1" color="#7f3c00">Nenhuma linha cadastrada</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ color: '#7f3c00', borderColor: '#7f3c00' }}>
            Voltar ao Dashboard
          </Button>
          <Button variant="contained" onClick={carregarLinhas} disabled={carregando} sx={{ backgroundColor: '#7abf02', '&:hover': { backgroundColor: '#28bf02' } }}>
            Atualizar Lista
          </Button>
        </Box>
      </Container>

      <Dialog open={dialogAberto} onClose={fecharDialogExclusao}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a linha <strong>"{linhaParaExcluir?.nome_linha}"</strong> da companhia <strong>{linhaParaExcluir?.companhia}</strong>?
            <br /><br />
            <strong>Esta ação não pode ser desfeita.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialogExclusao} disabled={carregando}>Cancelar</Button>
          <Button onClick={excluirLinha} color="error" disabled={carregando} startIcon={carregando ? <CircularProgress size={16} /> : <Delete />}>
            {carregando ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#FF8F4A', color: '#fff', fontWeight: 'bold', borderTop: '2px solid #e07a38', mt: 'auto' }}>
        © 2025 Buscreen. Todos os direitos reservados.
      </Box>
    </Box>
  );
};

export default Linhas;
