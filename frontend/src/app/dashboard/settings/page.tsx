'use client';
import { Typography, Box, Container } from '@mui/material';

export default function Settings() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Settings
                </Typography>
                <Typography align="center">
                    Update your settings here.
                </Typography>
            </Box>
        </Container>
    );
}