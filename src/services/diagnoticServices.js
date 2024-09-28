import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};



const diagnosticservices  = {
  baseURL: 'http://localhost:3001/diagnostics',



  create : async ({data}) => {
    try{
      const response = await axios.post(`${diagnosticservices.baseURL}/add`, {data} , getAuthHeaders())
      return response.data;
    }
    catch(err) {
        console.error(err)
    }
  },
  
  getDiagnostics : async () => {
    try {
        const response = await axios.get(`${diagnosticservices.baseURL}/` , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  }
  
,

getDiagnosticById : async (id) => { 
    try {
      const response = await axios.get(`${diagnosticservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } 
    catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  updateDiagnostic : async (id, updatedDiagnostic) => {
    try {
      const response = await axios.put(`${diagnosticservices.baseURL}/${id}`, updatedDiagnostic, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  deleteDiagnostic : async (id) => {
    try {
      const response = await axios.delete(`${diagnosticservices.baseURL}/${id}` ,getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
   confirmDiagnostic : async (diagnosticId, testResults) => {
    const response = await axios.post(`${diagnosticservices.baseURL}/${diagnosticId}/confirm`, testResults , getAuthHeaders());
    return response.data;
  },
  searchDiagnostic: async (query) => {
    try {
      const response = await axios.post(`${diagnosticservices.baseURL}/search`, query , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  }
  
}
export default diagnosticservices;
