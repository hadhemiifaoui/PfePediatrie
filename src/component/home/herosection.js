import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ bgcolor: '#c0c7c7', color: 'white', pt: 16, pb: 12, minHeight: '80vh' }}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" align="center" gutterBottom>
         <em>{t('textA1')}</em> 
        </Typography>
        <Typography variant="h6" align="center" paragraph>
            <em>{t('textA2')}</em>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="secondary" component={Link} to="/login">
             {t('textA3')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
