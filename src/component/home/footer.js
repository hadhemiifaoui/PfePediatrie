import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Pediatrie App
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Helping pediatricians make better diagnoses in emergencies.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          <Link color="inherit" href="https://your-website.com/">
            Pediatrie App
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
