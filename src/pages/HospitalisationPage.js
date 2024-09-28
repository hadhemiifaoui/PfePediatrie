import React from 'react';
import { Box, CssBaseline} from '@mui/material';
import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';

import Hospitalisation from '../component/patientComponent/Hospitalisation/hospitalisations';
import '../appearence/show.css';
//import { useAuth } from '../component/authentification/AuthContext'


const HospitalisationPage = () => {

  const parentId = localStorage.getItem('userid');
 
 /* const { user } = useAuth();
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
         <Hospitalisation childId={childId}/>
          </Box>
           
          </>
        
      </Box>
    </Box>
  );
};

export default HospitalisationPage;