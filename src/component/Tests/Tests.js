/*import React, { useState } from 'react';
import { Card, CardContent, Typography, Button , IconButton} from '@mui/material';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import AddBacteriologiqueForm from '../addBactTest';
import AddRadiologiqueForm from '../addRadioTest';
import AddBiologiqueForm from '../addBiolTest';

const TestComponent = ({ onAddBacteriologique, onAddRadiologique, onAddBiologique }) => {
 
  const [openBacteriologiqueForm, setOpenBacteriologiqueForm] = useState(false);
  const [openRadiologiqueForm, setOpenRadiologiqueForm] = useState(false);
  const [openBiologiqueForm, setOpenBiologiqueForm] = useState(false);

  const handleOpenBacteriologiqueForm = () => {
    setOpenBacteriologiqueForm(true);
  };

  const handleCloseBacteriologiqueForm = () => {
    setOpenBacteriologiqueForm(false);
  };

  const handleOpenRadiologiqueForm = () => {
    setOpenRadiologiqueForm(true);
  };

  const handleCloseRadiologiqueForm = () => {
    setOpenRadiologiqueForm(false);
  };

  const handleOpenBiologiqueForm = () => {
    setOpenBiologiqueForm(true);
  };

  const handleCloseBiologiqueForm = () => {
    setOpenBiologiqueForm(false);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" className="mt-2">
                Add Test Bactériologique
              </Typography>
              <IconButton color="primary"  onClick={handleOpenBacteriologiqueForm}>
                  <AddCircleIcon />
                </IconButton>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" className="mt-2">
                Add Test Radiologique
              </Typography>
              <IconButton color="primary"  onClick={handleOpenRadiologiqueForm}>
                  <AddCircleIcon />
                </IconButton>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardContent className="text-center">
              <Typography variant="h6" className="mt-2">
                Add Test Biologique
              </Typography>
              <IconButton color="primary"  onClick={handleOpenBiologiqueForm}>
                  <AddCircleIcon />
                </IconButton>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <AddBacteriologiqueForm
        open={openBacteriologiqueForm}
        onClose={handleCloseBacteriologiqueForm}
        onSubmit={onAddBacteriologique}
      />

      <AddRadiologiqueForm
        open={openRadiologiqueForm}
        onClose={handleCloseRadiologiqueForm}
        onSubmit={onAddRadiologique}
      />

      <AddBiologiqueForm
        open={openBiologiqueForm}
        onClose={handleCloseBiologiqueForm}
        onSubmit={onAddBiologique}
      />
    </Container>
  );
};

export default TestComponent;


*/
