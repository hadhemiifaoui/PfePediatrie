import axios from 'axios';


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const allergyservices = {
  baseURL: 'http://localhost:3001/allergies',

  create: async (data) => {
    try {
      const response = await axios.post(`${allergyservices.baseURL}/add`, data , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  getAllergies : async () => {
    try {
      const response = await axios.get(`${allergyservices.baseURL}/` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getAllegryById : async (id) => {
    try {
      const response = await axios.get(`${allergyservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  update: async (id, updatedData) => {
    try {
      const response = await axios.put(`${allergyservices.baseURL}/${id}`, updatedData , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${allergyservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getMedicationById: async (id) => {
    try {
      const response = await axios.get(`${allergyservices.baseURL}/med/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },


  getAllergiesByChildId: async (childId) => {
    try {
      const response = await axios.get(`${allergyservices.baseURL}/child/${childId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  getAllergyByParentId: async (patientId) => {
    try {
      const response = await axios.get(`${allergyservices.baseURL}/patient/${patientId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
};


export default allergyservices;
