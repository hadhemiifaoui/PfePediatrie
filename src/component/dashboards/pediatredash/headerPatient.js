import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, 
  Avatar, Box,  Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth } from '../../authentification/AuthContext';

const Header = () => {
  
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const navigate = useNavigate();

  const { logout, user } = useAuth();

   const handleClick = (e) =>{
    e.preventDefault()
     try{
      navigate('/')
     }
     catch(error){
      console.error({messsage : 'Something went wrong !!'})
     }
    }
  
  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };


  return (
    <AppBar  sx={{ backgroundColor: '#90caf9' }}>
      <Toolbar>
       
        <Col> 
        <IconButton onClick={handleClick} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            <ReorderIcon sx={{ marginLeft: -3 }} /> {t('PediHelp')}
            </Typography>
          </IconButton>
        </Col> 
        
        <IconButton color="inherit" aria-controls="language-menu" aria-haspopup="true" onClick={handleLanguageClick}>
          <LanguageIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('fr')}>Français</MenuItem>
        </Menu>

        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
 
       
        <Box display="flex" alignItems="center">
          <Avatar 
           alt={user.firstname}
           onClick={handleMenuClick}
           src="User"
           sx={{ width: 30, height: 30 }}/>
            <Menu
        id="account-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>
          {t('Logout')}
        </MenuItem>
      </Menu>
        </Box>
      
      </Toolbar>
    
    </AppBar>
  );
};

export default Header;
