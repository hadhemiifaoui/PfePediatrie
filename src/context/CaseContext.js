import React, { createContext, useState, useContext, useEffect } from 'react';
import casesServices from '../services/casesServices';
import { useAuth } from '../component/authentification/AuthContext'; 

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [diagnostics, setDiagnostics] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('Cases');
  const { refreshToken } = useAuth(); 

  const loadCases = async () => {
    try {
      const data = await casesServices.getCases();
      setCases(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        const data = await casesServices.getCases();
        setCases(data);
      } else {
        console.error('Error loading cases:', error);
      }
    }
  };

  const loadDiagnostics = async (caseId) => {
    try {
      const data = await casesServices.getCaseById(caseId);
      setDiagnostics((prev) => ({
        ...prev,
        [caseId]: data,
      }));
    } catch (error) {
      console.error('Error loading diagnostics:', error);
    }
  };

  const addCase = async (caseData) => {
    try {
      const response = await casesServices.create(caseData);
      setCases((prevCases) => [...prevCases, response]);
      return response;
    } catch (error) {
      console.error('Error adding case:', error);
      throw error;
    }
  };

  const deleteCase = async (caseId) => {
    try {
      await casesServices.deleteCase(caseId);
      setCases((cases) => cases.filter((caseItem) => caseItem._id !== caseId));
    } catch (error) {
      console.error('Error deleting case:', error);
      throw error;
    }
  };

  const updateCase = async (caseId, updatedCaseData) => {
    try {
      const updatedCase = await casesServices.update(caseId, updatedCaseData);
      setCases((cases) =>
        cases.map((caseItem) => (caseItem._id === caseId ? updatedCase : caseItem))
      );
      return updatedCase;
    } catch (error) {
      console.error('Error updating case:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  return (
    <CaseContext.Provider
      value={{ cases, diagnostics, loadCases, loadDiagnostics, addCase, deleteCase, updateCase, activeMenuItem, setActiveMenuItem }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCaseContext = () => useContext(CaseContext);

export default CaseContext;
