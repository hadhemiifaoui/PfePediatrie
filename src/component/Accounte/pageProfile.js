import React, { useState } from 'react';
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Accounte from './PediatreAccount';
import Parametre from './parametre';
import Settings from './parametre';
import Enfant from './childsUnderAssistance'; 
import image from "../../assets/Ped8.jpg";

const PedAccountePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');

  const handleItemClick = (item) => {
    console.log('handleItemClick - item:', item);
    setSelectedItem(item);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Navbar OpenSidebar={toggleSidebar} />
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Sidebar
            openSidebarToggle={sidebarOpen}
            handleItemClick={handleItemClick}
            activeItem={selectedItem}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '258px' }}>
            {selectedItem === 'profile' ? (
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={12} md={8} lg={6}>
                  <Accounte />
                </Grid>
              </Grid>
            ) : selectedItem === 'parametre' ? (
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={12} md={8} lg={6}>
                  <Parametre />
                </Grid>
              </Grid>
            ) : selectedItem === 'settings' ? ( // Add settings option
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={12} md={8} lg={6}>
                  <Settings />
                </Grid>
              </Grid>
            ) : selectedItem === 'enfants' ? ( // Add Enfant option
              <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item xs={12} md={8} lg={6}>
                  <Enfant />
                </Grid>
              </Grid>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                }}
              >
                <img
                  src={image}
                  alt="Home"
                  style={{ width: "100%", height: "100%", objectFit: 'cover', marginLeft: -10 }}
                />
                <Typography variant="h8" sx={{ position: 'absolute', bottom: 20, color: '#333' }}>
                  <small><em>Bienvenue Au Compte Pédiatre </em></small>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PedAccountePage;
