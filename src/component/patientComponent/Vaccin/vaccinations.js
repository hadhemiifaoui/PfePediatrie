import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead,Typography , Box , TableRow, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions,Collapse, Button, MenuItem, Select
} from '@mui/material';
import vaccinservices from '../../../services/vaccinServices';
import SectionCard from './sectionCardVaccin';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import EditForm from './editVaccinForm';
import {useAuth} from '../../authentification/AuthContext'
import CloseIcon from '@mui/icons-material/Close';

const Vaccinations = ({ childId }) => {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedVaccin, setSelectedVaccin] = useState(null);
  const [tableVisibility, setTableVisibility] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [refresh , setRefresh] = useState(false)


  const  {userRole} = useAuth()
  useEffect(() => {
    const fetchHospitalisations = async () => {
      try{
        const data = await vaccinservices.getVaccinByChildId(childId);
        setVaccinations(data);
      } catch (error) {
        console.error('Error fetching Vaccinations :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalisations();
  }, [childId ,open, editOpen]);

  useEffect(() => {
    const fetchHospitalisations = async () => {
      try{
        const data = await vaccinservices.getVaccinByChildId(childId);
        setVaccinations(data);
      } catch (error) {
        console.error('Error fetching Vaccinations :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalisations();
  }, [refresh]);

  const handleClose = () => {
    setOpen(false);
    setSelectedVaccin(null);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are U Sure U Wanna Remove This Vaccination ');
    if (!isConfirmed) {
      return;
    }
    try {
      await vaccinservices.remove(id);
      setVaccinations(vaccinations.filter(vaccination => vaccination._id !== id));
    } catch (error) {
      console.error('Error deleting Vaccination :', error);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedVaccin(null);
  };

  const handleEdit = (vaccination) => {
    setSelectedVaccin(vaccination);
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
    <SectionCard title="Vaccinations">
      <div style={{ display: 'flex', marginBottom: '0px' }}>
        <Select
          id="standard-basic"
          variant="standard"
          value={tableVisibility ? 'Show' : 'Hide'}
          onChange={handleVisibilityChange}
          style={{ marginBottom: '10px' }}
        >
          <MenuItem value="Show">Montrer</MenuItem>
          <MenuItem value="Hide">Cacher</MenuItem>
        </Select>
      </div>
      {tableVisibility && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Vacciné Pour</strong></TableCell>
              <TableCell><strong>Décrit le </strong></TableCell>
              <TableCell><strong>Nom de Vaccination</strong></TableCell>
              <TableCell><strong>Détails</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
             {userRole === "pediatre" &&(<TableCell><strong>Actions</strong></TableCell>)} 
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">Loading...</TableCell>
              </TableRow>
            ) : vaccinations.length > 0 ? (
                vaccinations.map((vaccination) => (
                <React.Fragment key={vaccination._id}>
                  <TableRow>
                    <TableCell>{vaccination.vaccinatedFor}</TableCell>
                    <TableCell>{vaccination.CaughtOn}</TableCell>
                    <TableCell>{vaccination.vaccinName}</TableCell>
                    <TableCell>{vaccination.Details}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => handleRowExpand(vaccination._id)}>
                      <span role="img" aria-label="notes">📝</span>
                    </IconButton>
                  </TableCell>
                  {userRole === "pediatre" &&( <TableCell>
                      <IconButton onClick={() => handleEdit(vaccination)}>
                        <PencilSquare />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(vaccination._id)}>
                        <Trash />
                      </IconButton>
                    </TableCell>
                  )}
                  </TableRow>
                  <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expandedRows[vaccination._id]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography>{vaccination.notes}</Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">auccun donnée valable</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

    
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedVaccin && <EditForm initialValues={selectedVaccin} />}
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

export default Vaccinations;


/*<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedVaccin ? 'Edit Vaccination' : 'Add New Vaccination'}</DialogTitle>
        <DialogContent>
          {selectedVaccin && <EditForm initialValues={selectedVaccin} />}
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" aria-label="close" onClick={handleEditClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>*/