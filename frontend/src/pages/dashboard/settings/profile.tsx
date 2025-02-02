import { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, CircularProgress } from "@mui/material";
import { getProfile } from "../../../utils/userService";
import { User } from "../../../types";

const ProfilePage = () => {
    const [profile, setProfile] = useState<User>({
        "_id": "",
        "username": "",
        "email": "",
        "name": "",
        "role": "",
        "createdAt": "2025-02-02T07:44:36.404Z"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" height="100vh">
            <Paper elevation={3} sx={{ p: 4, textAlign: "center", height: '90%', width: '60%' }}>
                <Avatar sx={{ width: 180, height: 180, margin: "0 auto", bgcolor: "primary.main" }}>
                    <Typography variant="h1">{profile?.name?.charAt(0).toUpperCase()}</Typography>
                </Avatar>
                <Typography variant="h3" sx={{ m: 2 }}>{profile?.name}</Typography>
                <Typography variant="body1" color="textSecondary">{profile?.role.toUpperCase()}</Typography>
                <Box mt={3} textAlign="center">
                    <Typography variant="h6" sx={{ m: 2 }}><strong>Emp Id:</strong> {profile?.username}</Typography>
                    <Typography variant="h4" sx={{ m: 2 }}><strong>Email:</strong> {profile?.email}</Typography>
                    <Typography variant="body1" sx={{ m: 2 }}><strong>Created At:</strong> {new Date(profile?.createdAt).toLocaleString()}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfilePage;
