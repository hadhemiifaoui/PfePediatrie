import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const medicationservices  = {
  baseURL: 'http://localhost:3001/medications',



  create : async (data) => {
    try{
      const response = await axios.post(`${medicationservices.baseURL}/add`, data , getAuthHeaders())
      return response.data;
    }
    catch(err) {
        console.error(err)
    }
  },
  
  getMedications : async () => {
    try {
        const response = await axios.get(`${medicationservices.baseURL}/` , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  },

  getMedicationById: async (id) => {
    try {
      const response = await axios.get(`${medicationservices.baseURL}/${id}` , getAuthHeaders());
      return response.data; 
    } catch (error) {
      console.error(`Error fetching medication ${id}:`, error);
      throw new Error('Medication Details Not Found'); 
    }
  },
  update : async (id , updatedData) => {
    try {
        const response = await axios.put(`${medicationservices.baseURL}/${id}` , updatedData , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  },
  remove : async (id) => {
    try {
        const response = await axios.delete(`${medicationservices.baseURL}/${id}`  , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  },

  getMedicationByParentId: async (patientId) => {
    try {
      const response = await axios.get(`${medicationservices.baseURL}/patient/${patientId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
  getMedicationByChildId: async (childId) => {
    try {
      const response = await axios.get(`${medicationservices.baseURL}/child/${childId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

};
export default medicationservices;
