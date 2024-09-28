import axios from 'axios';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const pediatriccasesServices  = {
  baseURL: 'http://localhost:3001/pediatriccases',



  create : async ({title, description, secteur }) => {
    try{
      const response = await axios.post(`${pediatriccasesServices.baseURL}/add`, 
        {title, description, secteur } , getAuthHeaders())
      return response.data;
    }
    catch(err) {
        console.error(err)
    }
  },
  
  getPediatricCases : async () => {
    try {
        const response = await axios.get(`${pediatriccasesServices.baseURL}/` , getAuthHeaders());
        return response.data;
      } 
    catch (error) {
        throw error.response.data.message || error.message;
      }
  }
  
,

getPediatricCasesById : async ({id}) => { 
    try {
      const response = await axios.get(`${pediatriccasesServices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } 
    catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  updatePediatricCase : async ({id, data}) => {
    try {
      const response = await axios.put(`${pediatriccasesServices.baseURL}/${id}`, {data} , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  deletePediatricCase : async ({id}) => {
    try {
      const response = await axios.delete(`${pediatriccasesServices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  }
}
export default pediatriccasesServices;
