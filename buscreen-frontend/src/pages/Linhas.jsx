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
  IconButton
} from '@mui/material';
import { Search, Clear, DirectionsBus } from '@mui/icons-material';
import { linhasAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Linhas = () => {
  const [linhas, setLinhas] = useState([]);
  const [linhaFiltrada, setLinhaFiltrada] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [idPesquisa, setIdPesquisa] = useState('');
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
            startIcon={<DirectionsBus />}
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
          <Alert severity="error" sx={{ mb: 3 }}>
            {erro}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total de Linhas
                </Typography>
                <Typography variant="h4" component="div">
                  {linhas.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Companhias
                </Typography>
                <Typography variant="h6" component="div">
                  {[...new Set(linhas.map(l => l.companhia))].length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Lotação Média
                </Typography>
                <Typography variant="h6" component="div">
                  {linhas.length > 0 
                    ? Math.round(linhas.reduce((acc, l) => acc + l.lotacao_maxima, 0) / linhas.length)
                    : 0
                  } passageiros
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
                  <TableCell><strong>Lotacao Máxima</strong></TableCell>
                  <TableCell><strong>Horário</strong></TableCell>
                  <TableCell><strong>Data de Criação</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carregando ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
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
    </Container>
  );
};

export default Linhas;