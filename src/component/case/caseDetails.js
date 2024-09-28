import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import casesServices from '../../services/casesServices';
import { Typography, Box, Button } from '@mui/material';

const CaseDetails = () => {
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const data = await casesServices.getCaseById(id);
        setCaseDetails(data);
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    };
  
    if (id) fetchCaseDetails();
  }, [id]);

  return (
    <Box p={2}>
      {caseDetails ? (
        <>
          <Typography variant="h4">{caseDetails.title}</Typography>
          <Typography variant="body1">Status: {caseDetails.status}</Typography>
          <Typography variant="body1">Pediatric Type: {caseDetails.pediatricType}</Typography>
          <Typography variant="body1">Description: {caseDetails.description}</Typography>
          <Typography variant="body1">Notes: {caseDetails.notes}</Typography>

          <Typography variant="h5" mt={2}>Diagnostics</Typography>
          {caseDetails.diagnostics.map((diagnostic) => (
            <Box key={diagnostic._id} p={1}>
              <Typography variant="body2">{diagnostic.name}</Typography>
            </Box>
          ))}

          <Button variant="contained" color="primary" href={`/cases/${id}/diagnostics/add`}>
            Add Diagnostic
          </Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default CaseDetails;
