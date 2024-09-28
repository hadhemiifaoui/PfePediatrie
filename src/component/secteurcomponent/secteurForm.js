import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogActions,
   DialogContent, DialogTitle, Alert } from '@mui/material';
import secteurServices from '../../services/secteurServices';
import Title from '../title/title';

const EditFormModal = ({ open, onClose, caseId, secteurId, onSave }) => {
  const [situations, setSituation] = useState({ title: '', description: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (caseId && secteurId) {
      const fetchExpense = async () => {
        try {
          const response = await secteurServices.getCaseFromSecteurById(secteurId, caseId);
          setSituation(response);
        } catch (error) {
          console.error('Error fetching case:', error);
        }
      };
     fetchExpense();
    }
  }, [caseId, secteurId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSituation({ ...situations, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await secteurServices.updateCaseIntoSector(secteurId, caseId, situations);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSave();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >
      <DialogTitle><Title>Modifier le cas clinique</Title></DialogTitle>
      <DialogContent>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }} style={{width:"50%"}}>
             Cas clinique modifié avec succé
          </Alert>
        )}
        <form onSubmit={handleFormSubmit}>
          <TextField
            type="text"
            name="title"
            label="Titre"
            margin="normal"
            style={{width:"80%"}}
            variant="standard"
            value={situations.title}
            onChange={handleInputChange}
          />
          <TextField
            type="text"
            name="description"
            label="Description"
            margin="normal"
            style={{width:"80%"}}
            variant="standard"
            value={situations.description}
            onChange={handleInputChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Annuler</Button>
        <Button onClick={handleFormSubmit} color="primary">Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFormModal;
