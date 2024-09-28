import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faHeartPulse, faHandHoldingDroplet , faBandage } from '@fortawesome/free-solid-svg-icons';
import '../../appearence/medicalIcons.css';
const MedicalIconsSidebar = () => {
    return (
        <div className="medical-icons-sidebar">
        <div className="icon-item">
            <span className="description">Convenient and cost-effective healthcare management</span>
            <FontAwesomeIcon icon={faStethoscope} className="icon" />
        </div>
        <div className="icon-item">
            <span className="description">Participate better in your own healthcare</span>
            <FontAwesomeIcon icon={faHeartPulse} className="icon" />
        </div>
        <div className="icon-item">
            <span className="description">Communicate with your healthcare providers wherever you are</span>
            <FontAwesomeIcon icon={faHandHoldingDroplet} className="icon" />
        </div>
        <div className="icon-item">
            <span className="description">Comprehensive wound care management</span>
            <FontAwesomeIcon icon={faBandage} className="icon" />
        </div>
        </div>
    );
}

export default MedicalIconsSidebar;

/*


*/


//import LoginImage from '../../assets/login.png'


/*
  <div>
             
         <img src={LoginImage} alt="Login" />
          
      </div>


      */