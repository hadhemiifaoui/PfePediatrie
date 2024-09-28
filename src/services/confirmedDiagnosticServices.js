import axios from 'axios';


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const confirmeddiagnosticservices  = {
  baseURL: 'http://localhost:3001/confirmeddiagnostics',



  create : async ({data}) => {
    try{
      const response = await axios.post(`${confirmeddiagnosticservices.baseURL}/add`, {data} , getAuthHeaders())
      return response.data;
    }
    catch(err) {
        console.error(err)
    }
  },
  
  getConfirmedDiagnostics : async () => {
    try {
        const response = await axios.get(`${confirmeddiagnosticservices.baseURL}/` , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  }
  
,

getConfirmedDiagnosticById : async (id) => { 
    try {
      const response = await axios.get(`${confirmeddiagnosticservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } 
    catch (error) {
      throw error.response.data.message || error.message;
    }
  },
  getConfirmedDiagnosticsByDiagnosticId: async (diagnosticId) => {
    try {
      const response = await axios.get(`${confirmeddiagnosticservices.baseURL}/diagnostic/${diagnosticId}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  updateConfirmedDiagnostic : async (id, updatedConfirmedDiagnostic) => {
    try {
      const response = await axios.put(`${confirmeddiagnosticservices.baseURL}/${id}`, updatedConfirmedDiagnostic, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  deleteConfirmedDiagnostic : async (id) => {
    try {
      const response = await axios.delete(`${confirmeddiagnosticservices.baseURL}/${id}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  }
}
export default confirmeddiagnosticservices;
