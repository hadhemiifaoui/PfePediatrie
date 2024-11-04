import React, { useEffect, useState } from 'react';
import { Table ,TableBody  ,TableCell, TableHead, TableRow, IconButton, Dialog,
  Alert, DialogTitle, DialogContent, MenuItem, Select, Collapse, Box, Typography, DialogActions } from '@mui/material';
import {  Row, Col} from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import healthconditionservices from '../../../services/healthconditionServices';
import SectionCard from './sectioncard';
import EditForm from './editHealthConditionForm';
import AddHealthConditionForm from './healthconditionAddForm';
import {useAuth} from '../../authentification/AuthContext';
import CloseIcon from '@mui/icons-material/Close';

const HealthConditions = ({ childId }) => {
  const [healthConditions, setHealthConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); 
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [tableVisibility, setTableVisibility] = useState(false); 
   const [successMessage , setSuccessMessage] = useState('')
   const [expandedRows, setExpandedRows] = useState({});
 const {userRole} = useAuth();
  useEffect(() => {
    const fetchHealthConditions = async () => {
      try {
        const data = await healthconditionservices.getHealthConditionsByChildId(childId);
        
        const enrichedHealthConditions = await Promise.all(data.map(async (condition) => {
          try {
            const id = condition._id
            const response = await healthconditionservices.getMedicationById(id);
            console.log(response);
            if (response && Array.isArray(response)) {
              const medicationDetails = response.map((medication) => medication.nom || 'Medication Details Not Found');
              condition.medicationNames = medicationDetails;
            } else {
              condition.medicationNames = ['No medications available'];
            }
        
          } catch (error) {
            console.error(`Error fetching medications for health condition ${condition._id}:`, error);
            condition.medicationNames = ['Error fetching medications'];
          }
        
          return condition;
        }));

        setHealthConditions(enrichedHealthConditions);
      } catch (error) {
        console.error('Error fetching health conditions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthConditions();
  }, [open, editOpen]);

  const handleClose = () => {
    setOpen(false);
    setSelectedCondition(null)
  };

   const handleDelete = (id) => {
    const confirmed = window.confirm('Vous etes sur tu veux supprimer cette situation medication ?? ')
    if(!confirmed){
      return;
    }
    try{
      healthconditionservices.remove(id)
      setSuccessMessage("Situation Medicale Supprimer Avec Succè")
    }
    catch(error) {
      console.error('Sory we cannot remove this health condition !!')
    }
   } 
   
  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCondition(null)

  };



  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setEditOpen(true);
  };


  const handleRowExpand = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const handleVisibilityChange = (event) => {
    setTableVisibility(event.target.value === 'Show'); 
  };

  return (
    
    <SectionCard title="Situation Medicale">
         <Row>
          <Col></Col>
          <Col></Col>
          <Col>
             {successMessage && (<Alert  style={{marginBottom: '16px' , width:'250px'}}>{successMessage}</Alert>)} </Col>
         </Row>
   <div style={{ display: 'flex', marginBottom: '0px' }}>
      <Select  id="standard-basic"
              variant="standard" value={tableVisibility ? 'Show' : 'Hide'} onChange={handleVisibilityChange}  style={{ marginBottom: '10px' }}>
        <MenuItem value="Show">Montrer </MenuItem>
        <MenuItem value="Hide">Cacher</MenuItem>
      </Select>
      </div>
      {tableVisibility && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nom de maladie</strong></TableCell>
              <TableCell><strong>Diagnostiqué Le</strong></TableCell>
              <TableCell><strong>Medicaments</strong></TableCell>
              <TableCell><strong>Treaté Par</strong></TableCell>
              <TableCell><strong>Statut</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
             {userRole === 'pediatre' && (<TableCell><strong>Actions</strong></TableCell>)} 
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading...</TableCell>
              </TableRow>
            ) : healthConditions.length > 0 ? (
              healthConditions.map((condition) => (
                <React.Fragment key={condition._id}>
                <TableRow >
                  <TableCell>{condition.desease}</TableCell>
                  <TableCell>{`${condition.diagnosticDay}-${condition.diagnosticMonth}-${condition.diagnosticYear}`}</TableCell>
                  <TableCell>
                    {Array.isArray(condition.medicationNames) ? condition.medicationNames.join(', ') : 'No medications available'}
                  </TableCell>
                  <TableCell>{condition.treatedBy}</TableCell>
                  <TableCell>{condition.status}</TableCell>
                  <TableCell>
                      <IconButton onClick={() => handleRowExpand(condition._id)}>
                        <span role="img" aria-label="notes">📝</span>
                      </IconButton>
                    </TableCell>
              {userRole === 'pediatre' && (<TableCell>
                    <IconButton onClick={() => handleEdit(condition)}>
                      <PencilSquare />
                    </IconButton>       
                    <IconButton onClick={() => handleDelete(condition._id)}>
                      <Trash />
                    </IconButton>
                  </TableCell> 
                )}
                </TableRow>
                 <TableRow>
                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                   <Collapse in={expandedRows[condition._id]} timeout="auto" unmountOnExit>
                     <Box margin={1}>
                       <Typography>{condition.notes}</Typography>
                     </Box>
                   </Collapse>
                 </TableCell>
               </TableRow>
               </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Auccune Données Disponible... </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedCondition ? 'Edit Health Condition' : 'Add New Health Condition'}</DialogTitle>
        <DialogContent>
          <AddHealthConditionForm condition={selectedCondition} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedCondition && <EditForm initialData={selectedCondition} />}
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" aria-label="close" onClick={handleEditClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </SectionCard>
  );
};

export default HealthConditions;
