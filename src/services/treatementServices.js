import axios from 'axios';
  
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const treatementservices  = {
  baseURL: 'http://localhost:3001/traitements',



  create : async (data) => {
    try{
      const response = await axios.post(`${treatementservices.baseURL}/add`, data, getAuthHeaders())
      return response.data;
    }
    catch(err) {
        console.error(err)
    }
  },
  
  getTreatements : async () => {
    try {
        const response = await axios.get(`${treatementservices.baseURL}/` , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  }
  
,

getTreatementById : async ({id}) => { 
    try {
      const response = await axios.get(`${treatementservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } 
    catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  updateTreatement : async (id, data) => {
    try {
      const response = await axios.put(`${treatementservices.baseURL}/${id}`, data , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  deleteTreatement : async (id) => {
    try {
      const response = await axios.delete(`${treatementservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  }
}
export default treatementservices;
