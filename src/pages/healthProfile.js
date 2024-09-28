import React from 'react';
import { Box, CssBaseline} from '@mui/material';
import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';
import '../appearence/show.css';
import ChildProfileCard from './../component/patientComponent/ChildProfile/childProfileCard';
import { useAuth } from '../component/authentification/AuthContext'

const HealthProfilePage = () => {
   const { user } = useAuth()
   
   

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar user={user._id} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', maxHeight: '100vh' }}>
        <Header />
          <>
          <Box sx={{ mt: 8 }}>
          <ChildProfileCard
              user={user._id} 
           />
           </Box>  
          </>
        
      </Box>
    </Box>
  );
};

export default HealthProfilePage;


