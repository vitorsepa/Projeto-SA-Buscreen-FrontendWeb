import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  DirectionsBus,
  ListAlt,
  Person
} from '@mui/icons-material';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [horaAtual, setHoraAtual] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraAtual(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate('/login');
    }
  }, [usuario, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  if (!usuario || !usuario.id) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
          {['Home', 'Linhas', 'Perfil', 'Sobre nós'].map((item) => (
            <Typography
              key={item}
              sx={{
                cursor: 'pointer',
                color: '#fff',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
              onClick={() => {
                const path = item.toLowerCase().replace(' ', '-');
                navigate(`/${path === 'home' ? '' : path}`);
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        <Button variant="contained" color="error" onClick={handleLogout}>
          Sair
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, py: 3, px: 3, backgroundColor: '#FFB881', display: 'flex', gap: 3 }}>
        
        {/* Mapa */}
        <Box sx={{
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 2,
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minHeight: 400,
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#7f3c00' }}>
            Ponto Selecionado: Rua Arnaldo Silveira de Souza
          </Typography>

          <Box sx={{ flexGrow: 1, borderRadius: 1, overflow: 'hidden' }}>
            <MapContainer
              center={[-27.6207115, -48.6464041]}
              zoom={18}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[-27.6207115, -48.6464041]} icon={defaultIcon}>
                <Popup>Rua Arnaldo Silveira de Souza</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Box>

        <Box sx={{
          width: 320,
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 3,
          boxShadow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          color: '#7f3c00',
          minHeight: 400,
        }}>
          <Typography variant="h4" fontWeight="bold">
            {horaAtual.toLocaleTimeString()}
          </Typography>

          <Box sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            width: '100%',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: '#222',
          }}>
            <ListAlt color="primary" />
            <Box>
              <Typography fontWeight="bold">Linhas cadastradas</Typography>
              <Typography variant="body2">3 linhas disponíveis</Typography>
            </Box>
          </Box>

          <Box sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            width: '100%',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: '#222',
          }}>
            <Person color="success" />
            <Box>
              <Typography fontWeight="bold">Conta</Typography>
              <Typography variant="body2">
                Ativa desde {new Date().toLocaleDateString('pt-BR')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 2,
            width: '100%',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: '#222',
          }}>
            <DirectionsBus color="error" />
            <Box>
              <Typography fontWeight="bold">Companhias</Typography>
              <Typography variant="body2">Biguaçu, Jotur, Estrela</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          py: 2,
          backgroundColor: '#FF8F4A',
          color: '#fff',
          fontWeight: 'bold',
          borderTop: '2px solid #e07a38',
          mt: 'auto'
        }}
      >
        © 2025 Buscreen. Todos os direitos reservados.
      </Box>

    </Box>
  );
};

export default Dashboard;
