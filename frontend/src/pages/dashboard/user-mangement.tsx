import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Toolbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Alert,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import randomInteger from 'random-int';
import { User } from "../../types";
import { getAllEmployees, createUser } from "../../utils/userService";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, reset } = useForm<User>();

    const currentUserRole = localStorage.getItem("role");  // Get the role from localStorage

    // Fetch employees data
    const fetchEmployeeCount = async () => {
        try {
            const employeeData = await getAllEmployees();
            setUsers(employeeData.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    useEffect(() => {
        fetchEmployeeCount();
    }, []);

    const handleOpen = (user: User | null) => {
        if (currentUserRole !== "admin") {
            setErrorMessage("You need admin access to create a user.");
            return;
        }
        setErrorMessage("");  // Reset error message
        setEditingUser(user);
        setOpen(true);
        reset(user || {});
    };

    const handleClose = () => {
        setOpen(false);
        setEditingUser(null);
        reset();
    };

    const onSubmit = async (data: User) => {
        if (editingUser) {
            setUsers(
                users.map((user) =>
                    user._id === editingUser._id ? { ...user, ...data, updatedAt: new Date() } : user
                )
            );
        } else {
            try {
                const newUser = {
                    name: data.name,
                    role: data.role,
                    username: data.username,
                    email: data.email,
                    password: data.password || "12345678"
                }

                const user = await createUser(newUser);
                setUsers([...users, user.data]);
                handleClose();
            } catch (error) {
                console.error("Error creating user:", error);
                setErrorMessage("Failed to create user. Please try again.");
            }
        }
    };

    const handleDelete = (id: string) => {
        setUsers(users.filter((user) => user._id !== id));
    };

    const filteredUsers = searchQuery.length > 0
        ? users.filter((user) =>
            user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : users;

    return (
        <Box>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(null)}
                    disabled={currentUserRole !== "admin"}
                >
                    Create User
                </Button>
            </Toolbar>

            {/* Error Message */}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Emp</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>
                                    <IconButton disabled onClick={() => handleOpen(user)}>
                                        <Edit color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user._id)}>
                                        <Delete color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth={true}>
                <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField label="Name" {...register("name", { required: true })} fullWidth autoComplete="off" />
                        <TextField label="Email" {...register("email", { required: true })} fullWidth autoComplete="off" />
                        <TextField label="Emp ID" {...register("username", { required: true })} disabled fullWidth autoComplete="off" value={randomInteger(1000, 9999)} />
                        {!editingUser && (
                            <>
                                <TextField
                                    label="Password"
                                    type="password"
                                    autoComplete="off"
                                    {...register("password", { required: true })}
                                    fullWidth
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        label="Role"
                                        {...register("role", { required: true })}
                                        defaultValue="staff"
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="staff">Staff</MenuItem>
                                        <MenuItem value="manager">Manager</MenuItem>
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                        {editingUser ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserManagement;
