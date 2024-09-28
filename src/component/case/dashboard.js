import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import DataCard from './dataCard';
import AddDialog from './addDialog';

const initialData = {
    cases: [],
    diagnostics: [],
    treatments: [],
    symptoms: [],
    tests: []
};

const Dashboard = () => {
    const [data, setData] = useState(initialData);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');

    const handleAddData = (type) => {
        setDialogType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmitData = (type, formData) => {
        setData({
            ...data,
            [type]: [...data[type], formData],
        });
    };

    const cards = [
        { title: 'Cases', columns: ['Health Condition', 'Diagnosed In', 'Medications', 'Treated By', 'Notes'], data: data.cases, type: 'cases' },
        { title: 'Diagnostics', columns: ['Test', 'Result', 'Date'], data: data.diagnostics, type: 'diagnostics' },
        { title: 'Treatments', columns: ['Medication', 'Dosage', 'Duration'], data: data.treatments, type: 'treatments' },
        { title: 'Symptoms', columns: ['Symptom', 'Severity', 'Notes'], data: data.symptoms, type: 'symptoms' },
        { title: 'Tests', columns: ['Test Name', 'Date', 'Result'], data: data.tests, type: 'tests' },
    ];

    return (
        <Container>
            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid item xs={12} key={index}>
                        <DataCard
                            title={card.title}
                            columns={card.columns}
                            data={card.data}
                            onAdd={() => handleAddData(card.type)}
                        />
                    </Grid>
                ))}
            </Grid>
            <AddDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSubmit={handleSubmitData}
                type={dialogType}
            />
        </Container>
    );
};

export default Dashboard;
