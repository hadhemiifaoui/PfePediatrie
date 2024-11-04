import React, { useEffect, useState } from "react";
import userServices from "../../services/userServices";

import { Card, Button, IconButton , TextField, Typography, Box, Grid,
   Dialog, DialogTitle, DialogContent, DialogActions , styled,
   Avatar} from '@mui/material';

import { Twitter as TwitterIcon, Instagram as InstagramIcon, 
  Facebook as FacebookIcon, LinkedIn as LinkedInIcon, 
  Edit as EditIcon } from '@mui/icons-material';

import './show1.css';

const ButtonStyled = styled(Button)({
  backgroundColor: '#8051cd',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
  width: '120px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#8051cd',
  },
});


const ButtonStyledAnnul = styled(Button)({
  backgroundColor: '#b7950b',
  color: '#fff',
  marginTop: '15px',
  padding: '5px 10px',
  fontSize: '12px',
  minHeight: '30px',
  width: '120px',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#b7950b',
  },
});



const Accounte = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ image: null, speciality: '' });
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ firstname: '', lastname: '', email: '', tel: '', address: '',  speciality: ''  });


  const id = localStorage.getItem('userid');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userServices.getUserById(id);
        setUser(response);
      } catch (error) {
        console.error('error get user', error);
      }
    };
    getUser();
  }, [id]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userServices.getUserById(id);
        setUser(response);
        setEditData({
          firstname: response.firstname,
          lastname: response.lastname,
          email: response.email,
          tel: response.tel,
          address: response.address,
          speciality : response.speciality
        });
      } catch (error) {
        console.error('error get user', error);
      }
    };
    getUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleProfileImageSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', formData.image);

    try {
      await userServices.createProfile(id, form);
      const updatedUser = await userServices.getUserById(id);
      setUser(updatedUser);
      setIsEditingProfileImage(false);
    } catch (error) {
      console.error('error update img', error);
    }
  };

  const handleEditProfileImage = () => {
    setIsEditingProfileImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', formData.image);
    form.append('speciality', formData.speciality);

    try {
      await userServices.createProfile(id, form);
      const updatedUser = await userServices.getUserById(id);
      setUser(updatedUser);
    } catch (error) {
      console.error('error create profile ', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.updateUser(id, editData);
      const updatedUser = await userServices.getUserById(id);
      setUser(updatedUser);
      setEditOpen(false);
    } catch (error) {
      console.error('error update profil', error);
    }
  };



  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 , marginTop:-10}}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}>
          {user ? (
            <Card sx={{ padding: 3, textAlign: 'center', position: 'relative' }}
            style={{width: 500 , marginLeft:-300}}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  border: '3px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  margin: 'auto',
                  boxShadow: 3,
                  position: 'relative',
                }}
              >
                <Avatar
                  alt={user.firstname}
                  src={`http://localhost:3001/uploads/${user.image}`}
                  style={{ width: '70%', height: '70%', marginTop : "10%" , marginLeft: "10%" }}
                />
                <IconButton
                  sx={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                  onClick={handleEditProfileImage}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              {isEditingProfileImage && (
               <form onSubmit={handleProfileImageSubmit} style={{ marginTop: 10 }}>
               <input
                 accept="image/*"
                 style={{ display: 'none' }}
                 id="raised-button-file"
                 type="file"
                 onChange={handleFileChange}
               />
               <label htmlFor="raised-button-file">
                 <Button component="span" style={{ marginRight: 10 }}>
                   choisir une photo de profile
                 </Button>
               </label>
               <Button color="primary" type="submit">
                 enregister
               </Button>
             </form>
              )}
              <Typography variant="h6" sx={{ marginTop: 2 }}>
               <small><em> {user.firstname} {user.lastname}</em></small>
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
               <small><em>{user.speciality}</em></small>
              </Typography>
              <Box
                sx={{
                  padding: 2,
                  borderTop: '1px solid #ddd',
                  marginTop: 2,
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: 1 , marginLeft: -40}}>
                  <em><small>Réseaux Sociaux </small></em>
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <TwitterIcon sx={{ color: '#1DA1F2', marginRight: 1 }} />
                    <Typography>Twitter: @{user.firstname}.{user.lastname}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <InstagramIcon sx={{ color: '#C13584', marginRight: 1 }} />
                    <Typography>Instagram: {user.firstname}.{user.lastname}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <FacebookIcon sx={{ color: '#1877F2', marginRight: 1 }} />
                    <Typography>Facebook: {user.firstname}.{user.lastname}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <LinkedInIcon sx={{ color: '#0077B5', marginRight: 1 }} />
                    <Typography>LinkedIn: {user.firstname}.{user.lastname}</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          ) : (
            <Card sx={{ padding: 2 }}>
              <form onSubmit={handleSubmit}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span">
                       choisir une photo de profil
                  </Button>
                </label>
                <TextField
                  label="Speciality"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    créer votre profil
                </Button>
              </form>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={8} >
          {user && (
            <Card sx={{ padding: 3 , position: 'relative' }} style={{width:500 , height:544 , marginLeft:10}}>

              <Typography variant="h8" sx={{ marginBottom: 2 }}>
                <strong><em><small>Nom et prénom: </small></em></strong>{user.firstname} {user.lastname}
              </Typography>

              <Typography variant="h6"><strong><em><small>Email:</small></em></strong> <small><em>{user.email}</em></small></Typography>
              <Typography variant="h6"><strong><em><small>Téléphone:</small></em></strong>  <small><em>{user.tel}</em></small></Typography>
              <Typography variant="h6"><strong><em><small>Address:</small></em></strong> <small><em>{user.address}</em></small></Typography>
              <Typography variant="h6"><strong><em><small>Spéciatlity:</small></em></strong> <small><em>{user.speciality}</em></small></Typography>

              <IconButton
                sx={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                onClick={() => setEditOpen(true)}
                >
                  <EditIcon />
                </IconButton>
   

            </Card>
          )}
        </Grid>
      </Grid>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Modifier le profil</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="First Name"
              name="firstname"
              value={editData.firstname}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={editData.lastname}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={editData.email}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              name="tel"
              value={editData.tel}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={editData.address}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
             <TextField
              label="Spécialité"
              name="speciality"
              value={editData.speciality}
              onChange={handleEditInputChange}
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <ButtonStyledAnnul onClick={() => setEditOpen(false)} color="secondary">
                   Annuler 
              </ButtonStyledAnnul>
              <ButtonStyled type="submit" variant="contained" color="primary">
                    Sauvegarder
              </ButtonStyled>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Accounte;
