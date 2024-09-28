import React from 'react';
import Login from '../component/authentification/login';
import Navbar1 from '../component/authentification/NavBarSign';
import '../appearence/signupPageCss.css'; 
import { Card } from '@mui/material';
//import ImageLogin from '../../src/assets/login.png';
import ImageLogin1 from '../../src/assets/Photo3.jpg'
const LoginPage = () => {
  return (
    <>
      <Navbar1 />
      <Card style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2%',
        marginTop: '0%',
        height: '92vh', 
      }}>
        <div style={{ flex: 1, padding: '1%' }}>
          <Login />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src={ImageLogin1} alt='login' style={{ maxWidth: 600, height: 'auto' , marginRight:'60%' }} />
        </div>
      </Card>
    </>
  );
};

export default LoginPage;
