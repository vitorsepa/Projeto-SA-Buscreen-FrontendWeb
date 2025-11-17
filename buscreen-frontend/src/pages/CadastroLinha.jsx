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
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { 
  DirectionsBus, 
  Save, 
  ArrowBack,
  CheckCircle 
} from '@mui/icons-material';
import { linhasAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CadastroLinha = () => {
  const [formData, setFormData] = useState({
    companhia: '',
    nome_linha: '',
    lotacao_maxima: '',
    horario: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  // Companhias pré-cadastradas
  const companhias = [
    'Biguaçu',
    'Jotur', 
    'Estrela',
    'Imperatriz'
  ];

  // Horários em ordem crescente
  const horariosPadrao = [
    '05:00 - 23:00',
    '05:30 - 00:00',
    '06:00 - 22:00',
    '07:00 - 21:00',
    '24 horas'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    // Validações
    if (!formData.companhia || !formData.nome_linha || !formData.lotacao_maxima || !formData.horario) {
      setErro('Todos os campos são obrigatórios.');
      setCarregando(false);
      return;
    }

    if (formData.lotacao_maxima < 10 || formData.lotacao_maxima > 200) {
      setErro('A lotação máxima deve ser entre 10 e 200 passageiros.');
      setCarregando(false);
      return;
    }

    try {
      console.log('🚌 Tentando cadastrar linha:', formData);
      
      const response = await linhasAPI.create({
        companhia: formData.companhia,
        nome_linha: formData.nome_linha,
        lotacao_maxima: parseInt(formData.lotacao_maxima),
        horario: formData.horario
      });

      console.log('✅ Linha cadastrada:', response.data);
      
      setSucesso('Linha cadastrada com sucesso!');
      
      // Limpa o formulário
      setFormData({
        companhia: '',
        nome_linha: '',
        lotacao_maxima: '',
        horario: ''
      });

      // Opcional: redireciona após 2 segundos
      setTimeout(() => {
        navigate('/linhas');
      }, 2000);

    } catch (error) {
      console.error('❌ Erro no cadastro:', error);
      
      if (error.response?.data?.mensagem) {
        setErro(error.response.data.mensagem);
      } else {
        setErro('Erro ao cadastrar linha. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        
        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <DirectionsBus fontSize="large" color="primary" />
          <Typography variant="h4" component="h1">
            Cadastrar Nova Linha
          </Typography>
        </Box>

        <Grid container spacing={3}>
          
          {/* Formulário */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              
              {erro && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {erro}
                </Alert>
              )}

              {sucesso && (
                <Alert 
                  severity="success" 
                  icon={<CheckCircle fontSize="inherit" />}
                  sx={{ mb: 3 }}
                >
                  {sucesso}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  
                  {/* Companhia - tamanho aumentado */}
                  <Grid item xs={12} sm={7}>
                    <FormControl fullWidth>
                      <InputLabel>Companhia *</InputLabel>
                      <Select
                        name="companhia"
                        value={formData.companhia}
                        label="Companhia *"
                        onChange={handleChange}
                        required
                      >
                        {companhias.map((companhia) => (
                          <MenuItem key={companhia} value={companhia}>
                            {companhia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Horário - tamanho reduzido */}
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel>Horário *</InputLabel>
                      <Select
                        name="horario"
                        value={formData.horario}
                        label="Horário *"
                        onChange={handleChange}
                        required
                      >
                        {horariosPadrao.map((horario) => (
                          <MenuItem key={horario} value={horario}>
                            {horario}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Nome da Linha - full width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="nome_linha"
                      label="Nome da Linha *"
                      value={formData.nome_linha}
                      onChange={handleChange}
                      placeholder="Ex: Diretão, São José/Floripa, Lisboa"
                      required
                      helperText="Digite o nome completo da linha"
                    />
                  </Grid>

                  {/* Lotação Máxima - full width */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="lotacao_maxima"
                      label="Lotação Máxima *"
                      type="number"
                      value={formData.lotacao_maxima}
                      onChange={handleChange}
                      inputProps={{ 
                        min: 10, 
                        max: 200,
                        step: 5
                      }}
                      required
                      helperText="Entre 10 e 200 passageiros"
                    />
                  </Grid>

                  {/* Botões */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                      <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/linhas')}
                        disabled={carregando}
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={carregando ? <CircularProgress size={20} /> : <Save />}
                        disabled={carregando}
                        size="large"
                      >
                        {carregando ? 'Cadastrando...' : 'Cadastrar Linha'}
                      </Button>
                    </Box>
                  </Grid>

                </Grid>
              </Box>
            </Paper>
          </Grid>

        </Grid>

      </Box>
    </Container>
  );
};

export default CadastroLinha;