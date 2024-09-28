import React from 'react';
import { Box, CssBaseline} from '@mui/material';
import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';
//import { useAuth } from '../component/authentification/AuthContext'

import Vaccinations from '../component/patientComponent/Vaccin/vaccinations';
import '../appearence/show.css';


const VaccinationPage = () => {

  const parentId = localStorage.getItem('userid');
  /*const { user } = useAuth();
  const patientId = user ? user._id : localStorage.getItem('userid');*/
  
  const childId = localStorage.getItem('childId')
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar parentId={parentId} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', maxHeight: '100vh' }}>
        <Header />
          <>
          <Box sx={{ mt: 8 }}>
               <Vaccinations  childId={childId}/>
           
            </Box>
           
          </>
        
      </Box>
    </Box>
  );
};

export default VaccinationPage;
