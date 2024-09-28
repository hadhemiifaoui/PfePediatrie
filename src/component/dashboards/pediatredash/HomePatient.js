
import React from 'react';
import { Card, Typography, Grid, Box, Paper } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HealingIcon from '@mui/icons-material/Healing';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import { useTranslation } from 'react-i18next';
import Title from '../../title/title';

const Home = () => {

  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
      <Card sx={{ p: 2, mb: 4 }}>
        <Typography variant="h4" component="div" gutterBottom>
          <Title>{t('title1')}</Title>
        </Typography>
        <Typography variant="body1" component="div">
             <em>{t('typo1')}</em>
        </Typography>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <LocalHospitalIcon sx={{ fontSize: 100, color: '#3f51b5' }} />
            <Typography variant="h6" component="div">
            <Title>{t('title2')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
          
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ChildCareIcon sx={{ fontSize: 100, color: '#f50057' }} />
            <Typography variant="h6" component="div">
              <Title>{t('title3')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
          
             </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <HealingIcon sx={{ fontSize: 100, color: '#4caf50' }} />
            <Typography variant="h6" component="div">
             <Title>{t('title4')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
                
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <VaccinesIcon sx={{ fontSize: 100, color: '#ff9800' }} />
            <Typography variant="h6" component="div">
              <Title>{t('title5')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
             
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <MonitorWeightRoundedIcon sx={{ fontSize: 100, color: '#795548'}} /> 
            <Typography variant="h6" component="div" >
              <Title>{t('title6')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
              
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Home;









/*import React from 'react';
import { Card, Typography, Grid, Box, Paper } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HealingIcon from '@mui/icons-material/Healing';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import { useTranslation } from 'react-i18next';
import Title from '../../title/title';

const Home = () => {

  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
      <Card sx={{ p: 2, mb: 4 }}>
        <Typography variant="h4" component="div" gutterBottom>
          <Title>{t('title1')}</Title>
        </Typography>
        <Typography variant="body1" component="div">
             {t('typo1')}
        </Typography>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <LocalHospitalIcon sx={{ fontSize: 50, color: '#3f51b5' }} />
            <Typography variant="h6" component="div">
            <Title>{t('title2')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
            {t('typo2')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ChildCareIcon sx={{ fontSize: 50, color: '#f50057' }} />
            <Typography variant="h6" component="div">
              <Title>{t('title3')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
            {t('typo3')}
             </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <HealingIcon sx={{ fontSize: 50, color: '#4caf50' }} />
            <Typography variant="h6" component="div">
             <Title>{t('title4')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
                {t('typo4')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <VaccinesIcon sx={{ fontSize: 50, color: '#ff9800' }} />
            <Typography variant="h6" component="div">
              <Title>{t('title5')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
              {t('typo5')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <MonitorWeightRoundedIcon sx={{ fontSize: 50, color: '#795548' }} /> 
            <Typography variant="h6" component="div">
              <Title>{t('title6')}</Title>
            </Typography>
            <Typography variant="body2" component="div">
                {t('typo6')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
*/