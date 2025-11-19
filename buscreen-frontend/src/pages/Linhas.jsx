import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { Search, Clear, DirectionsBus, Delete, Add } from '@mui/icons-material';
import { linhasAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
      setErro('');
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
      console.log('Excluindo linha:', linhaParaExcluir.id);

      const novasLinhas = linhas.filter(linha => linha.id !== linhaParaExcluir.id);
      setLinhas(novasLinhas);
      
      setErro('');
      fecharDialogExclusao();
      
      setErro(`Linha "${linhaParaExcluir.nome_linha}" excluída com sucesso!`);
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
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Linhas de Ônibus
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/cadastro-linha')}
            startIcon={<Add />}
          >
            Nova Linha
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Pesquisar Linha por ID
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="ID da Linha"
              value={idPesquisa}
              onChange={(e) => setIdPesquisa(e.target.value)}
              placeholder="Ex: 1, 2, 3..."
              type="number"
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={pesquisarPorId}
              disabled={carregando}
              startIcon={carregando ? <CircularProgress size={20} /> : <Search />}
            >
              Pesquisar
            </Button>
            <Button
              variant="outlined"
              onClick={limparPesquisa}
              disabled={carregando}
              startIcon={<Clear />}
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
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="primary" sx={{ mr: 2 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Total de Linhas
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {linhas.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Linhas cadastradas no sistema
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsBus color="secondary" sx={{ mr: 2 }} />
                  <Typography color="textSecondary" gutterBottom>
                    Companhias
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {[...new Set(linhas.map(l => l.companhia))].length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Companhias diferentes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Companhia</strong></TableCell>
                  <TableCell><strong>Nome da Linha</strong></TableCell>
                  <TableCell><strong>Lotação Máxima</strong></TableCell>
                  <TableCell><strong>Horário</strong></TableCell>
                  <TableCell><strong>Data de Criação</strong></TableCell>
                  <TableCell><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carregando ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Carregando linhas...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : linhaFiltrada ? (
                  <TableRow hover key={linhaFiltrada.id}>
                    <TableCell>
                      <Chip label={linhaFiltrada.id} color="primary" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={linhaFiltrada.companhia} variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {linhaFiltrada.nome_linha}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${linhaFiltrada.lotacao_maxima} passageiros`} 
                        color="secondary" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{linhaFiltrada.horario}</TableCell>
                    <TableCell>{formatarData(linhaFiltrada.data_criacao)}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => abrirDialogExclusao(linhaFiltrada)}
                        disabled={carregando}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : linhas.length > 0 ? (
                  linhas.map((linha) => (
                    <TableRow hover key={linha.id}>
                      <TableCell>
                        <Chip label={linha.id} color="primary" size="small" />
                      </TableCell>
                      <TableCell>
                        <Chip label={linha.companhia} variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {linha.nome_linha}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={`${linha.lotacao_maxima} passageiros`} 
                          color="secondary" 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>{linha.horario}</TableCell>
                      <TableCell>{formatarData(linha.data_criacao)}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="error" 
                          onClick={() => abrirDialogExclusao(linha)}
                          disabled={carregando}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1" color="textSecondary">
                        Nenhuma linha cadastrada
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
          <Button 
            variant="contained" 
            onClick={carregarLinhas}
            disabled={carregando}
          >
            Atualizar Lista
          </Button>
        </Box>
      </Box>

      <Dialog
        open={dialogAberto}
        onClose={fecharDialogExclusao}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir a linha <strong>"{linhaParaExcluir?.nome_linha}"</strong> da companhia <strong>{linhaParaExcluir?.companhia}</strong>?
            <br />
            <br />
            <strong>Esta ação não pode ser desfeita.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialogExclusao} disabled={carregando}>
            Cancelar
          </Button>
          <Button 
            onClick={excluirLinha} 
            color="error" 
            autoFocus
            disabled={carregando}
            startIcon={carregando ? <CircularProgress size={16} /> : <Delete />}
          >
            {carregando ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Linhas;