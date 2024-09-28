import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Avatar, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../authentification/AuthContext';

const Sidebar = ({ handleItemClick, activeItem }) => {
  const { user } = useAuth();

  return (
    <Box sx={{ width: 258, position: 'fixed', height: '100%', backgroundColor: '#ffff', top: 0, paddingTop: 2 }}>
      <List>
        <ListItem button sx={{ justifyContent: 'center', marginBottom: 2 }}>
          <Avatar  
            alt={user?.firstname} 
            src={`http://localhost:3001/uploads/${user?.image}`} 
            sx={{ width: 100, height: 100, marginLeft: -12}} 
          />
        </ListItem>
        <ListItem  sx={{ justifyContent: 'center', marginBottom: 2 }}>
            <Typography  sx={{marginLeft: 1}} ><strong><em> Docteur :  {user.firstname} {user.lastname}</em></strong> </Typography> 
        
            <Typography  sx={{marginLeft: 1}} ><strong><em> Specialité :  {user.speciality}</em></strong> </Typography> 
        </ListItem>
       
        <ListItem button onClick={() => handleItemClick('profile')}>
          <ListItemIcon>
            <AccountBoxIcon style={{ color: '#1d73f0' }} />
          </ListItemIcon>
          <ListItemText primary="Compte" style={{ color: '#1d73f0' }} />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('enfants')} >
          <ListItemIcon>
            <AccountBoxIcon style={{ color: '#1d73f0' }} />
          </ListItemIcon>
          <ListItemText primary="Enfants" style={{ color: '#1d73f0' }} />
        </ListItem>
        <ListItem button onClick={() => handleItemClick('parametre')}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCog} style={{ color: '#1d73f0' }} size="lg" />
          </ListItemIcon>
          <ListItemText primary="Paramètre" style={{ color: '#1d73f0' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
