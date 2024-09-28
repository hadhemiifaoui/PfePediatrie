import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, CircularProgress, Button } from '@mui/material';
import userServices from '../../services/userServices';
import { useNavigate } from 'react-router-dom';

const Enfant = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pediatreId = localStorage.getItem('userid');  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await userServices.getChildernUnderPedAssistance(pediatreId);
        if (response.success && Array.isArray(response.children)) {
          setChildren(response.children);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching children:', error);
        setError('Error fetching children');
        setLoading(false);
      }
    };
    fetchChildren();
  }, [pediatreId]);

  const handleUnlinkChild = async (childId) => {
    try {
      const response = await userServices.unlinkChildFromPediatre(pediatreId, childId);
      if (response.success) {
        // Remove the unlinked child from the state
        setChildren((prevChildren) => prevChildren.filter((child) => child._id !== childId));
      } else {
        console.error('Failed to unlink child:', response.message);
      }
    } catch (error) {
      console.error('Error unlinking child:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 3, marginLeft: -30, marginTop: -20 }}>
      <Typography variant="h8" color="gray" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
        Enfants sous assistance
      </Typography>
      <List>
        {children.length > 0 ? (
          children.map((child) => (
            <ListItem
              key={child._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                borderRadius: 2,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                marginBottom: 2,
              }}
            >
              <Avatar 
                src={`http://localhost:3001/uploads/${child.image}`} 
                alt={child.name} 
                sx={{ width: 56, height: 56 }} 
              />
              <ListItemText 
                primary={child.name} 
                secondary={`Date de naissance: ${child.dob}`} 
                sx={{ marginLeft: 2 }}
              />
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#4CAF50', 
                    '&:hover': {
                      backgroundColor: '#45A049',
                    },
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: 2,
                    fontWeight: 'bold',
                    marginRight: 2,
                  }}
                  onClick={() => {
                    localStorage.setItem('childId', child._id);
                    navigate(`/dashboard1/healthprofile/${pediatreId}/${child._id}`);
                  }}
                >
                  Voir profil
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => handleUnlinkChild(child._id)}
                >
                  Retirer de l'assistance
                </Button>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography>No children found</Typography>
        )}
      </List>
    </Box>
  );
};

export default Enfant;
