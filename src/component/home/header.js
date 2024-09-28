import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';

const Header = () => {
  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Pediatrie App
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit">
              <MailOutlineIcon />
            </IconButton>
            <IconButton color="inherit">
              <CallIcon />
            </IconButton>
            <IconButton color="inherit">
              <LanguageIcon />
            </IconButton>
            <Button component={Link} to="/login" color="primary" variant="outlined" sx={{ ml: 2 }}>
              LOG IN
            </Button>
            <Button component={Link} to="/signup" color="secondary" variant="contained" sx={{ ml: 2 }}>
              S'INSCRIRE
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
