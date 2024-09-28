import React, { useState, useEffect } from 'react';
import '../../../appearence/show.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faHeartbeat, faThermometerHalf, faHospital,  faVial, 
      faPills, faUsers, faCog, faHome } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../authentification/AuthContext';
import { useTranslation } from 'react-i18next';
import { ListItem, Avatar, Typography, Box, IconButton, TextField, Button } from '@mui/material';
import { Edit, CameraAlt } from '@mui/icons-material';
import userServices from '../../../services/userServices';

function Sidebar({ openSidebarToggle, handleItemClick, activeItem }) {
  const { t } = useTranslation();
  const { userRole, user, setUser } = useAuth();
  const [formData, setFormData] = useState({ image: null, speciality: '' });
  const [editMode, setEditMode] = useState(false);
  const id = localStorage.getItem('userid');

  const iconStyle = {
    color: '#ffffff',
    fontSize: '20px',
    marginRight: '4px' 
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userServices.getUserById(id);
        setUser(response);
        setFormData({ speciality: response.speciality || '' });
      } catch (error) {
        console.error('Error Getting User !!', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    if (formData.image) form.append('image', formData.image);
    form.append('speciality', formData.speciality);

    try {
      await userServices.createProfile(id, form);
      const updatedUser = await userServices.getUserById(id);
      setUser(updatedUser);
      setEditMode(false); 
    } catch (error) {
      console.error('Error Creating Profile !!', error);
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'></div>
      </div>
     

      <ul className='sidebar-list' style={{ padding: 0, margin: 0 }}>
        <li className={`sidebar-list-item ${activeItem === 'home' ? 'active' : ''}`} style={{ marginBottom: '4px' }}>
          <a
            style={{
              fontWeight: activeItem === 'home' ? 'bold' : 'normal',
              color: activeItem === 'home' ? '#ffffff' : '#ffffff',
            }}
            onClick={() => handleItemClick('home')}
          >
            <FontAwesomeIcon icon={faHome} size="lg" style={iconStyle} /> {t('home')}
          </a>
        </li>
        <li className={`sidebar-list-item ${activeItem === 'cases' ? 'active' : ''}`} style={{ marginBottom: '4px' }}>
          <a
            style={{
              fontWeight: activeItem === 'cases' ? 'bold' : 'normal',
              color: activeItem === 'cases' ? '#ffffff' : '#ffffff',
            }}
            onClick={() => handleItemClick('cases')}
          >
            <FontAwesomeIcon icon={faHeartbeat} size="lg" style={iconStyle} /> {t('pediatricCases')}
          </a>
        </li>
        <li className={`sidebar-list-item ${activeItem === 'diagnostic' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
          <a
            style={{
              fontWeight: activeItem === 'diagnostic' ? 'bold' : 'normal',
              color: activeItem === 'diagnostic' ? '#ffffff' : '#ffffff',
            }}
            onClick={() => handleItemClick('diagnostic')}
          >
            <FontAwesomeIcon icon={faStethoscope} size="lg" style={iconStyle} /> {t('diagnostics')}
          </a>
        </li>
        <li className={`sidebar-list-item ${activeItem === 'symptoms' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
          <a
            style={{
              fontWeight: activeItem === 'symptoms' ? 'bold' : 'normal',
              color: activeItem === 'symptoms' ? '#ffffff' : '#ffffff',
            }}
            onClick={() => handleItemClick('symptoms')}
          >
            <FontAwesomeIcon icon={faThermometerHalf} style={iconStyle} /> {t('symptoms')}
          </a>
        </li>
        <li className={`sidebar-list-item ${activeItem === 'tests' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
          <a
            style={{
              fontWeight: activeItem === 'tests' ? 'bold' : 'normal',
              color: activeItem === 'tests' ? '#ffffff' : '#ffffff',
            }}
            onClick={() => handleItemClick('tests')}
          >
            <FontAwesomeIcon icon={faVial} style={iconStyle} /> {t('tests')}
          </a>
        </li> 
       <li className={`sidebar-list-item ${activeItem === 'treatement' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
            <a
              style={{
                fontWeight: activeItem === 'treatement' ? 'bold' : 'normal',
                color: activeItem === 'treatement' ? '#ffffff' : '#ffffff',
              }}
              onClick={() => handleItemClick('treatement')}
            >
            <FontAwesomeIcon icon={faPills} style={iconStyle} /> Traitements 
      
       </a>
       </li>

        {userRole === 'admin' && (
          <li className={`sidebar-list-item ${activeItem === 'secteur' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
            <a
              style={{
                fontWeight: activeItem === 'secteur' ? 'bold' : 'normal',
                color: activeItem === 'secteur' ? '#ffffff' : '#ffffff',
              }}
              onClick={() => handleItemClick('secteur')}
            >
              <FontAwesomeIcon icon={faHospital} style={iconStyle} /> {t('speciality')}
            </a>
          </li>
        )}
        {userRole === 'admin' && (
          <li className={`sidebar-list-item ${activeItem === 'utilisateurs' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
            <a
              style={{
                fontWeight: activeItem === 'utilisateurs' ? 'bold' : 'normal',
                color: activeItem === 'utilisateurs' ? '#ffffff' : '#ffffff',
              }}
              onClick={() => handleItemClick('utilisateurs')}
            >
              <FontAwesomeIcon icon={faUsers} style={iconStyle} /> {t('users')}
            </a>
          </li>
        )}
        <li className={`sidebar-list-item ${activeItem === 'setting' ? 'active' : ''}`} style={{ marginBottom: '0px' }}>
          <a
            style={{
              fontWeight: activeItem === 'setting' ? 'bold' : 'normal',
              color: activeItem === 'setting' ? '#ffffff' : '#ffffff',
            }}
            onClick={() => handleItemClick('setting')}
          >
            <FontAwesomeIcon icon={faCog} style={iconStyle} /> {t('setting')}
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;


/* <ListItem button sx={{ justifyContent: 'center', marginBottom: 2 , marginLeft:1 }}>
        <Box display="flex" alignItems="center">
          <Avatar 
            alt={user?.firstname} 
            src={`http://localhost:3001/uploads/${user?.image}`} 
            sx={{ width: 65, height: 65 }} 
          />
          <Box display="flex" alignItems="center" ml={2}>
               <Typography variant="body1" color="white" sx={{ marginRight: 1 }}>{user?.speciality || "Admin"}</Typography>
               <IconButton size="small" onClick={() => setEditMode(true)} sx={{ color: 'white' }}>
               <Edit fontSize="small" />
               </IconButton>
          </Box>
        </Box>
      </ListItem>

      {editMode && (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          <TextField
            name="speciality"
            label="Speciality"
            value={formData.speciality}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<CameraAlt />}
            fullWidth
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      )}*/