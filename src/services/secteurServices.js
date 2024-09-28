import axios from 'axios';

const secteurServices = {
    baseURL: 'http://localhost:3001/secteurs',

    create: async ({ nom }) => {
        try {
            const response = await axios.post(`${secteurServices.baseURL}/add`, { nom });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || error.message;
        }
    },

    getSecteurs: async () => {
        try {
            const response = await axios.get(`${secteurServices.baseURL}/`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    getSecteurById: async (id) => {
        try {
            const response = await axios.get(`${secteurServices.baseURL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    updateSecteur: async (id, data) => {
        try {
            const response = await axios.put(`${secteurServices.baseURL}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    deleteSecteur: async (id) => {
        try {
            const response = await axios.delete(`${secteurServices.baseURL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    addCaseToSecteur: async (secteurId, title, description) => {
        try {
            const response = await axios.post(`${secteurServices.baseURL}/addtoexisted`, {
                secteurId,
                title,
                description
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    deleteCaseFromSector: async (secteurId, caseId) => {
        try {
            const response = await axios.delete(`${secteurServices.baseURL}/${secteurId}/cases/${caseId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    getCaseFromSecteurById: async (secteurId, caseId) => {
        try {
            const response = await axios.get(`${secteurServices.baseURL}/${secteurId}/cases/${caseId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    },

    updateCaseIntoSector: async (secteurId, caseId, data) => {
        try {
            const response = await axios.put(`${secteurServices.baseURL}/${secteurId}/cases/${caseId}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    }
};

export default secteurServices;
