import React from 'react';
import SignUp from '../component/authentification/signup';
import Navbar1 from '../component/authentification/NavBarSign';
import {Card} from '@mui/material'
import '../appearence/signupPageCss.css'; 
//import ImageLogin from '../../src/assets/login.png';
import ImageLogin1 from '../../src/assets/Photo3.jpg'

const SignUpPage = () => {
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
            <SignUp />
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
          <img src={ImageLogin1} alt='login' style={{ maxWidth: 600, height: 'auto' , marginRight:'60%' }} />
        </div>
        </Card>
      </>
    );
}

export default SignUpPage;
