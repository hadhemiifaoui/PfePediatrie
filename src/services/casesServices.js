import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const casesServices = {
  baseURL: 'http://localhost:3001/cases',

  getCases: async () => {
    try {
      const response = await axios.get(`${casesServices.baseURL}` , getAuthHeaders());
      console.log('Cases response:', response.data); 

      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  create: async (newCaseData) => {
    try {
      const response = await axios.post(`${casesServices.baseURL}/add`, newCaseData , getAuthHeaders());
      console.log('Cases response:', response.data); 

      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  update: async (id, updatedCaseData) => {
    try {
      const response = await axios.put(`${casesServices.baseURL}/${id}`, updatedCaseData , getAuthHeaders());
      console.log('Cases response:', response.data); 

      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  deleteCase: async (id) => {
    try {
      const response = await axios.delete(`${casesServices.baseURL}/${id}` , getAuthHeaders());
      console.log('Cases response:', response.data); 

      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getCaseById: async (id) => {
 console.log('Fetching case with ID:', id);
  try {
    const response = await axios.get(`${casesServices.baseURL}/${id}` , getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
  },

  addDiagnostic: async (caseId, diagnosticData) => {
    try {
      const response = await axios.post(`${casesServices.baseURL}/${caseId}/diagnostics/add`, diagnosticData , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  viewDiagnostics: async (caseId) => {
    try {
      const response = await axios.get(`${casesServices.baseURL}/${caseId}/diagnostics` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },
 viewDiagnosticsByCaseName : async (caseName) => {
    try {
      const response = await axios.get(`${casesServices.baseURL}/cases/diagnostics?caseName=${caseName}` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  addTreatment: async (caseId, treatmentData) => {
    try {
      const response = await axios.post(`${casesServices.baseURL}/${caseId}/treatments/add`, treatmentData , getAuthHeaders());
      console.log('Treatment added:', response.data);
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  viewTreatments: async (caseId) => {
    try {
      const response = await axios.get(`${casesServices.baseURL}/${caseId}/treatments` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  addSymptom: async (caseId, symptomData) => {
    try {
      const response = await axios.post(`${casesServices.baseURL}/${caseId}/symptoms/add`, symptomData , getAuthHeaders());
      return response.data;
    }
    catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  viewSymptoms: async (caseId) => {
    try {
      const response = await axios.get(`${casesServices.baseURL}/${caseId}/symptoms` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  addTest: async (caseId, testData) => {
    try {
      console.log('Sending test data:', testData); 
      const response = await axios.post(`${casesServices.baseURL}/${caseId}/tests/add`, testData, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Failed to add test:', error.response?.data || error.message);
      throw error.response?.data.message || error.message;
    }
  },

  getTests: async (caseId) => {
    try {
      const response = await axios.get(`${casesServices.baseURL}/${caseId}/tests` , getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },

  getCasesByPediatricType: async (pediatricType) => {
    try {
      const response = await axios.get(`${casesServices.baseURL}/pediatricType/${pediatricType}`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response.data.message || error.message;
    }
  },


getAllCaseTitle : async () => {
  try{
    const response = await axios.get(`${casesServices.baseURL}/ss/titles`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
},

//hedhi bech njib diagnostic by pediatric type (yjib el cases baad yaamle populate 3al Diagnostics )

getDiagnosticsByPediatricRole  : async(pediatricType) => {
  try{
    const response = await axios.get(`${casesServices.baseURL}/ped/${pediatricType}`, getAuthHeaders());
    return response.data;
  }
  catch(error) {
    throw error.response.data.message || error.message; 
  }
}




};
export default casesServices;
