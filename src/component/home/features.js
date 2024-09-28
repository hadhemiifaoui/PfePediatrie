import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

const features = [
  {
    title: 'Expert-Driven Content',
    description: 'Collect and organize successful experiences from pediatric experts in various fields.',
  },
  {
    title: 'Emergency Ready',
    description: 'Quickly search and select the appropriate situation in an emergency.',
  },
  {
    title: 'Web and Mobile',
    description: 'Access the platform from both web and mobile devices, tailored for different user needs.',
  },
];

const Features = () => {
  return (
    <Container maxWidth="md" component="section" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item key={feature.title} xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography align="center">{feature.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
