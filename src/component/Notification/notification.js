
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Avatar, IconButton , Container} from '@mui/material';
//import CloseIcon from '@mui/icons-material/Close';
import { Trash } from 'react-bootstrap-icons';
import notificationServices from '../../services/notificationServices';
import Title from '../title/title';
function NotificationList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationServices.getNotifications();
        setNotifications(data);  
      } catch (error) {
        console.error('error getting notifs:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    try {
      await notificationServices.deleteNot(id);
      setNotifications((prevNotifications) => 
        prevNotifications.filter(notification => notification._id !== id)
      );
    } catch (error) {
      console.error('error removing notif:', error);
    }
  };

  return (
    <Container style={{ marginTop: '3%' }}>
      <Title>Liste des notifications </Title>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification._id}>
            <Avatar
              src={`http://localhost:3001/uploads/${notification.image}`}
              alt="Sender"
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <ListItemText 
              primary={notification.message}  sx={{color:"#110804"}} 
              secondary={`Crée Le ${new Date(notification.createdAt).toLocaleString()}`}
            />
            <IconButton onClick={() => handleDeleteNotification(notification._id)}>
              <Trash  color='red' fontSize={15}/>
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default NotificationList;
