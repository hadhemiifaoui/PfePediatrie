import React from 'react';
import { Container, Typography, Box, Avatar, Grid } from '@mui/material';

const testimonials = [
  {
    name: 'Dr. Smith',
    text: 'This app has transformed how we handle emergencies. Highly recommended!',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Dr. Johnson',
    text: 'A must-have tool for every pediatrician working in the field.',
    avatar: 'https://via.placeholder.com/150',
  },
];

const Testimonials = () => {
  return (
    <Container maxWidth="md" component="section" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Users Say
      </Typography>
      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.name} xs={12} sm={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar src={testimonial.avatar} sx={{ width: 100, height: 100, mb: 2 }} />
              <Typography variant="h6">{testimonial.name}</Typography>
              <Typography>{testimonial.text}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Testimonials;
