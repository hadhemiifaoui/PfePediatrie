import axios from 'axios';


const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const userServices  = {
  baseURL: 'http://localhost:3001/users',



  signUp : async ( { firstname ,lastname , email, password, birthday , role, tel } ) => {
    try{
      const response = await axios.post(`${userServices.baseURL}/register`,  { firstname ,lastname , email, password, birthday , role, tel } )
      return response.data;
    }
    catch (err) {
      console.error('Error in signUp service:', err);
      throw err;
    }
  },

  login: async (credentials) => {
    return await axios.post(`${userServices.baseURL}/login`, credentials);
  },
  refreshToken: async () => {
    const token = localStorage.getItem('token');
    return await axios.post(`${userServices.baseURL}/refresh-token`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },


  getAll : async () => {
    try{
      const response = await axios.get(`${userServices.baseURL}/`,  getAuthHeaders() )
      return response.data;
    }
    catch(err) {
        console.error(err)
    }
  } ,
  getUsersByRole: async (role) => {
    try {
      const response = await axios.get(`${userServices.baseURL}/byrole/${role}` , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  updateUser: async (id, updatedUser) => {
    try {
      const response = await axios.put(`${userServices.baseURL}/${id}`, updatedUser , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${userServices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${userServices.baseURL}/${id}` , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } 
   
  ,

  createProfile: async (id, formData) => {
    try {
      const response = await axios.post(`${userServices.baseURL}/${id}/createprofile`, formData, getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },


  sendTwoFactorCode: async (email) => {
    try {
      const response = await axios.post(`${userServices.baseURL}/send-two-factor-code`, { email } , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  verifyTwoFactorCode: async (email, twoFactorCode) => {
    try {
      const response = await axios.post(`${userServices.baseURL}/verify-two-factor-code`, { email, twoFactorCode } , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(`${userServices.baseURL}/request-password-reset`, { email } , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await axios.post(`${userServices.baseURL}/reset/${token}`, { password } , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  changePassword: async (email, currentPassword, newPassword) => {
    try {
      const response = await axios.post(`${userServices.baseURL}/change-password`, { email, currentPassword, newPassword } , getAuthHeaders());
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },

  deleteAccount: async (email) => {
    try {
      const response = await axios.delete(`${userServices.baseURL}/delete-account`, { data: { email }, ...getAuthHeaders() });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
,
   getChildernUnderPedAssistance : async(id) =>{
    try{
        const response = await axios.get(`http://localhost:3001/users/pediatre/${id}/children` , getAuthHeaders());
        return response.data;
    }
    catch(err){
      console.error(err);
    }
   }
, 
unlinkChildFromPediatre: async (pediatreId, childId) => {
  try {
    const response = await axios.delete(`http://localhost:3001/users/pediatricians/${pediatreId}/children/${childId}`, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.error('Error unlinking child:', err);
  }
}
,
changePassword: async (passwordData) => {
  try {
    const response = await axios.put(`${userServices.baseURL}/changepassword`, passwordData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error changing password' };
  }
},

deleteAccounteconst: async () => {
  try {
    const response = await axios.delete(`${userServices.baseURL}/deleteAccount`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error deleting account' };
  }
}
};


export default userServices;

