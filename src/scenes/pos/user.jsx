import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Modal,
  Grid,
} from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const UserPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Dummy data for users
  const initialUsers = [
    { id: 1, username: "johndoe", name: "John Doe", role: "Admin", email: "johndoe@example.com" },
    { id: 2, username: "janedoe", name: "Jane Doe", role: "User", email: "janedoe@example.com" },
    { id: 3, username: "bobsmith", name: "Bob Smith", role: "Moderator", email: "bobsmith@example.com" },
    { id: 4, username: "mikecashier", name: "Mike Cashier", role: "Cashier", email: "mikecashier@example.com" },
    { id: 5, username: "sarahsales", name: "Sarah Sales", role: "Sales", email: "sarahsales@example.com" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    role: "",
    email: "",
  });

  // Handle Open Action Menu
  const handleOpenMenu = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  // Handle Close Action Menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Handle Delete User
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    handleCloseMenu();
  };

  // Handle Edit User (Mock action)
  const handleEdit = (id) => {
    alert(`Editing user with ID ${id}`);
    handleCloseMenu();
  };

  // Handle Create User Form Submission
  const handleCreateUser = () => {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        email: newUser.email,
      },
    ]);
    setOpenModal(false); // Close modal after adding user
    setNewUser({
      username: "",
      name: "",
      role: "",
      email: "",
    }); // Reset form fields
  };

  // Table Columns
  const columns = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "name", headerName: "Full Name", flex: 1.5 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleOpenMenu(event, params.row)}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={() => handleEdit(selectedUser?.id)}>
              <Edit sx={{ marginRight: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(selectedUser?.id)} sx={{ color: "red" }}>
              <Delete sx={{ marginRight: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" fontWeight="bold" mb={2}>
        User List
      </Typography>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="contained" sx={{ backgroundColor: "purple", color: "white" }} onClick={() => setOpenModal(true)}>
          Create User
        </Button>
      </Box>

      {/* User Table */}
      <Box sx={{ height: "60vh" }}>
        <DataGrid
          rows={users}
          columns={columns}
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
            "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
          }}
        />
      </Box>

      {/* Modal for Creating User */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 24,
            width: "400px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Create New User
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
                <option value="Cashier">Cashier</option>
                <option value="Sales">Sales</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Button fullWidth variant="contained" sx={{ backgroundColor: "purple" }} onClick={handleCreateUser}>
                Create User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserPage;
