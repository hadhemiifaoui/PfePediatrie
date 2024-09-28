import React, { useState, useEffect } from 'react';
import {
  Container,FormControl, Box,
  InputLabel, Button,MenuItem, Select,Table,TableBody,
  TableCell,TableContainer, TableHead, TableRow, Paper,
  IconButton,Dialog, DialogContent,DialogActions,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { PencilSquare, Trash } from 'react-bootstrap-icons';
import NewUserForm from './addUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import userServices from '../../services/userServices';
import EditUser from './editUser';

const roles = ['All', 'admin', 'patient', 'pediatre'];

const ViewUsers = () => {
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackBar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (role === 'All') {
          response = await userServices.getAll();
        } else if (role) {
          response = await userServices.getUsersByRole(role);
        }
        console.log('Fetched users:', response);
        setUsers(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      }
    };

    if (role) {
      fetchUsers();
    }
  }, [role]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleOpen = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await userServices.deleteUser(userToDelete._id);
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      setSuccessMessage('Utilisateur supprimé avec succé!');
      setOpenSnackbar(true);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting user!', error);
    }
  };

  return (
    <Container style={{ marginTop: '3%' }}>
      <TableContainer component={Paper}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </MuiAlert>
        </Snackbar>

        <Box display="flex" alignItems="center" marginBottom="30px">
          <div style={{ marginTop: '8%' }}></div>
          <FormControl>
            <InputLabel>Rôle</InputLabel>
            <Select
              variant="standard"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: 250, marginLeft: '5%' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === 'All' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            style={{ width: 110, height: 35, backgroundColor: '#00bcd4', color: '#fff', marginLeft: '5%' }}
            variant="contained"
            onClick={handleOpen}
          >
            Ajouter 
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nom</strong>
              </TableCell>
              <TableCell>
                <strong>Prénon</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Date de naissance</strong>
              </TableCell>
              <TableCell>
                <strong>Tel</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthday}</TableCell>
                  <TableCell>{user.tel}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)} color="success">
                      <PencilSquare />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(user)} color='error'>
                      <Trash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Auccun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedUser ? (
            <EditUser handleClose={handleClose} initialData={selectedUser} />
          ) : (
            <NewUserForm handleClose={handleClose} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          <em>Vous-Êtes sûr de vouloir supprimer cet utilisateur ?</em>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewUsers;
