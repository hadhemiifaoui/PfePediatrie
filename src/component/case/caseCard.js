import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddFormSymptom from '../case/addSymptom'; 
import AddIcon from '@mui/icons-material/Add';
const CaseCard = ({ caseItem, onDelete, onUpdate, onAddSymptom }) => {
  const [editMode, setEditMode] = useState(false);
  const [addSymptomMode, setAddSymptomMode] = useState(false);
  const [updatedCaseData, setUpdatedCaseData] = useState({
    status: caseItem.status,
    notes: caseItem.notes,
    description: caseItem.description,
    caseId: caseItem.caseId,
    title: caseItem.title,
    dateOpened: caseItem.dateOpened,
    pediatricType: caseItem.pediatricType
  });

  const handleUpdate = () => {
    onUpdate(caseItem._id, updatedCaseData);
    setEditMode(false);
  };

  const handleDialogOpen = () => {
    setUpdatedCaseData({
      status: caseItem.status,
      notes: caseItem.notes,
      description: caseItem.description,
      caseId: caseItem.caseId,
      title: caseItem.title,
      dateOpened: caseItem.dateOpened,
      pediatricType: caseItem.pediatricType
    });
    setEditMode(true);
  };

  const handleDialogClose = () => {
    setEditMode(false);
  };

  const handleAddSymptomOpen = () => {
    setAddSymptomMode(true);
  };

  const handleAddSymptomClose = () => {
    setAddSymptomMode(false);
  };

  const handleAddSymptomSubmit = (formData) => {
    onAddSymptom(caseItem._id, formData);
    setAddSymptomMode(false);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        {!editMode ? (
          <>
            <Typography variant="h5" component="div">
              {caseItem.title} - {caseItem.caseId}
            </Typography>
            <Typography variant="body2">
              Status: {caseItem.status}
            </Typography>
            <Typography variant="body2">
              Notes: {caseItem.notes}
            </Typography>
            <Typography variant="body2">
              Description: {caseItem.description}
            </Typography>
            <Typography variant="body2">
              Date Opened: {caseItem.dateOpened}
            </Typography>
            <Typography variant="body2">
              Pediatric Type: {caseItem.pediatricType}
            </Typography>
          </>
        ) : (
          <>
            {/* Edit form fields */}
          </>
        )}
      </CardContent>
      <CardActions>
        {!editMode ? (
          <>
            <IconButton onClick={handleDialogOpen} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(caseItem._id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleAddSymptomOpen} aria-label="add">
              <AddIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleDialogClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </>
        )}
      </CardActions>

      {/* Update Dialog */}
      <Dialog open={editMode} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Edit Case</DialogTitle>
        <DialogContent>
          {/* Edit form fields */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Symptom Dialog */}
      <Dialog open={addSymptomMode} onClose={handleAddSymptomClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Add Symptom</DialogTitle>
        <DialogContent>
          <AddFormSymptom onSubmit={handleAddSymptomSubmit} onClose={handleAddSymptomClose} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CaseCard;