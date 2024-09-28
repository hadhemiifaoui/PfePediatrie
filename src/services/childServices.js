import axios from 'axios';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const childservices = {
  baseURL: 'http://localhost:3001/childrens',

  create: async (data) => {
    try {
      const response = await axios.post(`${childservices.baseURL}/add`, data , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  getAllChild : async () => {
    try {
      const response = await axios.get(`${childservices.baseURL}/` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getChildById : async (id) => {
    try {
      const response = await axios.get(`${childservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  update: async (id, updatedData) => {
    try {
      const response = await axios.put(`${childservices.baseURL}/${id}`, updatedData , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  remove: async (id) => {
    try {
      const response = await axios.delete(`${childservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getChildByParentId: async (parentId) => {
    try {
      const response = await axios.get(`${childservices.baseURL}/parent/${parentId}` , getAuthHeaders());
      //return response.data[0];
     return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
 
  getAllPediatres: async () => {
    try {
    const response = await axios.get(`${childservices.baseURL}/peds` , getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
  },

   getPedByChildId: async (id) => {
    try {
    const response = await axios.get(`${childservices.baseURL}/ped/${id}` , getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
  },

  getChildByPediatreIdAndChildId: async({pediatreId , childId}) =>{
    try {
      const response = await axios.get(`${childservices.baseURL}/pediatre/${pediatreId}/${childId}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
  getChildByPediatreAndParent: async (pediatreId, parentId) => {
    try {
      const response = await axios.get(`${childservices.baseURL}/pediatre/${pediatreId}/parent/${parentId}/child`);
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
};



export default childservices;
