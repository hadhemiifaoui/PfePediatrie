import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const consultationservices = {
  baseURL: 'http://localhost:3001/consultation',


 create: async (data) => {
    try {
      const response = await axios.post(`${consultationservices.baseURL}/create`, data, getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error('Error creating consultation:', err.response ? err.response.data : err.message);
      throw err.response ? err.response.data.message || err.message : err.message;
    }
  },
  

  // Get a single consultation by ID
  getConsultationById: async (id) => {
    try {
      const response = await axios.get(`${consultationservices.baseURL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  // Request Consultation
  requestConsultation: async (data) => {
    try {
      const response = await axios.post(`${consultationservices.baseURL}/request`, data, getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
      throw err.response.data.message || err.message;
    }
  },

  // Schedule Consultation
  scheduleConsultation: async (data) => {
    try {
      const response = await axios.post(`${consultationservices.baseURL}/schedule`, data, getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
      throw err.response.data.message || err.message;
    }
  },

  joinConsultationVideo: async (roomId) => {
    if (!roomId) {
      throw new Error('roomId is required');
    }
  
    try {
      const response = await axios.post(`${consultationservices.baseURL}/join/${roomId}`, null, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error joining consultation video:', error.message);
      throw error;
    }
  }
  
};

export default consultationservices;
