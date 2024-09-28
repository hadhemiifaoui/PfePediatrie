import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth } from './AuthContext'; 

const Navbar1 = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { userRole } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElDashboard, setAnchorElDashboard] = React.useState(null);

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

  return (
    <AppBar position="static" sx={{ backgroundColor: '#90caf9' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton onClick={handleClick} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>
              <ReorderIcon /> {t('PediHelp')}
            </Typography>
          </IconButton>
        </Box>
        <IconButton onClick={handleClick} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>
            Home
          </Typography>
        </IconButton>
        <IconButton sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>
            About
          </Typography>
        </IconButton>
        {userRole === 'pediatre' && (
          <IconButton sx={{ flexDirection: 'column', alignItems: 'flex-start' }} onClick={handleDashboardClick}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', fontSize: 17 }}>
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
          <MenuItem onClick={() => handleDashboardChange('/dashboard1')}>Patient Dashboard</MenuItem>
        </Menu>
        <IconButton color="inherit" aria-controls="language-menu" aria-haspopup="true" onClick={handleLanguageClick}>
          <LanguageIcon sx={{ color: '#fff' }} />
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar1;
