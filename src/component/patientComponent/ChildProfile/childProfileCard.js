
import React, { useEffect, useState } from "react";
import childservices from '../../../services/childServices';
import { Box, CardContent, Card, Typography, styled, TextField, Button, Avatar, MenuItem,
   Select, InputLabel, FormControl, Grid, Paper } from '@mui/material';
import Title from '../../title/title';
import { useTranslation } from 'react-i18next';
import { Row, Col } from "react-bootstrap";

const StyledTextField = styled(TextField)({
  borderRadius: '6px',
  width: '100%',
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#00bcd4',
  color: '#fff',
  marginTop: '15px',
  padding: '8px',
  fontSize: '10px',
  minHeight: '15px',
  width: '75px',
  '&:hover': {
    backgroundColor: '#00acc1',
  },
});

const CancelButtonStyled = styled(Button)({
  backgroundColor: '#f44336',
  color: '#fff',
  marginTop: '15px',
  padding: '8px',
  fontSize: '10px',
  minHeight: '15px',
  width: '75px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});
const ChildProfileCard = ({ user }) => {
  const [childData, setChildData] = useState([]);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [image, setImage] = useState(null);
  const [pediatres, setPediatres] = useState([]);
  const [selectedPediatre, setSelectedPediatre] = useState('');
  const { t } = useTranslation();

  const fetchPediatres = async () => {
    try {
      const response = await childservices.getAllPediatres();
      setPediatres(response);
    } catch (error) {
      console.error('Error fetching pediatres:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('bloodType', bloodType);
    formData.append('weight', weight);
    formData.append('height', height);
    formData.append('pediatre', selectedPediatre);
    formData.append('parent', user);
    if (image) {
      formData.append('image', image);
    }

    try {
      await childservices.create(formData);
      const response = await childservices.getChildByParentId(user);
      setChildData(response);
      setName('');
      setDob('');
      setGender('');
      setBloodType('');
      setWeight('');
      setHeight('');
      setImage(null);
      setSelectedPediatre('');
    } catch (error) {
      console.error('Error uploading child data:', error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const getChildByParentId = async () => {
      try {
        const response = await childservices.getChildByParentId(user);
        setChildData(response);
      } catch (error) {
        console.error('Error fetching child data:', error.message);
      }
    };

    fetchPediatres();
    if (user) {
      getChildByParentId();
    }
  }, [user]);

  return (
    <Card>
      <CardContent style={{ height: '50vh', maxWidth: 2000 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          <Title>{t('title')}</Title>
        </Typography>

        {childData.length === 0 ? (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <StyledTextField
                  variant="standard"
                  placeholder={t('name')}
                  style={{ width: '100%' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <StyledTextField
                  placeholder={t('dob')}
                  variant="standard"
                  type="date"
                  style={{ width: '100%' }}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel>{t('gender')}</InputLabel>
                  <Select
                    variant="standard"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">{t('male')}</MenuItem>
                    <MenuItem value="female">{t('female')}</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Col md={4}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel>{t('blood')}</InputLabel>
                  <Select
                    value={bloodType}
                    variant="standard"
                    onChange={(e) => setBloodType(e.target.value)}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel>{t('pediatre')}</InputLabel>
                  <Select
                    value={selectedPediatre}
                    variant="standard"
                    onChange={(e) => setSelectedPediatre(e.target.value)}
                  >
                    {pediatres.map(pediatre => (
                      <MenuItem key={pediatre._id} value={pediatre._id}>
                        {pediatre.firstname} {pediatre.lastname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Col>
              <Col md={4}>
                <StyledTextField
                  placeholder={t('weight')}
                  variant="standard"
                  type="number"
                  style={{ width: '100%' }}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <StyledTextField
                  placeholder={t('height')}
                  variant="standard"
                  type="number"
                  style={{ width: '100%' }}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Col>
            </Row>

            <div style={{ display: 'flex', marginTop: '3%' }}>
              <div style={{display:'flex' , marginTop:'3%'}}>
          <input
            type="file"
            name="img"
            variant="standard"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          /> 
          <ButtonStyled type="submit" style={{ marginRight: '10px' }}>Save</ButtonStyled>
          <CancelButtonStyled>Cancel</CancelButtonStyled>
          </div> 
             </div>
          </form>
        ) : (
          <>
            {childData.map((child) => (
              <React.Fragment key={child._id}>
                <Paper elevation={3} style={{ width: 1165, height: '35vh', padding: '20px', margin: '20px 0' }}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar
                        alt={child.name}
                        src={`http://localhost:3001/uploads/${child.image}`}
                        style={{ width: '80px', height: '80px', marginRight: '16px' }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Box display="flex" flexDirection="row">
                        <Box flexDirection="column" justifyContent="center">
                          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                            {t('name')} : {child.name}
                          </Typography>
                          <Typography variant="subtitle2">
                            {t('dob')} : {child.dob}
                          </Typography>
                          <Typography variant="subtitle2">
                            {t('gender')} : {child.gender}
                          </Typography>
                          <Typography variant="subtitle2">
                            {t('blood')} : {child.bloodType}
                          </Typography>
                          <Typography variant="subtitle2">
                            {t('weight')} : {child.weight}
                          </Typography>
                          <Typography variant="subtitle2">
                            {t('height')} : {child.height}
                          </Typography>
                        </Box>
                        <Box flexDirection="column" justifyContent="center" style={{ marginLeft: '50px' }}>
                          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                            sous l'assistance de Dr :
                          </Typography>
                          <Typography variant="subtitle2">
                            {child.pediatre.firstname} {child.pediatre.lastname}
                          </Typography>
                          <Typography variant="subtitle2">
                            {child.pediatre.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </React.Fragment>
            ))}
          </>
        )}
      </CardContent>
    </Card>
    );
  };

export default ChildProfileCard;

/*const ChildProfileCard = ({ parentId }) => {
  const [childData, setChildData] = useState([]);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [image, setImage] = useState(null);
  const [pediatres, setPediatres] = useState([]);
  const [selectedPediatre, setSelectedPediatre] = useState('');
  const { t } = useTranslation();

  const fetchPediatres = async () => {
    try {
      const response = await childservices.getAllPediatres();
      setPediatres(response);
    } catch (error) {
      console.error('Error fetching pediatres:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('bloodType', bloodType);
    formData.append('weight', weight);
    formData.append('height', height);
    formData.append('pediatre', selectedPediatre);
    formData.append('parent', parentId);
    if (image) {
      formData.append('image', image);
    }

    try {
      await childservices.create(formData);
      const response = await childservices.getChildByParentId(parentId);
      setChildData(response ? [response] : []); // Ensure it's an array
      setName('');
      setDob('');
      setGender('');
      setBloodType('');
      setWeight('');
      setHeight('');
      setImage(null);
      setSelectedPediatre('');
    } catch (error) {
      console.error('Error uploading child data:', error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const getChildByParentId = async () => {
      try {
        const response = await childservices.getChildByParentId(parentId);
        setChildData(response ? [response] : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching child data:', error.message);
      }
    };

    fetchPediatres();
    if (parentId) {
      getChildByParentId();
    }
  }, [parentId]);

  return (
    <Card>
      <CardContent style={{ height: '50vh', maxWidth: 2000 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          <Title>{t('title')}</Title>
        </Typography>

        {childData.length === 0 ? (
          <form onSubmit={handleSubmit}>
         
            </form>
          ) : (
            <>
              {childData.map((child) => (
                <React.Fragment key={child._id}>
                  <Paper elevation={3} style={{ width: 1165, height: '35vh', padding: '20px', margin: '20px 0' }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Avatar
                          alt={child.name}
                          src={`http://localhost:3001/uploads/${child.image}`}
                          style={{ width: '80px', height: '80px', marginRight: '16px' }}
                        />
                      </Grid>
                      <Grid item xs>
                        <Box display="flex" flexDirection="row">
                          <Box flexDirection="column" justifyContent="center">
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                              {t('name')} : {child.name}
                            </Typography>
                            <Typography variant="subtitle2">
                              {t('dob')} : {child.dob}
                            </Typography>
                            <Typography variant="subtitle2">
                              {t('gender')} : {child.gender}
                            </Typography>
                            <Typography variant="subtitle2">
                              {t('blood')} : {child.bloodType}
                            </Typography>
                            <Typography variant="subtitle2">
                              {t('weight')} : {child.weight}
                            </Typography>
                            <Typography variant="subtitle2">
                              {t('height')} : {child.height}
                            </Typography>
                          </Box>
                          <Box flexDirection="column" justifyContent="center" style={{ marginLeft: '50px' }}>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                              sous l'assistance de Dr :
                            </Typography>
                            <Typography variant="subtitle2">
                              {child.pediatre ? `${child.pediatre.firstname} ${child.pediatre.lastname}` : 'N/A'}
                            </Typography>
                            <Typography variant="subtitle2">
                              {child.pediatre ? child.pediatre.email : 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </React.Fragment>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    );
  };
*/  



/**/