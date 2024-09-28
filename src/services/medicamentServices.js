import axios from 'axios';


const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };



const medicamentServices = {
  baseURL: 'http://localhost:3001/medicaments',

  addMed: async (medData) => {
    try {
      const response = await axios.post(`${medicamentServices.baseURL}/`, medData , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getMeds : async () => {
    try {
      const response = await axios.get(`${medicamentServices.baseURL}/` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getMedById: async (id) => {
    try {
      const response = await axios.get(`${medicamentServices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  updateMed : async (id, updatedMed) => {
    try {
      const response = await axios.patch(`${medicamentServices.baseURL}/${id}`, updatedMed , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  deleteMed : async (id) => {
    try {
      const response = await axios.delete(`${medicamentServices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default medicamentServices;
