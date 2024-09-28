import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const hospitalisationservices = {
  baseURL: 'http://localhost:3001/hospitalisations',

  create: async (data) => {
    try {
      const response = await axios.post(`${hospitalisationservices.baseURL}/add`, data , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  getHospitalisations : async () => {
    try {
      const response = await axios.get(`${hospitalisationservices.baseURL}/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getHospitalisationById : async (id) => {
    try {
      const response = await axios.get(`${hospitalisationservices.baseURL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  update: async (id, updatedData) => {
    try {
      const response = await axios.put(`${hospitalisationservices.baseURL}/${id}`, updatedData, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${hospitalisationservices.baseURL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getHospByParentId: async (patientId) => {
    try {
      const response = await axios.get(`${hospitalisationservices.baseURL}/patient/${patientId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
  getHospByChildId: async (childId) => {
    try {
      const response = await axios.get(`${hospitalisationservices.baseURL}/child/${childId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
};
export default hospitalisationservices;
