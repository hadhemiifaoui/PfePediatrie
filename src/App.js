import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import SignUpPage from './pages/signupPage';
import LoginPage from './pages/loginpage';
import HomePage from './pages/homePage';
import AdminDashboard from './pages/dashboardPage';
import { CaseProvider } from './context/CaseContext';
import CaseDetails from './component/case/caseDetails';
import HealthProfilePage from './pages/healthProfile';
import HealthProfilePage1 from './pages/healthProfilePage1';

import HomePatientPage from './pages/HomePatientPage';
import AuthProvider from './component/authentification/AuthContext';
import ProtectedRoute from './component/authentification/ProtectedRoute';
import HealthConditionPage from './pages/HeathConditionPage'
import PedAccountePage from './component/Accounte/pageProfile'
import VaccinationPage from './pages/VaccinationPage'
import MedicationsPage from './pages/MedicationsPage'
import HospitalisationPage from './pages/HospitalisationPage'
import AllergyPage from './pages/AllergiesPage'
//import VideoConsultation from './component/patientComponent/VidoéConsulation/videoCall';
//import DemandeConsultation from './component/patientComponent/VidoéConsulation/consultPlanning'

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <CaseProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute roles={['admin', 'pediatre']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/dashboard1" element={<ProtectedRoute roles={['patient', 'pediatre']}><HomePatientPage /></ProtectedRoute>} />
            <Route path="/accounte" element={<ProtectedRoute roles={['pediatre']}><PedAccountePage /></ProtectedRoute>} />
          
            <Route path="/dashboard1/healthprofile/:parentId" element={<ProtectedRoute roles={['patient', 'pediatre']}><HealthProfilePage /></ProtectedRoute>} />
            
            <Route path="/dashboard1/healthprofile/:pediatreId/:childId" element={<ProtectedRoute roles={['patient', 'pediatre']}><HealthProfilePage1 /></ProtectedRoute>} />


            <Route path="/dashboard1/healthconditions/:parentId" element={<ProtectedRoute roles={['patient', 'pediatre']}><HealthConditionPage /></ProtectedRoute>} />

            <Route path="/dashboard1/vaccination/:parentId" element={<ProtectedRoute roles={['patient', 'pediatre']}><VaccinationPage /></ProtectedRoute>} />
            <Route path="/dashboard1/medication/:parentId" element={<ProtectedRoute roles={['patient', 'pediatre']}><MedicationsPage /></ProtectedRoute>} />
            <Route path="/dashboard1/hospitalisation/:parentId" element={<ProtectedRoute roles={['patient', 'pediatre']}><HospitalisationPage/></ProtectedRoute>} />

            <Route path="/dashboard1/allergies/:parentId" element={<ProtectedRoute roles={['patient', 'pediatre']}>< AllergyPage /></ProtectedRoute>} />
              
          

            <Route path="/cases/:caseId" element={<CaseDetails />} />
          </Routes>
        </CaseProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;



/*  <Route path="/dashboard1/consultation" element={<ProtectedRoute roles={['patient', 'pediatre']}>< VideoConsultation/></ProtectedRoute>} />

            <Route path="/dashboard1/planningconsultation" element={<ProtectedRoute roles={['patient', 'pediatre']}>< DemandeConsultation/></ProtectedRoute>} />

*/