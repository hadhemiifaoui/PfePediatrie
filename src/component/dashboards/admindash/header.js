import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Typography, IconButton, Menu, MenuItem, Avatar, Badge } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close'; 
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../authentification/AuthContext';
import notificationServices from '../../../services/notificationServices';
import { useSocket } from '../../../Socket/socketContext';
import '../../../appearence/show.css';

function Header({ OpenSidebar }) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { logout, user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationServices.getNotifications();
        const adminNotifications = user.role === 'admin' ? data : [];
  
        await Promise.all(adminNotifications.map(notification => 
          notificationServices.markAsRead(notification._id)
        ));
  
        const unreadNotifications = adminNotifications.filter(notification => !notification.read);
  
        setNotifications(adminNotifications);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  }, [user]);
  

  useEffect(() => {
    if (socket && user) {
      socket.emit('userConnected', { userId: user._id, role: user.role });
  
      const handleNotification = (notification) => {
        if (user.role === 'admin') {
          setNotifications((prevNotifications) => {
            const isNotificationExists = prevNotifications.some(notif => notif._id === notification._id);
            
            if (!isNotificationExists) {
              setUnreadCount((prevCount) => prevCount + 1);
              return [notification, ...prevNotifications];  
            }
            return prevNotifications;
          });
        }
      };
  
      socket.on('receiveNotification', handleNotification);
  
      return () => {
        socket.off('receiveNotification', handleNotification);
      };
    }
  }, [socket, user]);


  //handle  menu languye
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

  // handle menu conmpte
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  //handle notif click 
  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };



  const handleMarkAsRead = async (id) => {
    try {
      await notificationServices.markAsRead(id);
      setNotifications((prevNotifications) => 
        prevNotifications.map(notification =>
          notification._id === id ? { ...notification, read: true } : notification
        )
      );
      setUnreadCount((prevCount) => Math.max(prevCount - 1, 0)); 
    } catch (error) {
      console.error('error to mark notif as read', error);
    }
  };
  

  // Supprimer notification
  const handleDeleteNotification = async (id) => {
    try {
      await notificationServices.deleteNot(id);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('eror remove notif:', error);
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
            />
            {notification.message}
            <IconButton 
              onClick={(e) => { e.stopPropagation(); handleDeleteNotification(notification._id); }}
              size="small" 
            >
              <CloseIcon sx={{ color: 'red', fontSize: 'small' }} /> 
            </IconButton>
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

