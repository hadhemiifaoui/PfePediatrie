import React, { useState } from 'react';
import Sidebar from '../component/dashboards/admindash/sidebar';
import Home from '../component/dashboards/admindash/home';
import SecteurList from '../component/secteurcomponent/secteurList';
import CaseList from '../component/case/caseList';
import DiagnosticsList from '../component/Diagnostics/viewDiagnostic';
import Header from '../component/dashboards/admindash/header';
import Diagnostics from '../component/Diagnostics/viewAllDiagnostics';
import Symptoms from '../component/Symptoms/viewAllSymptoms';
import '../appearence/show.css';
import ViewUsers from '../component/utilisateurs/viewUsers';
import Tests from '../component/Tests/viewTests'
import Treatments from '../component/Traitement/treatementList'
import Parametre from '../component/Parameter/parameter';
import AddReviewForm from '../component/Review/addReview';
import NotificationList from '../component/Notification/notification'
function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleItemClick = (item) => {
    console.log('handleItemClick - item:', item);
    setSelectedItem(item);
    setSelectedCaseId(null);
    setSidebarOpen(false);
  };

  const handleShowDiagnostics = (caseId) => {
    console.log('handleShowDiagnostics - caseId:', caseId);
    setSelectedItem('diagnostic');  
    setSelectedCaseId(caseId);
  };

  return (
    
    <div className='grid-container'>
      <Header OpenSidebar={toggleSidebar} />
      <Sidebar
        openSidebarToggle={sidebarOpen}
        handleItemClick={handleItemClick}
        activeItem={selectedItem}
      />
      <main className="main-container">
        {selectedItem === 'cases' && (
          <CaseList onShowDiagnostics={handleShowDiagnostics} />
        )}
         {selectedItem === 'diagnostic' && (<Diagnostics/>)}
         {selectedItem === 'symptoms' && (<Symptoms/>)}
         {selectedItem === 'tests' && (<Tests/>)}
        {selectedItem === 'diagnostic' && selectedCaseId && (
          <DiagnosticsList caseId={selectedCaseId} />
        )}
        {selectedItem === 'secteur' && <SecteurList />}
        {selectedItem === 'treatement' && <Treatments />}
        {selectedItem === 'utilisateurs' && <ViewUsers />}
        {selectedItem === 'feedback' && <AddReviewForm />}
        {selectedItem === 'Backups' && <Parametre />}
        {selectedItem === 'notification' && <NotificationList />}
        {selectedItem === 'home' && <Home />}
      </main>
    </div>
  );
}

export default AdminDashboard;
