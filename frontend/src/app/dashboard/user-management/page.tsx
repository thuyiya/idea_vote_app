'use client';
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Select, MenuItem } from '@mui/material';

export default function UserManagement() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'manager' | 'staff'>('staff');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/auth/register',
                { username, email, password, role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('User created successfully');
        } catch (err) {
            console.error('Error:', err); // Log the error
            setError('Failed to create user');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    User Management
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Select
                        fullWidth
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'admin' | 'manager' | 'staff')}
                        margin="dense"
                        required
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="staff">Staff</MenuItem>
                    </Select>
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Create User
                    </Button>
                </form>
            </Box>
        </Container>
    );
}