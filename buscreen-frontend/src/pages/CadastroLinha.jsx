import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CadastroLinha = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastrar Nova Linha
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Formulário para cadastrar nova linha de ônibus
        </Typography>
        
        <Box sx={{ p: 3, border: '1px dashed #ccc', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Formulário em desenvolvimento
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Esta funcionalidade será implementada em breve.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/linhas')}
          >
            Voltar para Linhas
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CadastroLinha;