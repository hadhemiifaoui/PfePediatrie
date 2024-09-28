import React, { useEffect, useState } from "react";
import childservices from '../../../services/childServices';
import { Box, CardContent, Card, Typography, Avatar, Grid, Paper } from '@mui/material';
import Title from '../../title/title';
import { useTranslation } from 'react-i18next';

const ChildProfileCard1 = ({ childId, pediatreId }) => {
  const [childData, setChildData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const response = await childservices.getChildByPediatreIdAndChildId({ childId, pediatreId });
        setChildData(response);
      } catch (error) {
        console.error('Error fetching child data:', error.message);
      }
    };

    if (childId && pediatreId) {
      fetchChildData();
    }
  }, [childId, pediatreId]);

  if (!childData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card>
      <CardContent style={{ height: '50vh', maxWidth: 2000 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          <Title>{t('title')}</Title>
        </Typography>
        <Paper elevation={3} style={{ width: 1165, height: '35vh', padding: '20px', margin: '20px 0' }}>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar
                alt={childData.name}
                src={`http://localhost:3001/uploads/${childData.image}`}
                style={{ width: '80px', height: '80px', marginRight: '16px' }}
              />
            </Grid>
            <Grid item xs>
              <Box display="flex" flexDirection="row">
                <Box flexDirection="column" justifyContent="center">
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    {t('name')} : {childData.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t('dob')} : {childData.dob}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t('gender')} : {childData.gender}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t('blood')} : {childData.bloodType}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t('weight')} : {childData.weight}
                  </Typography>
                  <Typography variant="subtitle2">
                    {t('height')} : {childData.height}
                  </Typography>
                </Box>
                <Box flexDirection="column" justifyContent="center" style={{ marginLeft: '50px' }}>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    sous l'assistance de Dr :
                  </Typography>
                  <Typography variant="subtitle2">
                    {childData.pediatre.firstname} {childData.pediatre.lastname}
                  </Typography>
                  <Typography variant="subtitle2">
                    {childData.pediatre.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default ChildProfileCard1;
