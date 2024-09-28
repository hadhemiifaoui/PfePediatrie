import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';
import { useParams } from 'react-router-dom';
import ChildProfileCard1 from './../component/patientComponent/ChildProfile/childProfileCard1';
import { useAuth } from '../component/authentification/AuthContext';

import '../appearence/show.css';

const HealthProfilePage1 = () => {
  const { user } = useAuth();
  const { childId, pediatreId } = useParams(); 

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar user={user._id} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', maxHeight: '100vh' }}>
        <Header />
        <Box sx={{ mt: 8 }}>
          <ChildProfileCard1
            childId={childId} 
            pediatreId={pediatreId}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HealthProfilePage1;
