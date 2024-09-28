import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Typography, IconButton, Menu, MenuItem, Avatar, Badge } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentification/AuthContext';
import notificationServices from '../../../services/notificationServices';
import { useSocket } from '../../../Socket/socketContext'
import '../../../appearence/show.css';

function Header({ OpenSidebar }) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const socket = useSocket(); 
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationServices.getNotifications();
        console.log('notification :', data);
        setNotifications(data);
        setUnreadCount(data.filter(notification => !notification.read).length);
      } catch (error) {
        console.error('error :', error);
      }
    };
    fetchNotifications();
  }, []);
  
  useEffect(() => {
    if (socket) {
      const handleNotification = (notification) => {
        console.log('notification :', notification);
        
        setNotifications((prevNotifications) => {
          const isNotificationExists = prevNotifications.some(notif => notif._id === notification._id);
          if (isNotificationExists) {
            console.log('Duplicate notification detected:', notification);
            return prevNotifications;
          }
          console.log('Adding new notification:', notification);
          return [notification, ...prevNotifications];
        });
  
        setUnreadCount((prevCount) => prevCount + 1);
      };
  
      socket.on('receiveNotification', handleNotification);
  
      return () => {
        socket.off('receiveNotification', handleNotification);
      };
    }
  }, [socket]);
 

  /*useEffect(() => {
    if (!socket) return; 
    const handleNotification = (notification) => {
    console.log('Received notification:', notification);
  
      setNotifications((prevNotifications) => {
        const isNotificationExists = prevNotifications.some(
          (notif) => notif._id === notification._id
        );
  
        if (isNotificationExists) {
          console.log('Duplicate notification detected:', notification);
          return prevNotifications;
        }
  
        console.log('Adding new notification:', notification);
        return [notification, ...prevNotifications];
      });
  
      setUnreadCount((prevCount) => prevCount + 1);
    };
    socket.on('receiveNotification', handleNotification);
    return () => {
      console.log('Cleaning up socket listener');
      socket.off('receiveNotification', handleNotification);
    };
  }, [socket]); 
  
*/





  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationServices.markAsRead(id);
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
      setUnreadCount(prevCount => Math.max(prevCount - 1, 0)); 
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <header className='header'>
      <Col>
        <IconButton sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#093678" }}>
            <ReorderIcon sx={{ marginLeft: -3 }} /> {t('PediHelp')}
          </Typography>
        </IconButton>
      </Col>

      <IconButton aria-controls="language-menu" aria-haspopup="true" onClick={handleLanguageClick}>
        <LanguageIcon sx={{ color: "#093678" }} />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageChange('fr')}>Français</MenuItem>
      </Menu>

      <IconButton onClick={handleNotificationsClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ color: "#093678" }} />
        </Badge>
      </IconButton>
      <Menu
        id="notifications-menu"
        anchorEl={notificationsAnchorEl}
        keepMounted
        open={Boolean(notificationsAnchorEl)}
        onClose={handleClose}
      >
        {notifications.map(notification => (
          <MenuItem key={notification._id} onClick={() => handleMarkAsRead(notification._id)}>
             <Avatar
              src={`http://localhost:3001/uploads/${notification.image}`}
              alt="Sender"
              sx={{ width: 24, height: 24, marginRight: 1 }}
            />{notification.message}
          </MenuItem>
        ))}
      </Menu>

      <Avatar
        alt={user?.firstname}
        onClick={handleMenuClick}
        src={`http://localhost:3001/uploads/${user?.image}`}
        sx={{ width: 25, height: 25 }}
      />
      <Menu
        id="account-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </header>
  );
}

export default Header;

/*



















*/