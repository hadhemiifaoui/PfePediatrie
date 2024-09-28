import React from 'react';
import { Box, CssBaseline} from '@mui/material';
import Sidebar from '../component/dashboards/pediatredash/sidebarpatient';
import Header from '../component/dashboards/pediatredash/headerPatient';
import Allergies from '../component/patientComponent/Allergy/allergies';
import { useAuth } from '../component/authentification/AuthContext';
import '../appearence/show.css';

const AllergyPage = () => {
  
  const parentId = localStorage.getItem('userid');
 // const { user } = useAuth();
  const childId = localStorage.getItem('childId')
  console.log(childId)
 
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar parentId={parentId} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto', maxHeight: '100vh' }}>
        <Header />
          <>
          <Box sx={{ mt: 8 }}>
           <Allergies childId={childId}/>
          </Box>
          </>   
      </Box>
    </Box>
  );
};

export default AllergyPage;
