import axios from 'axios';

  
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const vaccinservices = {
  baseURL: 'http://localhost:3001/vaccinations',

  create: async (data) => {
    try {
      const response = await axios.post(`${vaccinservices.baseURL}/add`, data ,getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  getVaccinations : async () => {
    try {
      const response = await axios.get(`${vaccinservices.baseURL}/` ,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getVaccinationById : async (id) => {
    try {
      const response = await axios.get(`${vaccinservices.baseURL}/${id}` ,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  update: async (id, updatedData) => {
    try {
      const response = await axios.put(`${vaccinservices.baseURL}/${id}`, updatedData ,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${vaccinservices.baseURL}/${id}`,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getVaccinByParentId: async (patientId) => {
    try {
      const response = await axios.get(`${vaccinservices.baseURL}/patient/${patientId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
  getVaccinByChildId: async (childId) => {
    try {
      const response = await axios.get(`${vaccinservices.baseURL}/child/${childId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
};
export default vaccinservices;
