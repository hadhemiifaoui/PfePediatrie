import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box , Menu , MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
//import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
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

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', fontSize: 17 }}>
            <ReorderIcon color='#2c3e50' /> {t('PediHelp')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', ml: 'auto' }}>
            <IconButton
              color='#2c3e50'
              onClick={() => {
                window.open('https://mail.google.com/mail/?view=cm&fs=1&to=aidepediatrique@gmail.com&su=Support Request&body=Bonjour, jai besoin d`assistance', '_blank');
              }}
            >
              <MailOutlineIcon />
            </IconButton>
            <IconButton color='#2c3e50' onClick={handleLanguageClick}>
              <LanguageIcon />
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
            <Button component={Link} to="/login" color="primary" variant="outlined" sx={{ ml: 2 }}>
              {t('loginButton')}
            </Button>
            <Button component={Link} to="/signup"  color="secondary" variant="contained" sx={{ ml: 2 }}>
              {t('signupText')}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

/*
 <IconButton color='#2c3e50'>
  <CallIcon />
</IconButton>
*/