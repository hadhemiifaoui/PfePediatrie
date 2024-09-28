import React, { createContext, useState, useContext } from 'react';
import { addSymptom, viewSymptoms } from '../services/symptomServices';

const SymptomContext = createContext();

export const SymptomProvider = ({ children }) => {
  const [symptoms, setSymptoms] = useState([]);

  const loadSymptoms = async (caseId) => {
    try {
      const symptomsData = await viewSymptoms(caseId);
      setSymptoms(symptomsData);
    } catch (error) {
      console.error('Error loading symptoms:', error);
    }
  };

  const addSymptomToCase = async (caseId, symptomData) => {
    try {
      const newSymptom = await addSymptom(caseId, symptomData);
      setSymptoms([...symptoms, newSymptom]);
    } catch (error) {
      console.error('Error adding symptom:', error);
      throw error;
    }
  };


  return (
    <SymptomContext.Provider value={{ symptoms, loadSymptoms, addSymptomToCase }}>
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptomContext = () => useContext(SymptomContext);

export default SymptomContext;
