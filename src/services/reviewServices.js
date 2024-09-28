import axios from 'axios';

const reviewServices = {
  baseURL: 'http://localhost:3001/reviews',

  addReview: async (reviewData) => {
    try {
      const response = await axios.post(`${reviewServices.baseURL}/`, reviewData);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getReviews: async () => {
    try {
      const response = await axios.get(`${reviewServices.baseURL}/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getReviewById: async (id) => {
    try {
      const response = await axios.get(`${reviewServices.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  updateReview: async (id, updatedReview) => {
    try {
      const response = await axios.patch(`${reviewServices.baseURL}/${id}`, updatedReview);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  deleteReview: async (id) => {
    try {
      const response = await axios.delete(`${reviewServices.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default reviewServices;
