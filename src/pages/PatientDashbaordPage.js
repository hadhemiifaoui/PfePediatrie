import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';
import '../appearence/show.css';
import HomePatientPage from './HomePatientPage';
import HealthProfilePage from './healthProfile';
const PatientDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{ width: '250px', flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 4, overflowY: 'auto', maxHeight: '100vh' }}>
        <Header />
        <Box sx={{ mt: 4 }}>
          <Routes>
            <Route path="/homepatient" element={<HomePatientPage />} />
            <Route path="/healthprofile" element={<HealthProfilePage />}   />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default PatientDashboard;
