import React , {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, Card, CardContent, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useTranslation } from 'react-i18next';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import NotesIcon from '@mui/icons-material/Notes';

import SettingsIcon from '@mui/icons-material/Settings';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';


const Sidebar = ( { user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const pediatreId = localStorage.getItem('userid');
   



  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleNavigationProf = () => {
    navigate(`/dashboard1/healthprofile/${user}`); 
  };

  const handleNavigationToAllergy= () => {
    navigate(`/dashboard1/allergies/${user}/${user.children._id}`); 
  };


  return (
    <Card sx={{ backgroundColor: '#e0e0e0' }} style={{ height: '100%' }}>
      <CardContent>
        <div className="sidebar">
          <span>""""""</span>
          <List>
            <ListItem> <span></span></ListItem>
            <ListItem> <span></span></ListItem>
            <ListItem button onClick={() => handleNavigation('/dashboard1')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: '#90caf9' }} />
              </ListItemIcon>
              <ListItemText primary={t('home')}  sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
            </ListItem>
            <ListItem button onClick={handleNavigationProf}>       
                   <ListItemIcon>
                     <PersonIcon sx={{ color: '#90caf9' }} />
                   </ListItemIcon>
                  <ListItemText primary={t('healthProfile')} sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem>
             <ListItem button onClick={() => handleNavigation(`/dashboard1/healthconditions/${pediatreId}`)}>       
                   <ListItemIcon>
                     <MonitorHeartIcon sx={{ color: '#90caf9' }} />
                   </ListItemIcon>
                  <ListItemText primary="Situation Medicale" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem>
            
             <ListItem button onClick={()=> handleNavigation(`/dashboard1/vaccination/${pediatreId}`)}>       
                   <ListItemIcon>
                     <VaccinesIcon sx={{ color: '#90caf9' }} />
                   </ListItemIcon>
                  <ListItemText primary="Vaccinations" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem>
             <ListItem button onClick={() => handleNavigation(`/dashboard1/hospitalisation/${pediatreId}`)}>       
                   <ListItemIcon>
                     <AirlineSeatIndividualSuiteIcon sx={{ color: '#90caf9' }} />
                   </ListItemIcon>
                  <ListItemText primary="Hospitalisations" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem>
           
           
             <ListItem button onClick={() => handleNavigation(`/dashboard1/allergies/${pediatreId}`)} >       
                   <ListItemIcon >
                     <CoronavirusIcon sx={{ color: '#90caf9' }} />
                   </ListItemIcon>
                  <ListItemText primary="Allergies" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem> 
            

  
            <Divider />
            <ListItem button onClick={() => handleNavigation('/settings')}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#90caf9' }} />
              </ListItemIcon>
              <ListItemText primary={t('setting')} sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
            </ListItem>
          </List>
        </div>
      </CardContent>
    </Card>
  );
};
export default Sidebar;


/* 
   <ListItem button onClick={() => handleNavigation('/dashboard1/consultation')}>
              <ListItemIcon>
                <VideoCallIcon sx={{ color: '#90caf9' }} />
              </ListItemIcon>
              <ListItemText primary={t('video')} sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
            </ListItem>


    
     <ListItem button onClick={() => handleNavigation('/dashboard1/planningconsultation')}>
              <ListItemIcon>
                <VideoCallIcon sx={{ color: '#90caf9' }} />
              </ListItemIcon>
              <ListItemText primary="Plannig Consultation" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
            </ListItem>
    
             <ListItem button onClick={() => handleNavigation('/consultation-notes')}>
              <ListItemIcon>
                <NotesIcon sx={{ color: '#90caf9' }} />
              </ListItemIcon>
              <ListItemText primary={t('notes')} sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
            </ListItem>
             

<ListItem button onClick={()=> handleNavigation(`/dashboard1/allergies/${user}/${user.children}`)}>       
                   <ListItemIcon>
                     <CoronavirusIcon sx={{ color: '#90caf9' }} />
                   </ListItemIcon>
                  <ListItemText primary="Allergies" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem>

             */
              /* medicationss 
    <ListItem button onClick={()=> handleNavigation(`/dashboard1/medication/${pediatreId}`)}>       
                   <ListItemIcon>
                     <MedicationLiquidIcon sx={{ color: '#90caf9' }} />
                     
                   </ListItemIcon>
                  <ListItemText primary="Medicaments" sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }} />
             </ListItem>
*/