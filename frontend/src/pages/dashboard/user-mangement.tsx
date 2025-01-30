import { useState } from "react";
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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { User } from "../../types";

const users_data: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        role: "Admin",
        createdAt: "2024-01-01T10:00:00Z",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        username: "janesmith",
        role: "Editor",
        createdAt: "2024-01-02T12:30:00Z",
    },
    {
        id: "3",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        username: "alicej",
        role: "User",
        createdAt: "2024-01-03T15:45:00Z",
    },
    {
        id: "4",
        name: "Bob Williams",
        email: "bob.williams@example.com",
        username: "bobw",
        role: "Moderator",
        createdAt: "2024-01-04T09:20:00Z",
    },
    {
        id: "5",
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        username: "charlieb",
        role: "User",
        createdAt: "2024-01-05T17:10:00Z",
    }
];

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>(users_data);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { register, handleSubmit, reset } = useForm<User>();

    // Open Modal for Create/Edit
    const handleOpen = (user: User | null) => {
        setEditingUser(user);
        setOpen(true);
        reset(user || {});
    };

    const handleClose = () => {
        setOpen(false);
        setEditingUser(null);
        reset();
    };

    const onSubmit = (data: User) => {
        if (editingUser) {
            setUsers(
                users.map((user) =>
                    user.id === editingUser.id ? { ...user, ...data, updatedAt: new Date() } : user
                )
            );
        } else {
            const newUser: User = {
                ...data,
                id: Date.now().toString(),
                createdAt: new Date().toLocaleDateString(),
            };
            setUsers([...users, newUser]);
        }
        handleClose();
    };

    const handleDelete = (id: string) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
                <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
                    Create User
                </Button>
            </Toolbar>

            {/* Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.createdAt}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(user)}>
                                        <Edit color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.id)}>
                                        <Delete color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth={true}>
                <DialogTitle>{editingUser ? "Edit USer" : "Create User"}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField label="name" {...register("name", { required: true })} fullWidth />
                        <TextField label="email" {...register("email", { required: true })} fullWidth />
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
