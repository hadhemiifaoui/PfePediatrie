import axios from 'axios';

const notificationServices = {
  baseURL: 'http://localhost:3001/notifications',

  createNotification: async (notificationData) => {
    try {
      const response = await axios.post(`${notificationServices.baseURL}/`, notificationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getNotifications: async () => {
    try {
      const response = await axios.get(`${notificationServices.baseURL}/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await axios.patch(`${notificationServices.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  deleteNot : async (id) => {
    try {
      const response = await axios.delete(`${notificationServices.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default notificationServices;
