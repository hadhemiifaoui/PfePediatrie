import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const healthconditionservices = {
  baseURL: 'http://localhost:3001/healthconditions',

  create: async (data) => {
    try {
      const response = await axios.post(`${healthconditionservices.baseURL}/add`, data , getAuthHeaders());
      return response;
    } catch (err) {
      console.error(err);
    }
  },

  getHeathcondition: async () => {
    try {
      const response = await axios.get(`${healthconditionservices.baseURL}/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getHeathconditionById: async (id) => {
    try {
      const response = await axios.get(`${healthconditionservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  update: async (id, updatedData) => {
    try {
      const response = await axios.put(`${healthconditionservices.baseURL}/${id}`, updatedData , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${healthconditionservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getMedicationById: async (id) => {
    try {
      const response = await axios.get(`${healthconditionservices.baseURL}/med/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getHealthConditionsByParentId: async (patientId) => {
    try {
      const response = await axios.get(`${healthconditionservices.baseURL}/patient/${patientId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
  getHealthConditionsByChildId: async (childId) => {
    try {
      const response = await axios.get(`${healthconditionservices.baseURL}/child/${childId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

};


export default healthconditionservices;
