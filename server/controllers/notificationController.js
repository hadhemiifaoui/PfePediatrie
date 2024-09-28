const Notification = require('../models/situation_cliniques/notification');
const User = require('../models/users/user');
const { getNotificationSocket } = require('../Socket/notifSocket');

const createNotification = async (req, res) => {
  try {
    const { message, createdBy, sentTo, image } = req.body;
    const notification = new Notification({
      message,
      createdBy,
      sentTo,
      image,
      read: false
    });
    await notification.save();

    const io = getNotificationSocket(); 

    if (io) {
      io.emit('receiveNotification', notification); 
    } else {
      console.error('Socket.io instance is not initialized.');
    }

    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    const io = getNotificationSocket(); 

    if (io) {
      io.emit('notificationRead', { id }); 
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const not = await Notification.findByIdAndDelete(id);

    if (!not) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const io = getNotificationSocket(); 

    if (io) {
      io.emit('notificationDeleted', { id });
    }

    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification
};
