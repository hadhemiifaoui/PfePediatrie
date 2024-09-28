import React from 'react';
import { Box, CssBaseline } from '@mui/material';

import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';

import '../appearence/show.css';
import Home from '../component/dashboards/pediatredash/HomePatient';
import { useParams } from 'react-router-dom'; 

const HomePatientPage = () => {
  const { parentId } = useParams(); 
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Box sx={{ overflowY: 'auto', flexShrink: 0, height: '100%' }}> 
        <Sidebar parentId={parentId} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', maxHeight: '100vh' }}>
        <Header />
        <Box sx={{ mt: 8 }}>
          <Home />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePatientPage;
