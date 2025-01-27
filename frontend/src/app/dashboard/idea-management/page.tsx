'use client';
import { Typography, Box, Container } from '@mui/material';

export default function IdeaManagement() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Idea Management
                </Typography>
                <Typography align="center">
                    Manage ideas here.
                </Typography>
            </Box>
        </Container>
    );
}