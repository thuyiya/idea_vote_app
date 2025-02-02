import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import { Lightbulb, HowToVote } from "@mui/icons-material";
import { Notification } from "../types";
import moment from "moment";


const NotificationsList = ({ onClose, notifications }: { onClose: () => void; notifications: Notification[] }) => {

    return (
        <List sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
            {notifications.map((notification, index) => (
                <React.Fragment key={notification._id}>
                    <ListItem disablePadding>
                        <ListItemButton onClick={onClose}>
                            <ListItemAvatar>
                                <Avatar alt={notification.sender}>
                                    {notification.ideaId ? (
                                        <Lightbulb color="warning" sx={{ mr: 1 }} />
                                    ) : (
                                        <HowToVote color="primary" sx={{ mr: 1 }} />
                                    )}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography>{notification.title}</Typography>
                                }
                                secondary={
                                    <Typography component="span" variant="body2" color="text.secondary">
                                        {`${notification.description} — ${moment(notification.createdAt).format("LLLL")}`}
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
