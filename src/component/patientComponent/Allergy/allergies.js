import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, Collapse, Box, Typography
} from '@mui/material';
import allergyservices from '../../../services/allergyServices';
import SectionCard from './sectionCardAllergy';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import EditForm from './editAllergyForm';
import { useTranslation } from 'react-i18next';
import  {useAuth} from '../../authentification/AuthContext'

const Allergy = ({ childId }) => {
  
  const [allergies, setAllergies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedAllergy, setSelectedAllergy] = useState(null);
  const [tableVisibility, setTableVisibility] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [editOpen, setEditOpen] = useState(false);

  const {t} = useTranslation()
  
  const {userRole} = useAuth();
  
  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        const data = await allergyservices.getAllergiesByChildId(childId);
        console.log(childId)
        
        const detailedData = await Promise.all(data.map(async (allergy) => {
          try {
            const response = await allergyservices.getMedicationById(allergy._id);
            console.log(response);
            if (response && Array.isArray(response)) {
              const medicationDetails = response.map((medication) => medication.nom || 'Medication Details Not Found');
              allergy.medicationNames = medicationDetails;
            } else {
              allergy.medicationNames = ['No medications available'];
            }
          } catch (error) {
            console.error(`Error fetching medications for allergy ${allergy._id}:`, error);
            allergy.medicationNames = ['Error fetching medications'];
          }
          return allergy;
        }));


        setAllergies(detailedData);
      } catch (error) {
        console.error('Error fetching allergies:', error);
      } finally {
        setLoading(false);
      }
    };
    if (childId) { 
      fetchAllergies();
    }
  }, [childId, open, editOpen]);



  

  const handleClose = () => {
    setOpen(false);
    setSelectedAllergy(null);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are U Sure U Wanna Remove This Allergy');
    if (!isConfirmed) {
      return;
    }
    try {
      await allergyservices.remove(id);
      setAllergies(allergies.filter(allergy => allergy._id !== id));
    } catch (error) {
      console.error('Error deleting Allergy:', error);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedAllergy(null);
  };

  const handleEdit = (allergy) => {
    setSelectedAllergy(allergy);
    setEditOpen(true);
  };

  const handleVisibilityChange = (event) => {
    setTableVisibility(event.target.value === 'Show');
  };

  const handleRowExpand = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SectionCard title={t('titleAllergy')}>
      <div style={{ display: 'flex', marginBottom: '0px' }}>
        <Select
          id="standard-basic"
          variant="standard"
          value={tableVisibility ? 'Show' : 'Hide'}
          onChange={handleVisibilityChange}
          style={{ marginBottom: '10px' }}
        >
          <MenuItem value="Show">{t('show')}</MenuItem>
          <MenuItem value="Hide">{t('hide')}</MenuItem>
        </Select>
      </div>
      {tableVisibility && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>{t('alergy')}</strong></TableCell>
              <TableCell><strong>{t('triggeredBy')}</strong></TableCell>
              <TableCell><strong>{t('medications')}</strong></TableCell>
              <TableCell><strong>{t('LastUpdated')}</strong></TableCell>
              <TableCell><strong>{t('reaction')}</strong></TableCell>
              <TableCell><strong>{t('firstNoted')}</strong></TableCell>
              <TableCell><strong>{t('notesAllergy')}</strong></TableCell>
              {userRole === 'pediatre' && ( <TableCell><strong>Actions</strong></TableCell> )} 
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">Loading...</TableCell>
              </TableRow>
            ) : allergies.length > 0 ? (
              allergies.map((allergy) => (
                <React.Fragment key={allergy._id}>
                  <TableRow>
                    <TableCell>{allergy.name}</TableCell>
                    <TableCell>{allergy.triggeredBy}</TableCell>
                    <TableCell>
                      {Array.isArray(allergy.medicationNames) ? allergy.medicationNames.join(', ') : t('noData')}
                    </TableCell>
                    <TableCell>{allergy.lastUpdated}</TableCell>
                    <TableCell>{allergy.reaction}</TableCell>
                    <TableCell>{allergy.firstNoted}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRowExpand(allergy._id)}>
                        <span role="img" aria-label="notes">📝</span>
                      </IconButton>
                    </TableCell>
                  {userRole === 'pediatre' && (
                    <TableCell>
                      <IconButton onClick={() => handleEdit(allergy)}>
                        <PencilSquare />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(allergy._id)}>
                        <Trash />
                      </IconButton>
                    </TableCell>
                  )}
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                      <Collapse in={expandedRows[allergy._id]} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Typography>{allergy.notes}</Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedAllergy ? 'Edit Allergy' : 'Add New Allergy'}</DialogTitle>
           <DialogContent>{selectedAllergy && <EditForm initialData={selectedAllergy} />}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" style={{ width: '100px', marginRight: '10px' }}>
            {t('btnCancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedAllergy && <EditForm initialData={selectedAllergy} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant="outlined" style={{ width: '100px', marginRight: '10px' }}>
           {t('btnCancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
};
export default Allergy;
