import React from 'react';
import { FaBaby, FaStethoscope, FaClinicMedical, FaMedkit } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import '../../../appearence/home.css';
import { useTranslation } from 'react-i18next';

function Home() {
    const data = [
        {
          name: 'Jan',
          patients: 120,
          consultations: 85,
          treatments: 75,
        },
        {
          name: 'Feb',
          patients: 150,
          consultations: 95,
          treatments: 85,
        },
        {
          name: 'Mar',
          patients: 200,
          consultations: 130,
          treatments: 100,
        },
        {
          name: 'Apr',
          patients: 170,
          consultations: 115,
          treatments: 90,
        },
        {
          name: 'May',
          patients: 220,
          consultations: 140,
          treatments: 110,
        },
        {
          name: 'Jun',
          patients: 180,
          consultations: 125,
          treatments: 105,
        },
        {
          name: 'Jul',
          patients: 210,
          consultations: 135,
          treatments: 120,
        },
    ];

    const { t } = useTranslation();

     
    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3></h3>
            </div>

            <div className='main-cards'>
                <div className='card-patients'>
                    <div>
                        <h3>{t('totalPatient')}</h3>
                        <FaBaby className='card_icon1'/> <h1>560</h1>
                    </div>
                </div>
                <div className='card-consultations'>
                    <div className='card-inner'>
                        <h3>{t('consultations')}</h3>
                        <FaStethoscope className='card_icon2'/> <h1>150</h1>
                    </div>
                </div>
                <div className='card-treatments'>
                    <div className='card-inner'>
                        <h3>{t('treatement')}</h3>
                        <FaMedkit className='card_icon3'/>  <h1>200</h1>
                    </div>
                </div>
                <div className='card-alerts'>
                    <div className='card-inner'>
                        <h3>{t('alert')}</h3>
                        <FaClinicMedical className='card_icon4'/>  <h1>10</h1>
                    </div>
                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="patients" fill="#a4c9e1" />  
                        <Bar dataKey="consultations" fill="#c1e2b3" />  
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="patients" stroke="#a4c9e1" strokeWidth={2} activeDot={{ r: 8 }} />  
                        <Line type="monotone" dataKey="consultations" stroke="#c1e2b3" strokeWidth={2} />  
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="treatments" fill="#f7a4a4" /> 
                        <Bar dataKey="consultations" fill="#c1e2b3" />  
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="treatments" stroke="#f7a4a4" strokeWidth={2} activeDot={{ r: 8 }} /> 
                        <Line type="monotone" dataKey="patients" stroke="#a4c9e1" strokeWidth={2} /> 
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </main>
    );
}

export default Home;
