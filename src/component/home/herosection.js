import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', pt: 8, pb: 6 }}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Welcome to Pediatrie App
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Helping pediatricians make better diagnoses in emergencies.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" component={Link} to="/login">
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
