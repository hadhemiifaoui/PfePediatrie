

import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Menu, MenuItem , Avatar } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth } from '../authentification/AuthContext'; 

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { userRole } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElDashboard, setAnchorElDashboard] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const { user } = useAuth();
  const { logout } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = (event) => {
    setAnchorElDashboard(event.currentTarget);
  };

  const handleDashboardChange = (path) => {
    navigate(path);
    setAnchorElDashboard(null);
  };

  const handleCloseDashboardMenu = () => {
    setAnchorElDashboard(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f1f3f4' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            
        </Box>
        <IconButton onClick={handleClick} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#020106 ', fontSize: 17 }}>
            Home
          </Typography>
        </IconButton>
        {userRole === 'pediatre' && (
          <IconButton sx={{ flexDirection: 'column', alignItems: 'flex-start' }} onClick={handleDashboardClick}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#020106 ', fontSize: 17 }}>
              Dashboard
            </Typography>
          </IconButton>
        )}
        <Menu
          anchorEl={anchorElDashboard}
          keepMounted
          open={Boolean(anchorElDashboard)}
          onClose={handleCloseDashboardMenu}
        >
          <MenuItem onClick={() => handleDashboardChange('/dashboard')}>Admin Dashboard</MenuItem>
          
        </Menu>
        <IconButton color="#020106 " aria-controls="language-menu" aria-haspopup="true" onClick={handleLanguageClick}>
          <LanguageIcon sx={{ color: '#020106 ' }} />
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseLanguageMenu}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('fr')}>Français</MenuItem>
        </Menu>
        <Avatar  alt={user?.firstname}    onClick={handleMenuClick}
            src={`http://localhost:3001/uploads/${user?.image}`}  sx={{width:30 , height:30}} />
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


/*<MenuItem onClick={() => handleDashboardChange('/dashboard1')}>Patient Dashboard</MenuItem>*/
