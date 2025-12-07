import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Pagination,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#001A2C',
  color: '#fff',
  padding: theme.spacing(1, 7),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  marginTop: theme.spacing(3),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-root': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};


const HomePage = () => {

  const [view, setView] = useState("table");

  const [open, setOpen] = useState(false);
  const [idValue, setidValue] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData('');
    setErrors('');
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: ''
  });


  const dispatch = useDispatch();
  const { list: users, totalPages, loading } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(fetchUsers(page))
  }, [page]);


  const validate = () => {
    let newErrors = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.avatar && !/^https?:\/\/.+/i.test(formData.avatar)) {
      newErrors.avatar = "Enter a valid image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleEdit = (data) => {
    setFormData({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      avatar: data.avatar
    });

    setidValue(data.id);

    setOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    const url = `https://reqres.in/api/users/${selectedUser.id}`;
    const method = "DELETE";
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "x-api-key": "reqres_6cf8afaefcc045c4b4df337b8755b1ee"
        }
      });
      setOpenDelete(false);
    } catch (error) {
      console.error("err", error);
    }

  };

  const filteredUsers = users.filter((user) => {
    const text = searchText.toLowerCase();

    return (
      user.first_name.toLowerCase().includes(text) ||
      user.last_name.toLowerCase().includes(text)
    );
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const url = idValue
      ? `https://reqres.in/api/users/${idValue}`
      : "https://reqres.in/api/users";

    const method = idValue ? "PUT" : "POST";


    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres_6cf8afaefcc045c4b4df337b8755b1ee"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      handleClose();

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        avatar: ""
      });

      setErrors({});

    } catch (error) {
      console.error("err", error);
    }
  };

  const navigate = useNavigate();


  const handleLogOut = () => {
    navigate("/");
  }

  return (
    <Box sx={{ backgroundColor: '#fef9fa', minHeight: '100vh' }}>

      <TopBar>
        <Typography variant="h6"></Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Log Out
          </Typography>
          <IconButton
            onClick={handleLogOut}
            sx={{
              backgroundColor: '#ff4c4c',
              color: '#fff',
              '&:hover': { backgroundColor: '#e63b3b' }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </TopBar>

      <Box sx={{ p: 3, maxWidth: 1410, margin: '0 auto' }}>
        <StyledCard>
          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography variant="h6">Users</Typography>
            <Box style={{ display: 'flex', gap: '18px' }}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="input search text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Button size='large' onClick={handleOpen} style={{ textTransform: 'none', background: '#189fff', color: '#fff' }}>Create User</Button>
            </Box>
          </Box>
          <Box style={{ float: 'inline-start', marginBottom: '10px' }}>
            <Button
              size="small"
              variant={view === "table" ? "outlined" : "text"}
              onClick={() => setView("table")}
              startIcon={<TableChartOutlinedIcon />}
              sx={{
                textTransform: "none",
                borderColor: view === "table" ? "#1a73e8" : "#ccc",
                color: view === "table" ? "#1a73e8" : "#333",
                background: view === "table" ? "#e8f0fe" : "transparent",
              }}
            >
              Table
            </Button>
            <Button
              size="small"
              variant={view === "card" ? "outlined" : "text"}
              onClick={() => setView("card")}
              startIcon={<FormatListBulletedOutlinedIcon />}
              sx={{
                textTransform: "none",
                borderColor: view === "card" ? "#1a73e8" : "#ccc",
                color: view === "card" ? "#1a73e8" : "#333",
                background: view === "card" ? "#e8f0fe" : "transparent",
              }}
            >
              Card
            </Button>
          </Box>
          {view === "table" && (
            <TableContainer component={Paper} elevation={0}>
              <StyledTable>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#fef9fa' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Profile</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={35} />
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading && filteredUsers?.map((user) => (
                    <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                      <TableCell>
                        <Avatar
                          src={user.avatar}
                          alt={`${user.first_name}'s avatar`}
                          sx={{ width: 40, height: 40 }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#189fff' }}>{user.email}</TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                          <Button onClick={() => handleEdit(user)} size='small' style={{ textTransform: 'none', background: '#189fff', color: '#fff' }}>Edit</Button>
                          <Button onClick={() => handleDeleteClick(user)} size='small' style={{ textTransform: 'none', background: '#e63b3b', color: '#fff' }}>Delete</Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          )}
          {view === "card" && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                gap: 3,
                mt: 9,
              }}
            >
              {filteredUsers?.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "25px 20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "0.3s",
                    cursor: "pointer",
                    "&:hover": { background: "#d0cfcfff" },
                    "&:hover .overlay": { opacity: 1 },
                    "&:hover .card-content": { opacity: 0.2 },
                  }}
                >
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      opacity: 0,
                      transition: "0.3s",
                      zIndex: 3,
                    }}
                  >
                    <IconButton onClick={() => handleEdit(user)} sx={{ background: "#8a76ff", color: "#fff", width: 55, height: 55 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(user)} sx={{ background: "#ff2d2d", color: "#fff", width: 55, height: 55 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Box
                    className="card-content"
                    sx={{
                      transition: "0.3s",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.first_name}
                      sx={{ width: 85, height: 85, margin: "0 auto 12px" }}
                    />

                    <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                      {user.first_name} {user.last_name}
                    </Typography>

                    <Typography sx={{ color: "gray", fontSize: "15px" }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

          )}
          <Pagination
            style={{ float: 'inline-end', marginTop: '10px' }}
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </StyledCard>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" mb={3}>
            Create New User
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl sx={{ width: '45ch' }} error={!!errors.firstName}>
                <Typography variant="caption" sx={{ mb: 0.5 }}>
                  First Name <span>*</span>
                </Typography>
                <OutlinedInput
                  size="small"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <FormHelperText>{errors.firstName}</FormHelperText>
              </FormControl>
              <FormControl sx={{ width: '45ch' }} error={!!errors.lastName}>
                <Typography variant="caption" sx={{ mb: 0.5 }}>
                  Last Name <span>*</span>
                </Typography>
                <OutlinedInput
                  size="small"
                  name="lastName"
                  placeholder="Enter lastName name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <FormHelperText>{errors.lastName}</FormHelperText>
              </FormControl>
              <FormControl sx={{ width: '45ch' }} error={!!errors.email}>
                <Typography variant="caption" sx={{ mb: 0.5 }}>
                  Email <span>*</span>
                </Typography>
                <OutlinedInput
                  size="small"
                  name="email"
                  placeholder="Enter email name"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormHelperText>{errors.email}</FormHelperText>
              </FormControl>
              <FormControl sx={{ width: '45ch' }} error={!!errors.avatar}>
                <Typography variant="caption" sx={{ mb: 0.5 }}>
                  Profile Image Link
                </Typography>
                <OutlinedInput
                  size="small"
                  name="avatar"
                  placeholder="Enter profile image"
                  value={formData.avatar}
                  onChange={handleChange}
                />
                <FormHelperText>{errors.avatar}</FormHelperText>
              </FormControl>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained" style={{ background: '#189fff' }}>Submit</Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          Are you sure you want to delete
          <b> {selectedUser?.first_name} {selectedUser?.last_name} </b>?
        </DialogContent>

        <DialogActions>
          <Button size='small' variant="outlined" onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button size='small' variant="contained"
            onClick={handleConfirmDelete}
            style={{ background: "#e63b3b", color: "#fff" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default HomePage;
