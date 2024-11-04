import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select
} from '@mui/material';
import hospitalisationServices from '../../../services/hospitalisationServices';
import SectionCard from './sectionCardHosp';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import EditForm from './editHospitalisationForm';
import { useAuth } from '../../authentification/AuthContext';
import CloseIcon from '@mui/icons-material/Close';

const   Hospitalisation = ({childId}) => {
  const [hospitalisations, setHospitalisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedHosp, setSelectedHosp] = useState(null);
  const [tableVisibility, setTableVisibility] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const {userRole} = useAuth();

  useEffect(() => {
    const fetchHospitalisations = async () => {
      try{
        const data = await hospitalisationServices.getHospByChildId(childId);
        setHospitalisations(data);
      } catch (error) {
        console.error('Error fetching hospitalisations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalisations();
  }, [childId , editOpen]);

  const handleClose = () => {
    setOpen(false);
    setSelectedHosp(null);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are U Sure U Wanna Remove This Hospitalisation');
    if (!isConfirmed) {
      return;
    }
    try {
      await hospitalisationServices.remove(id);
      setHospitalisations(hospitalisations.filter(hospitalisation => hospitalisation._id !== id));
    } catch (error) {
      console.error('Error deleting Hospitalisation:', error);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedHosp(null);
  };

  const handleEdit = (hospitalisation) => {
    setSelectedHosp(hospitalisation);
    setEditOpen(true);
  };

  const handleVisibilityChange = (event) => {
    setTableVisibility(event.target.value === 'Show');
  };



  return (
    <SectionCard title="Hospitalisations">
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
              <TableCell><strong>Date d'entrée</strong></TableCell>
              <TableCell><strong>Date de sortie</strong></TableCell>         
              <TableCell><strong>Nom d'hopitale</strong></TableCell>
              <TableCell><strong>Raisons</strong></TableCell>
             {userRole === 'pediatre' &&(<TableCell><strong>Actions</strong></TableCell>)} 

            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">Loading...</TableCell>
              </TableRow>
            ) : hospitalisations.length > 0 ? (
                hospitalisations.map((hospitalisation) => (
                <React.Fragment key={hospitalisation._id}>
                  <TableRow>
                    <TableCell>{hospitalisation.entryDate}</TableCell>
                    <TableCell>{hospitalisation.releaseDate}</TableCell>
                    <TableCell>{hospitalisation.HospitalName}</TableCell>
                    <TableCell>{hospitalisation.Reasons}</TableCell>
                 {userRole === 'pediatre' &&(<TableCell>
                      <IconButton onClick={() => handleEdit(hospitalisation)}>
                        <PencilSquare />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(hospitalisation._id)}>
                        <Trash />
                      </IconButton>
                    </TableCell> 
                  )}
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">auccune donnée trouvée</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedHosp ? 'Edit Hosiptalisation' : 'Add New Hospitalisation'}</DialogTitle>
        <DialogContent>
          {selectedHosp && <EditForm initialValues={selectedHosp} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" style={{ width: '100px', marginRight: '10px' }}>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedHosp && <EditForm initialValues={selectedHosp} />}
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

export default Hospitalisation;

/* <TableCell><strong>Nom de Dr</strong></TableCell>
                    <TableCell>{hospitalisation.DoctorName}</TableCell>

*/