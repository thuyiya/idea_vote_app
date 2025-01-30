import { useState } from "react";
import { Box, Typography, Button, Switch, FormControlLabel, Card, CardContent } from "@mui/material";
import { Brightness4, Brightness7, ExitToApp } from "@mui/icons-material";

const SettingsPage = ({ onLogout }: { onLogout: () => void }) => {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
        // Add theme toggle logic here (e.g., update context or state in the app)
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Settings
                    </Typography>

                    {/* Theme Toggle */}
                    <FormControlLabel
                        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
                        label={
                            <>
                                {darkMode ? <Brightness4 /> : <Brightness7 />} Dark Mode
                            </>
                        }
                    />

                    {/* Logout Button */}
                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<ExitToApp />}
                            onClick={onLogout}
                            fullWidth
                        >
                            Logout
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SettingsPage;
