import axios from 'axios'


  
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


const symptomsservices  = {
 baseURL  : 'http://localhost:3001/symptoms',

 addSymptom : async (symptomData) => {
  try {
    const response = await axios.post(`${symptomsservices.baseURL}/add`, symptomData , getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
},

 viewSymptoms: async (caseId) => {
  try {
    const response = await axios.get(`${symptomsservices.baseURL}/cases/${caseId}/symptoms`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
},


 removeSymptom : async (id) =>  {
  try {
    const response = await axios.delete(`${symptomsservices.baseURL}/${id}`, getAuthHeaders());
    if (response && response.data) {
      console.log('API response:', response.data);
      return response.data;
    } else {
      throw new Error('No data in response');
    }
  } catch (error) {
    console.error('Error deleting symptom:', error);
    throw error;
  }
},

updateSymptom : async (id , symptomData) =>  {
  try {
    const response = await axios.put(`${symptomsservices.baseURL}/${id}`,symptomData ,  getAuthHeaders());
    if (response && response.data) {
      console.log('API response:', response.data);
      return response.data;
    } else {
      throw new Error('No data in response');
    }
  } catch (error) {
    console.error('Error deleting symptom:', error);
    throw error;
  }
},


  searchCase : async(id) => {
    try{
      const response = await axios.get(`${symptomsservices.baseURL}/symp/search/${id}/symptoms`, getAuthHeaders());
      return response.data;
    }
    catch(error){
      console.error('Error Fetching symptom:', error);
      throw error; 
    }
  }
}
export default symptomsservices;
