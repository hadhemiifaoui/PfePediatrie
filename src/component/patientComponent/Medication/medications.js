import React, { useEffect, useState } from 'react';
import SectionCard from './sectionCardMed';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogContent, MenuItem, Select,
   DialogActions, Button, Collapse, Box, Typography } from '@mui/material';
import medicationServices from '../../../services/medicationServices';
import NewMedicationForm from './medicationAddForm';
import EditForm from './editMedication'; 
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import {useAuth} from '../../authentification/AuthContext';

const Medications = ({ childId }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); 
  const [selectedMedication, setSelectedMedication] = useState(null); 
  const [tableVisibility, setTableVisibility] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const {userRole} = useAuth();


  const [newMedication, setNewMedication] = useState({
    medicationName: '',
    formOfMedicine: '',
    unit: '',
    dosageQuantity: '',
    dosageFrequency: '',
    when: '',
    notes: '',
    startDate: null,
    endDate: null,
    medicineTakenFor: '',
    prescribedBy: '',
  });

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await medicationServices.getMedicationByChildId(childId);
        setMedications(response);
      } catch (error) {
        console.error('Error Fetching Medications', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, [childId , open, editOpen]); 

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewMedication((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRowExpand = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handlDelete = async (id) => {
    const isConfirmed = window.confirm('Vous etes sure tu veut supprimer ce medicament?');
    if (!isConfirmed) {
      return;
    }
    try {
      await medicationServices.remove(id);
      setMedications((prevMedications) => prevMedications.filter((med) => med._id !== id));
    } catch (error) {
      console.error('Error deleting Medication:', error);
    }
  };

  const handleVisibilityChange = (event) => {
    setTableVisibility(event.target.value === 'Show');
  };

  const handleEdit = (medication) => {
    setSelectedMedication(medication);
    setEditOpen(true);
  };

  return (
    <SectionCard title="Liste des Medicaments">
      <div style={{ display: 'flex', marginBottom: '0px' }}>
        <Select id="standard-basic" variant="standard" value={tableVisibility ? 'Show' : 'Hide'} onChange={handleVisibilityChange} style={{ marginBottom: '10px' }}>
          <MenuItem value="Show">Montrer</MenuItem>
          <MenuItem value="Hide">Cacher</MenuItem>
        </Select>
      </div>
      {tableVisibility && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Medicament</strong></TableCell>
              <TableCell><strong>Forme</strong></TableCell>           
              <TableCell><strong>Dosage</strong></TableCell>
              <TableCell><strong>Pris Pour</strong></TableCell>
              <TableCell><strong>Du </strong></TableCell>
              <TableCell><strong>Jusqua</strong></TableCell>
              <TableCell><strong>Décrit Par</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              {userRole === 'pediatre' &&(<TableCell><strong>Actions</strong></TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {medications.map((medication) => (
              <React.Fragment key={medication._id}>
                <TableRow>
                  <TableCell>{medication.medicationName}</TableCell>
                  <TableCell>{medication.formOfMedicine}</TableCell>
                  <TableCell>{`${medication.dosageQuantity} ${medication.unit} ${medication.dosageFrequency} ${medication.when}`}</TableCell>
                  <TableCell>{medication.medicineTakenFor}</TableCell>
                  <TableCell>{medication.startDate}</TableCell>
                  <TableCell>{medication.endDate}</TableCell>
                  <TableCell>{medication.prescribedBy}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRowExpand(medication._id)}>
                      <span role="img" aria-label="notes">📝</span>
                    </IconButton>
                  </TableCell>
                  {userRole === 'pediatre' &&(<TableCell>
                    <IconButton onClick={() => handleEdit(medication)}>
                      <PencilSquare />
                    </IconButton>
                    <IconButton onClick={() => handlDelete(medication._id)}>
                      <Trash />
                    </IconButton>
                  </TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expandedRows[medication._id]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography>{medication.notes}</Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <NewMedicationForm formData={newMedication} handleInputChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" style={{ width: '100px', marginRight: '10px' }}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedMedication && <EditForm initialValues={selectedMedication} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant="outlined" style={{ width: '100px', marginRight: '10px' }}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
};

export default Medications;
