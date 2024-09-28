import axios from 'axios';

  
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


const testservices = {
  baseURL: 'http://localhost:3001/tests',

  createTest: async (testData) => {
    try {
      const response = await axios.post(`${testservices.baseURL}/add`, testData , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  getTests: async () => {
    try {
      const response = await axios.get(`${testservices.baseURL}/` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getTestById: async (id) => {
    try {
      const response = await axios.get(`${testservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getTestsByDiagnosticId: async (diagnosticId) => {
    try {
      const response = await axios.get(`${testservices.baseURL}/diagnostic/${diagnosticId}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  updateTest: async (id, updatedTest) => {
    try {
      const response = await axios.put(`${testservices.baseURL}/${id}`, updatedTest , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  deleteTest: async (id) => {
    try {
      const response = await axios.delete(`${testservices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  }
};

export default testservices;
