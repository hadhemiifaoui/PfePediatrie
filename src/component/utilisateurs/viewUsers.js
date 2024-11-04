import React, { useState, useEffect } from 'react';
import {
  Container, FormControl, Box, InputLabel, Button, MenuItem, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, IconButton, Dialog, DialogContent, DialogActions, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import NewUserForm from './addUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import userServices from '../../services/userServices';
import EditUser from './editUser';
import { CheckCircle, Cancel } from '@mui/icons-material';

const roles = ['Tous', 'admin', 'patient', 'pediatre'];

const ViewUsers = () => {
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [refresh , setRefresh] = useState(false)
  const handleCloseSnackBar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (role === 'Tous') {
          response = await userServices.getAll();
        } else if (role) {
          response = await userServices.getUsersByRole(role);
        }
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
   
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (role === 'Tous') {
          response = await userServices.getAll();
        } else if (role) {
          response = await userServices.getUsersByRole(role);
        }
        setUsers(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      }
    };
    if (role) {
      fetchUsers();
    }
  }, [refresh]);



  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleActivateDeactivate = async (isActive) => {
    if (selectedUsers.length === 0) {
      return;
    }
  
    const requestData = {
      userIds: selectedUsers,
      isActive,
    };
  
    console.log('data :', requestData);
  
    try {
      await userServices.toggleUserActive(requestData.userIds, requestData.isActive);
      const updatedUsers = await userServices.getAll(); 
      setUsers(updatedUsers);
      setSuccessMessage(isActive ? 'utilisateurs activés avec succès' : 'utilisateurs désactivés avec succès');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('error actived user', error);
    }
  };

  const handleOpen = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      setSuccessMessage('utilisateur supprimé avec succès');
      setOpenSnackbar(true);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('eror remov user', error);
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
          <FormControl>
            <InputLabel>Rôle</InputLabel>
            <Select
              variant="standard"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: 250, marginLeft: '5%' }}
            >
              <MenuItem value="">
                <em>Aucun</em>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === 'Tous' ? 'Tous' : role.charAt(0).toUpperCase() + role.slice(1)}
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
          <Button
            style={{ marginLeft: '20px' }}
            variant="contained"
            color="success"
            onClick={() => handleActivateDeactivate(true)}
            disabled={selectedUsers.length === 0}
          >
            Activer
          </Button>
          <Button
            style={{ marginLeft: '20px' }}
            variant="contained"
             sx={{backgroundColor : "#be3614"}}
            onClick={() => handleActivateDeactivate(false)}
            disabled={selectedUsers.length === 0}
          >
            Désactiver
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9f9" }}>
              <TableCell padding="checkbox" >
                <Checkbox
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                  checked={users.length > 0 && selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Nom</strong></TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Prénom</strong></TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Email</strong></TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Date de naissance</strong></TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Tel</strong></TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Status</strong></TableCell>
              <TableCell sx={{ color: '#000000' }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user._id}
                  style={{
                    backgroundColor: user.isActive ? '#f0f3f4' : '#ffebee' 
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                    />
                  </TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthday}</TableCell>
                  <TableCell>{user.tel}</TableCell>
                  <TableCell>
                    {user.isActive ? <CheckCircle color="success" /> : <Cancel color="error" />}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)} color="success">
                      <PencilSquare />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(user)} color="error">
                      <Trash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                    Aucun utilisateur trouvé 
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedUser ? (
            <EditUser handleClose={handleClose} initialData={selectedUser} refresh={() => setRefresh(!refresh)}/>
          ) : (
            <NewUserForm handleClose={handleClose} refresh={() => setRefresh(!refresh)} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} style={{ width: '130%', height: '70%' }}>
        <DialogContent style={{ width: 500, height: 70 }}>
          Voulez-vous vraiment supprimer l'utilisateur {userToDelete?.firstname} {userToDelete?.lastname} ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Annuler</Button>
          <Button onClick={handleDelete} color="secondary">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewUsers;

