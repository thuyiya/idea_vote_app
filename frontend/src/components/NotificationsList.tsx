import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton, Box } from "@mui/material";
import { Lightbulb, HowToVote } from "@mui/icons-material"; // Icons for Idea & Vote notifications

// Notification type with category and icon
type Notification = {
    id: string;
    title: string;
    message: string;
    sender: string;
    avatar: string;
    type: "Idea" | "Vote";
};

// Sample notifications categorized
const notifications: Notification[] = [
    {
        id: "1",
        title: "New Idea Submitted",
        message: "John Doe submitted a new idea: 'AI-Powered Task Manager'",
        sender: "John Doe",
        avatar: "/static/images/avatar/1.jpg",
        type: "Idea",
    },
    {
        id: "2",
        title: "Idea Approved",
        message: "The idea 'Smart Office Automation' was approved!",
        sender: "HR Team",
        avatar: "/static/images/avatar/2.jpg",
        type: "Idea",
    },
    {
        id: "3",
        title: "Vote Received",
        message: "Your idea 'Eco-Friendly Workspaces' got 5 new votes!",
        sender: "System",
        avatar: "/static/images/avatar/3.jpg",
        type: "Vote",
    },
    {
        id: "4",
        title: "Idea Rejected",
        message: "The idea 'Open Office Concept' was rejected due to feasibility issues.",
        sender: "Management",
        avatar: "/static/images/avatar/4.jpg",
        type: "Idea",
    },
    {
        id: "5",
        title: "New Vote Cast",
        message: "Sarah voted for the idea 'Remote Work Enhancements'",
        sender: "Sarah Lee",
        avatar: "/static/images/avatar/5.jpg",
        type: "Vote",
    },
];

const NotificationsList = ({ onClose }: { onClose: () => void }) => {
    return (
        <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
            {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={onClose}>
                            <ListItemAvatar>
                                <Avatar alt={notification.sender} src={notification.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box display="flex" alignItems="center">
                                        {notification.type === "Idea" ? (
                                            <Lightbulb color="warning" sx={{ mr: 1 }} />
                                        ) : (
                                            <HowToVote color="primary" sx={{ mr: 1 }} />
                                        )}
                                        {notification.title}
                                    </Box>
                                }
                                secondary={
                                    <Typography component="span" variant="body2" color="text.secondary">
                                        {`${notification.sender} — ${notification.message}`}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                    {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
            ))}
        </List>
    );
};

export { NotificationsList };
